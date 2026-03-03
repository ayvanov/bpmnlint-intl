import Linter from "./linter.js";
import StaticResolver from './resolver/static-resolver.js';


import {setLocale, getLocale} from "../rules/i18n.js";

const rules = import.meta.glob('../rules/*.js', {eager: true})

const resolveConfig = (configs = []) => {
    return (Array.isArray(configs) ? configs : [configs]).reduce((acc, {rules: rulesDef}) => {
        for (const rule in rulesDef) {
            acc[`rule:bpmnlint/${rule}`] = rules[`../rules/${rule}.js`].default;
        }
        return acc;
    }, {});
}

export {Linter, StaticResolver, setLocale, getLocale, resolveConfig};