import { is, isAny } from "bpmnlint-utils";

import { annotateRule, t } from "./helper.js";

/**
 * A rule that checks for the presence of a start event per scope.
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
export default function () {
  function hasStartEvent(node) {
    const flowElements = node.flowElements || [];

    return flowElements.some((node) => is(node, "bpmn:StartEvent"));
  }

  function check(node, reporter) {
    if (
      !isAny(node, ["bpmn:Process", "bpmn:SubProcess"]) ||
      is(node, "bpmn:AdHocSubProcess")
    ) {
      return;
    }

    if (!hasStartEvent(node)) {
      const type = is(node, "bpmn:SubProcess")
        ? t("types.subProcess")
        : t("types.process");

      reporter.report(
        node.id,
        t("startEventRequired.missingStartEvent", { type }),
      );
    }
  }

  return annotateRule("start-event-required", {
    check,
  });
}
