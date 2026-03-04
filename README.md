# bpmnlint-intl (bpmnlint fork)

Validate your BPMN diagrams based on configurable lint rules with multi-language support. No CLI included, ready for browser usage.


## Installation

Install the utility via [npm](https://www.npmjs.com/package/bpmnlint):

```sh
npm install bpmnlint-intl
```


## Example Usage

Create custom linter class with desired rules:
```javascript
import {Linter, resolveConfig, setLocale, StaticResolver} from 'bpmnlint-intl';
import correctness from 'bpmnlint-intl/config/correctness';
import {configs} from 'bpmnlint-plugin-camunda-compat';
import historyTTLRule from 'bpmnlint-plugin-camunda-compat/rules/camunda-platform/history-time-to-live.js';

export default class CustomLinter {

    export default class PlatformLinter {

    constructor({locale = 'en'} = {}) {
        setLocale(locale);
        this.cache = resolveConfig([correctness]);
        this.cache['rule:bpmnlint/history-time-to-live'] = historyTTLRule;
        this.config = {
            rules: {
                ...correctness.rules,
                ...configs['camunda-platform-7-24'].rules
            }
        };
    }

    async lint(root) {
        return new Linter({
            resolver: new StaticResolver(this.cache), config: this.config
        }).lint(root);
    }
}
}
```
Use it:

```javascript
const linter = new CustomLinter({locale: 'ru'});
const {rootElement} = await modeler.get('moddle').fromXML(xml);
const reports = await this.linter.lint(rootElement);
console.log(reports);
```
## Rules

Our [documentation](https://github.com/bpmn-io/bpmnlint/tree/main/docs/rules#rules) lists all currenty implemented rules, the [`./rules` folder](https://github.com/bpmn-io/bpmnlint/tree/main/rules) contains each rules implementation.

Do you miss a rule that should be included? [Propose a new rule](https://github.com/bpmn-io/bpmnlint/issues/new?assignees=&labels=rules&template=NEW_RULE.md).

## Locales

Available locales are listed in [`./rules/locales` folder](https://github.com/ayvanov/bpmnlint-intl/tree/main/rules/locales)

Add new locales to the [`./rules/i18n.js`](https://github.com/ayvanov/bpmnlint-intl/blob/main/rules/i18n.js) file. 
## License

MIT
