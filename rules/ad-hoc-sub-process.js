import { is } from "bpmnlint-utils";

import { annotateRule, t } from "./helper.js";

/**
 * A rule that ensures that an Ad Hoc Sub Process is valid according to the BPMN spec:
 *
 * - No start or end events
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
export default function () {
  function check(node, reporter) {
    if (!is(node, "bpmn:AdHocSubProcess")) {
      return;
    }

    const flowElements = node.flowElements || [];

    flowElements.forEach(function (flowElement) {
      if (is(flowElement, "bpmn:StartEvent")) {
        reporter.report(
          flowElement.id,
          t("adHocSubProcess.startEventNotAllowed"),
        );
      }

      if (is(flowElement, "bpmn:EndEvent")) {
        reporter.report(
          flowElement.id,
          t("adHocSubProcess.endEventNotAllowed"),
        );
      }
    });
  }

  return annotateRule("ad-hoc-sub-process", {
    check,
  });
}
