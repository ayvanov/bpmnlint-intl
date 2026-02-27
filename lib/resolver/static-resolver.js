/**
 * @typedef { import('../types.js').RuleFactory } RuleFactory
 * @typedef { import('../types.js').Config } Config
 */

/**
 * A resolver that resolves rules and packages from a static cache.
 *
 * @param { any } cache
 */
class StaticResolver {
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
        return /** @type { RuleFactory } */ (this.resolve("rule", pkg, ruleName));
    }

    /**
     * @param { string } pkg
     * @param { string } configName
     *
     * @return { Config }
     */
    resolveConfig(pkg, configName) {
        return /** @type { Config } */ (this.resolve("config", pkg, configName));
    }

    /**
     * @param {string} type
     * @param {string} pkg
     * @param {string} name
     */
    resolve(type, pkg, name) {
        const id = `${pkg}/${name}`;

        const resolved = this.cache[`${type}:${id}`];

        if (!resolved) {
            throw new Error(`unknown ${type} <${id}>`);
        }

        return resolved;
    }
}

export default StaticResolver;
