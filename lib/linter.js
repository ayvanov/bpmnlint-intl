import testRule from "./test-rule.js";

/**
 * @typedef { import('./types.js').ModdleElement } ModdleElement
 *
 * @typedef { import('./types.js').ReportingCategory } ReportingCategory
 * @typedef { import('./types.js').ReportingCategoryMap } ReportingCategoryMap
 * @typedef { import('./types.js').RuleErrorCategory } RuleErrorCategory
 *
 * @typedef { import('./types.js').Resolver } Resolver
 * @typedef { import('./types.js').Config } Config
 *
 * @typedef { import('./types.js').RuleDefinition } RuleDefinition
 * @typedef { import('./types.js').RuleConfigs } RuleConfigs
 * @typedef { import('./types.js').RuleConfig } RuleConfig
 *
 * @typedef { {
 *   name: string,
 *   rule: RuleDefinition,
 *   config: any,
 *   category: ReportingCategory
 * } } ResolvedRuleDefinition
 *
 * @typedef { import('./types.js').Report } Report
 * @typedef { Report & Pick<RuleDefinition, 'meta'> & {
 *   category: ReportingCategory | RuleErrorCategory
 * } } AnnotatedReport
 *
 * @typedef { import('./types.js').TransformRuleFn } TransformRuleFn
 *
 * @typedef { Record<string, AnnotatedReport[]> } LintResults
 */

/**
 * Transform a rule after it is loaded.
 *
 * @param { RuleDefinition } rule
 * @param { { pkg: string, ruleName: string } } options
 */
const noopTransformRule = (rule, options) => rule;

/** @type { ReportingCategoryMap } */
const categoryMap = {
    0: "off",
    1: "warn",
    2: "error",
    3: "info",
};

/** @type { RuleErrorCategory } */
const ruleErrorCategory = "rule-error";

export default class Linter {
    /**
     * @param { {
     *   config?: Config,
     *   resolver: Resolver,
     *   transformRule?: TransformRuleFn
     * } } options
     */
    constructor(options) {
        const {
            config = {},
            resolver,
            transformRule = noopTransformRule,
        } = options || {};

        if (typeof resolver === "undefined") {
            throw new Error("must provide <options.resolver>");
        }

        /** @type { Config } */
        this.config = config;

        /** @type { Resolver } */
        this.resolver = resolver;

        /** @type { TransformRuleFn } */
        this.transformRule = transformRule;

        /** @type { Record<string, RuleDefinition> } */
        this.cachedRules = {};

        /** @type { Record<string, Config> } */
        this.cachedConfigs = {};
    }

    /**
     * Applies a rule on the moddleRoot and adds reports to the finalReport
     *
     * @param { ModdleElement } moddleRoot
     * @param { ResolvedRuleDefinition } ruleDefinition
     *
     * @return { AnnotatedReport[] } reports
     */
    applyRule(moddleRoot, ruleDefinition) {
        const {config, rule, category, name} = ruleDefinition;

        try {
            const reports = testRule({
                moddleRoot,
                rule,
                config,
            });

            return reports.map((report) => ({
                ...report,
                meta: rule.meta,
                category,
            }));
        } catch (e) {
            console.error("rule <" + name + "> failed with error: ", e);

            return [
                {
                    message: /** @type { Error } */ (e).message,
                    category: ruleErrorCategory,
                },
            ];
        }
    }

    /**
     * @param { string } name
     * @param  { RuleConfig } config
     *
     * @return { Promise<RuleDefinition> }
     */
    resolveRule(name, config) {
        const {pkg, ruleName} = this.parseRuleName(name);

        const id = `${pkg}-${ruleName}`;

        const cached = this.cachedRules[id];
        if (cached) {
            return Promise.resolve(cached);
        }

        return Promise.resolve(this.resolver.resolveRule(pkg, ruleName)).then(
            (ruleFactory) => {
                if (!ruleFactory) {
                    throw new Error(`unknown rule <${name}>`);
                }

                const rule = (this.cachedRules[id] = this.transformRule(
                    ruleFactory(config),
                    {pkg, ruleName},
                ));

                return rule;
            },
        );
    }

    /**
     * @param {string} name
     * @return {Promise<Config>}
     */
    resolveConfig(name) {
        const {pkg, configName} = this.parseConfigName(name);

        const id = `${pkg}-${configName}`;

        const cached = this.cachedConfigs[id];
        if (cached) {
            return Promise.resolve(cached);
        }

        return Promise.resolve(this.resolver.resolveConfig(pkg, configName)).then(
            (config) => {
                if (!config) {
                    throw new Error(`unknown config <${name}>`);
                }

                const actualConfig = (this.cachedConfigs[id] = this.normalizeConfig(
                    config,
                    pkg,
                ));

                return actualConfig;
            },
        );
    }

    /**
     * Take a linter config and return list of resolved rules.
     *
     * @param { Config } config
     * @return { Promise<ResolvedRuleDefinition[]> }
     */
    resolveRules(config) {
        return this.resolveConfiguredRules(config).then((rulesConfig) => {
            // parse rule values
            const parsedRules = Object.entries(rulesConfig).map(([name, value]) => {
                const {category, config} = this.parseRuleValue(value);

                return {
                    name,
                    category,
                    config,
                };
            });

            // filter only for enabled rules
            const enabledRules = parsedRules.filter(
                (definition) => definition.category !== "off",
            );

            // load enabled rules
            const loaders = enabledRules.map((definition) => {
                const {name, config} = definition;

                return this.resolveRule(name, config).then((rule) => ({
                    ...definition,
                    rule,
                }));
            });

            return Promise.all(loaders);
        });
    }

    /**
     * @param { Config } config
     * @return { Promise<RuleConfigs> }
     */
    resolveConfiguredRules(config) {
        let parents = config.extends;

        if (typeof parents === "string") {
            parents = [parents];
        }

        if (typeof parents === "undefined") {
            parents = [];
        }

        return Promise.all(
            parents.map((configName) =>
                this.resolveConfig(configName).then((cfg) =>
                    this.resolveConfiguredRules(cfg),
                ),
            ),
        ).then((inheritedRules) => {
            const overrideRules = this.normalizeConfig(config, "bpmnlint").rules;

            const rules = [...inheritedRules, overrideRules].reduce(
                (acc, currentRules) => ({
                    ...acc,
                    ...currentRules,
                }),
                {},
            );

            return rules;
        });
    }

    /**
     * Lint the given model root, using the specified linter config.
     *
     * @param { ModdleElement } moddleRoot
     * @param { Config } [config] the bpmnlint configuration to use
     *
     * @return { Promise<LintResults> } lint results, keyed by rule names
     */
    lint(moddleRoot, config) {
        config = config || this.config;

        // load rules
        return this.resolveRules(config).then((ruleDefinitions) => {
            /** @type { LintResults } */
            const allReports = {};

            ruleDefinitions.forEach((ruleDefinition) => {
                const {name} = ruleDefinition;

                const reports = this.applyRule(moddleRoot, ruleDefinition);

                if (reports.length) {
                    allReports[name] = reports;
                }
            });

            return allReports;
        });
    }

    /**
     * @param { RuleConfig } value
     * @return { { config: any, category: ReportingCategory } }
     */
    parseRuleValue(value) {
        let category;
        let config;

        if (Array.isArray(value)) {
            category = value[0];
            config = value[1];
        } else {
            category = value;
            config = {};
        }

        // normalize rule flag to <error> and <warn> which
        // may be upper case or a number at this point
        if (typeof category === "string") {
            category = category.toLowerCase();
        }

        category = categoryMap[category] || category;

        return {
            config,
            category,
        };
    }

    parseRuleName(name, localPackage = "bpmnlint") {
        /**
         * We recognize the following rule name patterns:
         *
         * {RULE_NAME} => PKG = 'bpmnlint'
         * bpmnlint/{RULE_NAME} => PKG = 'bpmnlint'
         * {PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         * bpmnlint-plugin-{PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         * @scope/{PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         * @scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         */

        const match = /^(?:(?:(@[^/]+)\/)?([^@]{1}[^/]*)\/)?([^/]+)$/.exec(name);

        if (!match) {
            throw new Error(`unparseable rule name <${name}>`);
        }

        const [_, ns, packageName, ruleName] = match;

        if (!packageName) {
            return {
                pkg: localPackage,
                ruleName,
            };
        }

        const pkg = `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`;

        return {
            pkg,
            ruleName,
        };
    }

    parseConfigName(name) {
        /**
         * We recognize the following config name patterns:
         *
         * bpmnlint:{CONFIG_NAME} => PKG = 'bpmnlint'
         * plugin:{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         * plugin:bpmnlint-plugin-{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         * plugin:@scope/{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         * plugin:@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
         */

        const match =
            /^(?:(?:plugin:(?:(@[^/]+)\/)?([^@]{1}[^/]*)\/)|bpmnlint:)([^/]+)$/.exec(
                name,
            );

        if (!match) {
            throw new Error(`unparseable config name <${name}>`);
        }

        const [_, ns, packageName, configName] = match;

        if (!packageName) {
            return {
                pkg: "bpmnlint",
                configName,
            };
        }

        const pkg = `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`;

        return {
            pkg,
            configName,
        };
    }

    getSimplePackageName(name) {
        /**
         * We recognize the following package name patterns:
         *
         * bpmnlint => PKG = 'bpmnlint'
         * {PACKAGE_SHORTCUT} => PKG = PACKAGE_SHORTCUT
         * bpmnlint-plugin-{PACKAGE_SHORTCUT}' => PKG = PACKAGE_SHORTCUT
         * @scope/{PACKAGE_SHORTCUT} => PKG = '@scope/{PACKAGE_SHORTCUT}'
         * @scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}' => PKG = '@scope/PACKAGE_SHORTCUT'
         */

        const match = /^(?:(@[^/]+)\/)?([^/]+)$/.exec(name);

        if (!match) {
            throw new Error(`unparseable package name <${name}>`);
        }

        const [_, ns, packageName] = match;

        return `${ns ? ns + "/" : ""}${unprefixPackage(packageName)}`;
    }

    /**
     * Validate and return validated config.
     *
     * @param  {Object} config
     * @param  {String} localPackage
     *
     * @return {Object} validated config
     */
    normalizeConfig(config, localPackage) {
        const rules = config.rules || {};

        const validatedRules = Object.keys(rules).reduce((normalizedRules, name) => {
            const value = rules[name];

            const {pkg, ruleName} = this.parseRuleName(name, localPackage);

            const normalizedName =
                pkg === "bpmnlint"
                    ? ruleName
                    : `${this.getSimplePackageName(pkg)}/${ruleName}`;

            normalizedRules[normalizedName] = value;

            return normalizedRules;
        }, {});

        return {
            ...config,
            rules: validatedRules,
        };
    }
}

// helpers ///////////////////////////

function prefixPackage(pkg) {
    if (pkg === "bpmnlint") {
        return "bpmnlint";
    }

    if (pkg.startsWith("bpmnlint-plugin-")) {
        return pkg;
    }

    return `bpmnlint-plugin-${pkg}`;
}

function unprefixPackage(pkg) {
    if (pkg.startsWith("bpmnlint-plugin-")) {
        return pkg.substring("bpmnlint-plugin-".length);
    }

    return pkg;
}