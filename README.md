# bpmnlint-intl

Validate your BPMN diagrams based on configurable lint rules.


## Installation

Install the utility via [npm](https://www.npmjs.com/package/bpmnlint):

```sh
npm install bpmnlint-intl
```


## Usage

TODO

## Rules

Our [documentation](https://github.com/bpmn-io/bpmnlint/tree/main/docs/rules#rules) lists all currenty implemented rules, the [`./rules` folder](https://github.com/bpmn-io/bpmnlint/tree/main/rules) contains each rules implementation.

Do you miss a rule that should be included? [Propose a new rule](https://github.com/bpmn-io/bpmnlint/issues/new?assignees=&labels=rules&template=NEW_RULE.md).


## Configuration

TODO


### Available Configurations

* [`bpmnlint:all`](./config/all.js) - all rules as errors
* [`bpmnlint:recommended`](./config/recommended.js) - opinionated rules ("best practices") and rules enforcing BPMN compliance
* [`bpmnlint:correctness`](./config/correctness.js) - rules enforcing BPMN compliance

## License

MIT
