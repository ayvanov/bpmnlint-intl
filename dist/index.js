import { isArray, isFunction, isObject } from "min-dash";

//#region config/all.js
const allRules = [
	"ad-hoc-sub-process",
	"conditional-event",
	"conditional-flows",
	"end-event-required",
	"event-based-gateway",
	"event-sub-process-typed-start-event",
	"fake-join",
	"global",
	"label-required",
	"link-event",
	"no-bpmndi",
	"no-complex-gateway",
	"no-disconnected",
	"no-duplicate-sequence-flows",
	"no-gateway-join-fork",
	"no-implicit-end",
	"no-implicit-split",
	"no-implicit-start",
	"no-inclusive-gateway",
	"no-overlapping-elements",
	"single-blank-start-event",
	"single-event-definition",
	"start-event-required",
	"sub-process-blank-start-event",
	"superfluous-gateway",
	"superfluous-termination"
];
var all_default = { rules: allRules.reduce(function(rules, ruleName) {
	rules[ruleName] = "error";
	return rules;
}, {}) };

//#endregion
//#region config/correctness.js
var correctness_default = { rules: {
	"ad-hoc-sub-process": "error",
	"conditional-event": "error",
	"event-based-gateway": "error",
	"event-sub-process-typed-start-event": "error",
	"link-event": "error",
	"no-duplicate-sequence-flows": "warn",
	"sub-process-blank-start-event": "error",
	"single-blank-start-event": "error"
} };

//#endregion
//#region config/recommended.js
var recommended_default = { rules: {
	"ad-hoc-sub-process": "error",
	"conditional-flows": "error",
	"end-event-required": "error",
	"event-based-gateway": "error",
	"event-sub-process-typed-start-event": "error",
	"fake-join": "warn",
	global: "warn",
	"label-required": "error",
	"link-event": "error",
	"no-bpmndi": "error",
	"no-complex-gateway": "error",
	"no-disconnected": "error",
	"no-duplicate-sequence-flows": "error",
	"no-gateway-join-fork": "error",
	"no-implicit-split": "error",
	"no-implicit-end": "error",
	"no-implicit-start": "error",
	"no-inclusive-gateway": "error",
	"no-overlapping-elements": "warn",
	"single-blank-start-event": "error",
	"single-event-definition": "error",
	"start-event-required": "error",
	"sub-process-blank-start-event": "error",
	"superfluous-gateway": "warn",
	"superfluous-termination": "warn"
} };

//#endregion
//#region lib/traverse.js
/**
* @typedef { import('./types.js').ModdleElement } ModdleElement
*
* @typedef { (element: ModdleElement) => boolean | void } EnterFn
* @typedef { (element: ModdleElement) => void } LeaveFn
*/
/**
* Check if a type is simple, primitive.
*
* @param {string} type
* @return {boolean}
*/
function isSimpleType(type) {
	return [
		"String",
		"Boolean",
		"Integer",
		"Real"
	].includes(type);
}
/**
* Traverse a moddle tree, depth first from top to bottom
* and call the passed visitor fn.
*
* @param { ModdleElement } element
* @param { { enter?: EnterFn; leave?: LeaveFn } } options
*/
function traverse(element, options) {
	const enter = options.enter;
	const leave = options.leave;
	const enterSubTree = enter && enter(element);
	const descriptor = element.$descriptor;
	if (enterSubTree !== false && !descriptor.isGeneric) descriptor.properties.filter((p) => {
		return !p.isAttr && !p.isReference && !isSimpleType(p.type);
	}).forEach((p) => {
		if (p.name in element) {
			const propertyValue = element[p.name];
			if (p.isMany) propertyValue.forEach((child) => {
				traverse(child, options);
			});
			else traverse(propertyValue, options);
		}
	});
	leave && leave(element);
}

//#endregion
//#region lib/test-rule.js
/**
* @typedef { import('./types.js').EnterFn } EnterFn
* @typedef { import('./types.js').ModdleElement } ModdleElement
* @typedef { import('./types.js').RuleDefinition } RuleDefinition
* @typedef { import('./types.js').Report } Report
*/
var Reporter = class {
	/**
	* @param { {
	*   moddleRoot: ModdleElement,
	*   rule: RuleDefinition
	* } } options
	*/
	constructor({ moddleRoot, rule }) {
		this.rule = rule;
		this.moddleRoot = moddleRoot;
		/**
		* @type { Report[] }
		*/
		this.messages = [];
		this.report = this.report.bind(this);
	}
	/**
	* @param { string } id
	* @param { string } message
	* @param { string[] | { path?: string[], [key: string]: any } } [path]
	*
	* @example
	*
	* ```javascript
	* reporter.report('foo', 'Foo error', [ 'foo', 'bar', 'baz' ]);
	*
	* reporter.report('foo', 'Foo error', {
	*   path: [ 'foo', 'bar', 'baz' ],
	*   foo: 'foo'
	* });
	* ```
	*/
	report(id, message, path) {
		let report = {
			id,
			message
		};
		if (path && isArray(path)) report = {
			...report,
			path
		};
		if (path && isObject(path)) report = {
			...report,
			...path
		};
		this.messages.push(report);
	}
};
/**
* @param { {
*   moddleRoot: ModdleElement,
*   rule: RuleDefinition,
*   config: any
* } } options
*
* @return { Report[] } lint reports
*/
function testRule({ moddleRoot, rule }) {
	const reporter = new Reporter({
		rule,
		moddleRoot
	});
	const check = rule.check || {};
	const leave = "leave" in check ? check.leave : void 0;
	const enter = "enter" in check ? check.enter : isFunction(check) ? check : void 0;
	if (!enter && !leave) throw new Error("no check implemented");
	traverse(moddleRoot, {
		enter: enter ? (node) => enter(node, reporter) : void 0,
		leave: leave ? (node) => leave(node, reporter) : void 0
	});
	return reporter.messages;
}

//#endregion
//#region lib/linter.js
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
	3: "info"
};
/** @type { RuleErrorCategory } */
const ruleErrorCategory = "rule-error";
var Linter = class {
	/**
	* @param { {
	*   config?: Config,
	*   resolver: Resolver,
	*   transformRule?: TransformRuleFn
	* } } options
	*/
	constructor(options) {
		const { config = {}, resolver, transformRule = noopTransformRule } = options || {};
		if (typeof resolver === "undefined") throw new Error("must provide <options.resolver>");
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
		const { config, rule, category, name } = ruleDefinition;
		try {
			return testRule({
				moddleRoot,
				rule,
				config
			}).map((report) => ({
				...report,
				meta: rule.meta,
				category
			}));
		} catch (e) {
			console.error("rule <" + name + "> failed with error: ", e);
			return [{
				message: e.message,
				category: ruleErrorCategory
			}];
		}
	}
	/**
	* @param { string } name
	* @param  { RuleConfig } config
	*
	* @return { Promise<RuleDefinition> }
	*/
	resolveRule(name, config) {
		const { pkg, ruleName } = this.parseRuleName(name);
		const id = `${pkg}-${ruleName}`;
		const cached = this.cachedRules[id];
		if (cached) return Promise.resolve(cached);
		return Promise.resolve(this.resolver.resolveRule(pkg, ruleName)).then((ruleFactory) => {
			if (!ruleFactory) throw new Error(`unknown rule <${name}>`);
			return this.cachedRules[id] = this.transformRule(ruleFactory(config), {
				pkg,
				ruleName
			});
		});
	}
	/**
	* @param {string} name
	* @return {Promise<Config>}
	*/
	resolveConfig(name) {
		const { pkg, configName } = this.parseConfigName(name);
		const id = `${pkg}-${configName}`;
		const cached = this.cachedConfigs[id];
		if (cached) return Promise.resolve(cached);
		return Promise.resolve(this.resolver.resolveConfig(pkg, configName)).then((config) => {
			if (!config) throw new Error(`unknown config <${name}>`);
			return this.cachedConfigs[id] = this.normalizeConfig(config, pkg);
		});
	}
	/**
	* Take a linter config and return list of resolved rules.
	*
	* @param { Config } config
	* @return { Promise<ResolvedRuleDefinition[]> }
	*/
	resolveRules(config) {
		return this.resolveConfiguredRules(config).then((rulesConfig) => {
			const loaders = Object.entries(rulesConfig).map(([name, value]) => {
				const { category, config } = this.parseRuleValue(value);
				return {
					name,
					category,
					config
				};
			}).filter((definition) => definition.category !== "off").map((definition) => {
				const { name, config } = definition;
				return this.resolveRule(name, config).then((rule) => ({
					...definition,
					rule
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
		if (typeof parents === "string") parents = [parents];
		if (typeof parents === "undefined") parents = [];
		return Promise.all(parents.map((configName) => this.resolveConfig(configName).then((cfg) => this.resolveConfiguredRules(cfg)))).then((inheritedRules) => {
			const overrideRules = this.normalizeConfig(config, "bpmnlint").rules;
			return [...inheritedRules, overrideRules].reduce((acc, currentRules) => ({
				...acc,
				...currentRules
			}), {});
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
		return this.resolveRules(config).then((ruleDefinitions) => {
			/** @type { LintResults } */
			const allReports = {};
			ruleDefinitions.forEach((ruleDefinition) => {
				const { name } = ruleDefinition;
				const reports = this.applyRule(moddleRoot, ruleDefinition);
				if (reports.length) allReports[name] = reports;
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
		if (typeof category === "string") category = category.toLowerCase();
		category = categoryMap[category] || category;
		return {
			config,
			category
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
		if (!match) throw new Error(`unparseable rule name <${name}>`);
		const [_, ns, packageName, ruleName] = match;
		if (!packageName) return {
			pkg: localPackage,
			ruleName
		};
		return {
			pkg: `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`,
			ruleName
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
		const match = /^(?:(?:plugin:(?:(@[^/]+)\/)?([^@]{1}[^/]*)\/)|bpmnlint:)([^/]+)$/.exec(name);
		if (!match) throw new Error(`unparseable config name <${name}>`);
		const [_, ns, packageName, configName] = match;
		if (!packageName) return {
			pkg: "bpmnlint",
			configName
		};
		return {
			pkg: `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`,
			configName
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
		if (!match) throw new Error(`unparseable package name <${name}>`);
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
			const { pkg, ruleName } = this.parseRuleName(name, localPackage);
			const normalizedName = pkg === "bpmnlint" ? ruleName : `${this.getSimplePackageName(pkg)}/${ruleName}`;
			normalizedRules[normalizedName] = value;
			return normalizedRules;
		}, {});
		return {
			...config,
			rules: validatedRules
		};
	}
};
function prefixPackage(pkg) {
	if (pkg === "bpmnlint") return "bpmnlint";
	if (pkg.startsWith("bpmnlint-plugin-")) return pkg;
	return `bpmnlint-plugin-${pkg}`;
}
function unprefixPackage(pkg) {
	if (pkg.startsWith("bpmnlint-plugin-")) return pkg.substring(16);
	return pkg;
}

//#endregion
//#region lib/resolver/static-resolver.js
/**
* @typedef { import('../types.js').RuleFactory } RuleFactory
* @typedef { import('../types.js').Config } Config
*/
/**
* A resolver that resolves rules and packages from a static cache.
*
* @param { any } cache
*/
var StaticResolver = class {
	/**
	* @param {any} cache
	*/
	constructor(cache) {
		this.cache = cache;
	}
	/**
	* @param { string } pkg
	* @param { string } ruleName
	*
	* @return { RuleFactory }
	*/
	resolveRule(pkg, ruleName) {
		return this.resolve("rule", pkg, ruleName);
	}
	/**
	* @param { string } pkg
	* @param { string } configName
	*
	* @return { Config }
	*/
	resolveConfig(pkg, configName) {
		return this.resolve("config", pkg, configName);
	}
	/**
	* @param {string} type
	* @param {string} pkg
	* @param {string} name
	*/
	resolve(type, pkg, name) {
		const id = `${pkg}/${name}`;
		const resolved = this.cache[`${type}:${id}`];
		if (!resolved) throw new Error(`unknown ${type} <${id}>`);
		return resolved;
	}
};

//#endregion
//#region rules/locales/en.js
/**
* English (default) locale for bpmnlint rule messages.
*/
var en_default = {
	"types.process": "Process",
	"types.subProcess": "Sub process",
	"directions.catch": "catch",
	"directions.throw": "throw",
	"adHocSubProcess.startEventNotAllowed": "A <Start Event> is not allowed in <Ad Hoc Sub Process>",
	"adHocSubProcess.endEventNotAllowed": "An <End Event> is not allowed in <Ad Hoc Sub Process>",
	"conditionalEvent.missingCondition": "Conditional event is missing a condition",
	"conditionalFlows.missingCondition": "Sequence flow is missing condition",
	"endEventRequired.missingEndEvent": "{type} is missing end event",
	"eventBasedGateway.tooFewOutgoing": "An <Event-based Gateway> must have at least 2 outgoing <Sequence Flows>",
	"eventBasedGateway.conditionalFlow": "A <Sequence Flow> outgoing from an <Event-based Gateway> must not be conditional",
	"eventSubProcessTypedStartEvent.missingEventDefinition": "Start event is missing event definition",
	"fakeJoin.incomingFlowsDoNotJoin": "Incoming flows do not join",
	"global.missingName": "Element is missing name",
	"global.unused": "Element is unused",
	"global.nameNotUnique": "Element name is not unique",
	"helper.discouragedType": "Element type <{type}> is discouraged",
	"labelRequired.missingLabel": "Element is missing label/name",
	"linkEvent.missingLinkName": "Link event is missing link name",
	"linkEvent.missingCounterpart": "Link {direction} event with link name <{name}> missing in scope",
	"linkEvent.duplicateCatch": "Duplicate link catch event with link name <{name}> in scope",
	"linkEvent.missingCatch": "Link catch event with link name <{name}> missing in scope",
	"noBpmndi.missingBpmndi": "Element is missing bpmndi",
	"noDisconnected.notConnected": "Element is not connected",
	"noDuplicateSequenceFlows.duplicate": "SequenceFlow is a duplicate",
	"noDuplicateSequenceFlows.duplicateOutgoing": "Duplicate outgoing sequence flows",
	"noDuplicateSequenceFlows.duplicateIncoming": "Duplicate incoming sequence flows",
	"noGatewayJoinFork.forksAndJoins": "Gateway forks and joins",
	"noImplicitEnd.implicitEnd": "Element is an implicit end",
	"noImplicitSplit.implicitSplit": "Flow splits implicitly",
	"noImplicitStart.implicitStart": "Element is an implicit start",
	"noOverlappingElements.overlaps": "Element overlaps with other element",
	"noOverlappingElements.outsideBoundary": "Element is outside of parent boundary",
	"singleBlankStartEvent.multipleBlankStartEvents": "{type} has multiple blank start events",
	"singleEventDefinition.multipleDefinitions": "Event has multiple event definitions",
	"startEventRequired.missingStartEvent": "{type} is missing start event",
	"subProcessBlankStartEvent.mustBeBlank": "Start event must be blank",
	"superfluousGateway.superfluous": "Gateway is superfluous. It only has one source and target.",
	"superfluousTermination.superfluous": "Termination is superfluous."
};

//#endregion
//#region rules/locales/ru.js
/**
* Russian locale for bpmnlint rule messages.
*/
var ru_default = {
	"types.process": "Процесс",
	"types.subProcess": "Подпроцесс",
	"directions.catch": "принимающее",
	"directions.throw": "отправляющее",
	"adHocSubProcess.startEventNotAllowed": "<Начальное событие> недопустимо в <Нерегулярном подпроцессе>",
	"adHocSubProcess.endEventNotAllowed": "<Конечное событие> недопустимо в <Нерегулярном подпроцессе>",
	"conditionalEvent.missingCondition": "В условном событии отсутствует условие",
	"conditionalFlows.missingCondition": "У потока управления отсутствует условие",
	"endEventRequired.missingEndEvent": "{type} не содержит конечного события",
	"eventBasedGateway.tooFewOutgoing": "<Шлюз на основе событий> должен иметь не менее 2 исходящих <потоков управления>",
	"eventBasedGateway.conditionalFlow": "<Поток управления>, исходящий из <шлюза на основе событий>, не должен иметь условия",
	"eventSubProcessTypedStartEvent.missingEventDefinition": "У начального события отсутствует определение события",
	"fakeJoin.incomingFlowsDoNotJoin": "Входящие потоки не объединяются",
	"global.missingName": "У элемента отсутствует имя",
	"global.unused": "Элемент не используется",
	"global.nameNotUnique": "Имя элемента не уникально",
	"helper.discouragedType": "Тип элемента <{type}> не рекомендован к использованию",
	"labelRequired.missingLabel": "У элемента отсутствует метка/имя",
	"linkEvent.missingLinkName": "У связывающего события отсутствует имя связи",
	"linkEvent.missingCounterpart": "Отсутствует {direction} событие связи с именем <{name}> в области",
	"linkEvent.duplicateCatch": "Дублирующееся принимающее событие связи с именем <{name}> в области",
	"linkEvent.missingCatch": "Отсутствует принимающее событие связи с именем <{name}> в области",
	"noBpmndi.missingBpmndi": "У элемента отсутствует описание BPMNDI",
	"noDisconnected.notConnected": "Элемент не подключён",
	"noDuplicateSequenceFlows.duplicate": "Поток управления является дубликатом",
	"noDuplicateSequenceFlows.duplicateOutgoing": "Дублирующиеся исходящие потоки управления",
	"noDuplicateSequenceFlows.duplicateIncoming": "Дублирующиеся входящие потоки управления",
	"noGatewayJoinFork.forksAndJoins": "Шлюз одновременно разветвляет и объединяет потоки",
	"noImplicitEnd.implicitEnd": "Элемент является неявным завершением",
	"noImplicitSplit.implicitSplit": "Поток неявно разветвляется",
	"noImplicitStart.implicitStart": "Элемент является неявным началом",
	"noOverlappingElements.overlaps": "Элемент перекрывается с другим элементом",
	"noOverlappingElements.outsideBoundary": "Элемент находится за пределами родительского контейнера",
	"singleBlankStartEvent.multipleBlankStartEvents": "{type} содержит несколько пустых начальных событий",
	"singleEventDefinition.multipleDefinitions": "Событие содержит несколько определений событий",
	"startEventRequired.missingStartEvent": "{type} не содержит начального события",
	"subProcessBlankStartEvent.mustBeBlank": "Начальное событие должно быть пустым",
	"superfluousGateway.superfluous": "Шлюз избыточен: он имеет только один источник и одну цель.",
	"superfluousTermination.superfluous": "Завершение является избыточным."
};

//#endregion
//#region rules/i18n.js
/**
* @type { Record<string, Record<string, string>> }
*/
const locales = {
	en: en_default,
	ru: ru_default
};
/**
* @type { string }
*/
let currentLocale = "en";
/**
* Set the active locale for rule messages.
*
* @param { string } locale - Locale code, e.g. 'en' or 'ru'
*
* @throws { Error } if the locale is not supported
*/
function setLocale(locale) {
	if (!locales[locale]) throw new Error(`Unsupported locale: "${locale}". Available locales: ${Object.keys(locales).join(", ")}`);
	currentLocale = locale;
}
/**
* Get the currently active locale code.
*
* @return { string }
*/
function getLocale() {
	return currentLocale;
}

//#endregion
//#region lib/index.js
const all = [];
const correctness = [];
const recommended = [];
for (const rule in all_default) all[rule] = import(`../rules/${rule}.js`);
for (const rule in correctness_default) correctness[rule] = import(`../rules/${rule}.js`);
for (const rule in recommended_default) recommended[rule] = import(`../rules/${rule}.js`);
const rules = {
	all,
	correctness,
	recommended
};

//#endregion
export { Linter, StaticResolver, getLocale, rules, setLocale };