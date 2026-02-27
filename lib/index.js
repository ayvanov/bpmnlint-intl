import allCfg from '../config/all.js';
import correctnessCfg from '../config/correctness.js';
import recommendedCfg from '../config/recommended.js';

import Linter from "./linter.js";
import StaticResolver from './resolver/static-resolver.js';


import {setLocale, getLocale} from "../rules/i18n.js";

const all = [];
const correctness = [];
const recommended = [];

for (const rule in allCfg) {
    all[rule] = import(`../rules/${rule}.js`);
}

for (const rule in correctnessCfg) {
    correctness[rule] = import(`../rules/${rule}.js`);
}

for (const rule in recommendedCfg) {
    recommended[rule] = import(`../rules/${rule}.js`);
}

const rules = {
    all, correctness, recommended
}

export {Linter, StaticResolver, setLocale, getLocale, rules};