import { is } from "bpmnlint-utils";

import { annotateRule, t } from "./helper.js";

/**
 * A rule that checks that start events inside an event sub-process
 * are typed.
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
export default function () {
  function check(node, reporter) {
    if (!is(node, "bpmn:SubProcess") || !node.triggeredByEvent) {
      return;
    }

    const flowElements = node.flowElements || [];

    flowElements.forEach(function (flowElement) {
      if (!is(flowElement, "bpmn:StartEvent")) {
        return false;
      }

      const eventDefinitions = flowElement.eventDefinitions || [];

      if (eventDefinitions.length === 0) {
        reporter.report(
          flowElement.id,
          t("eventSubProcessTypedStartEvent.missingEventDefinition"),
          ["eventDefinitions"],
        );
      }
    });
  }

  return annotateRule("event-sub-process-typed-start-event", {
    check,
  });
}
