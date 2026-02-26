import path from "node:path";
import { cwd } from "node:process";

import { isString } from "min-dash";

/**
 * @typedef { import('../types.js').RuleFactory } RuleFactory
 * @typedef { import('../types.js').Config } Config
 */

import { createScopedRequire } from "./helper.js";

/**
 * A resolver that locates rules and configurations
 * using node module resolution.
 *
 * @param { { require?: NodeRequire, requireLocal?: NodeRequire } } [options]
 */
function NodeResolver(options) {
  this.require = (options && options.require) || createScopedRequire(cwd());

  // requireLocal is used to resolve built-in rules/configs.
  // In tests an injectable sync mock is accepted; in production
  // we fall back to dynamic import (see _importLocal).
  this.requireLocal = (options && options.requireLocal) || null;

  try {
    this.pkg = this.require("./package.json").name;
  } catch (err) {
    this.pkg = "__unknown";
  }
}

export default NodeResolver;

/**
 * Resolve a built-in module (rule or config) using either the injected
 * requireLocal mock (tests) or a dynamic import (production).
 *
 * @param { string } relativePath  – e.g. "../../rules/label-required"
 * @param { string } relativeESMPath – e.g. "../../rules/label-required.js"
 *
 * @return { Promise<any> }
 */
NodeResolver.prototype._importLocal = function (relativePath, relativeESMPath) {
  if (this.requireLocal) {
    // Test mode: sync mock wrapped in a promise; catch sync throws too
    try {
      return Promise.resolve(this.requireLocal(relativePath));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Production mode: use dynamic import relative to this file
  return import(new URL(relativeESMPath, import.meta.url).href).then(
    (mod) => mod.default ?? mod,
  );
};

/**
 * @param { string } pkg
 * @param { string } ruleName
 *
 * @return { Promise<RuleFactory> }
 */
NodeResolver.prototype.resolveRule = function (pkg, ruleName) {
  const originalPkg = pkg;

  pkg = this.normalizePkg(pkg);

  let pkgInstance;

  // (1) try resolving rule via $PKG.rules[$NAME]
  try {
    pkgInstance = this.require(pkg);
  } catch (err) {
    /* ignore */
  }

  if (pkgInstance) {
    const rules = pkgInstance.rules || {};

    if (ruleName in rules) {
      const rule = rules[ruleName];

      if (!isString(rule)) {
        return Promise.reject(
          new Error(
            "cannot resolve rule <" +
              ruleName +
              "> from <" +
              originalPkg +
              ">: illegal rule export (expected path reference)",
          ),
        );
      }

      // local reference, resolved relative to pkg location
      if (rule.startsWith(".")) {
        const pkgDir = path.dirname(this.require.resolve(pkg));
        return Promise.resolve(
          this.require(path.posix.normalize(`${pkgDir}/${rule}`)),
        );
      }

      // absolute reference
      return Promise.resolve(this.require(rule));
    }
  }

  // (2) try resolving rule via $PKG/rules/$NAME
  if (pkg === "bpmnlint") {
    return this._importLocal(
      `../../rules/${ruleName}`,
      `../../rules/${ruleName}.js`,
    ).catch(() => {
      throw new Error(
        "cannot resolve rule <" + ruleName + "> from <" + originalPkg + ">",
      );
    });
  }

  try {
    return Promise.resolve(this.require(`${pkg}/rules/${ruleName}`));
  } catch (err) {
    /* ignore */
  }

  return Promise.reject(
    new Error(
      "cannot resolve rule <" + ruleName + "> from <" + originalPkg + ">",
    ),
  );
};

/**
 * @param { string } pkg
 * @param { string } configName
 *
 * @return { Promise<Config> }
 */
NodeResolver.prototype.resolveConfig = function (pkg, configName) {
  const originalPkg = pkg;

  pkg = this.normalizePkg(pkg);

  // (1) try resolving config via $PKG.configs[$NAME]
  try {
    const instance = this.require(pkg);

    const configs = instance.configs || {};

    if (configName in configs) {
      return Promise.resolve(configs[configName]);
    }
  } catch (err) {
    /* ignore */
  }

  // (2) try resolving config via $PKG/config/$NAME
  if (pkg === "bpmnlint") {
    return this._importLocal(
      `../../config/${configName}`,
      `../../config/${configName}.js`,
    ).catch(() => {
      throw new Error(
        "cannot resolve config <" + configName + "> from <" + originalPkg + ">",
      );
    });
  }

  try {
    return Promise.resolve(this.require(`${pkg}/config/${configName}`));
  } catch (err) {
    /* ignore */
  }

  return Promise.reject(
    new Error(
      "cannot resolve config <" + configName + "> from <" + originalPkg + ">",
    ),
  );
};

NodeResolver.prototype.normalizePkg = function (pkg) {
  if (pkg !== "bpmnlint" && pkg === this.pkg) {
    pkg = ".";
  }

  return pkg;
};
