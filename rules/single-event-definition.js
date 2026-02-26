import { is } from "bpmnlint-utils";

import { annotateRule, t } from "./helper.js";

/**
 * A rule that verifies that an event contains maximum one event definition.
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
export default function () {
  function check(node, reporter) {
    if (!is(node, "bpmn:Event")) {
      return;
    }

    const eventDefinitions = node.eventDefinitions || [];

    if (eventDefinitions.length > 1) {
      reporter.report(node.id, t("singleEventDefinition.multipleDefinitions"), [
        "eventDefinitions",
      ]);
    }
  }

  return annotateRule("single-event-definition", {
    check,
  });
}
