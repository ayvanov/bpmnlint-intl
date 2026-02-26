const { is, isAny } = require("bpmnlint-utils");

const { annotateRule, t } = require("./helper");

/**
 * A rule that checks the presence of an end event per scope.
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
module.exports = function () {
  function hasEndEvent(node) {
    const flowElements = node.flowElements || [];

    return flowElements.some((node) => is(node, "bpmn:EndEvent"));
  }

  function check(node, reporter) {
    if (
      !isAny(node, ["bpmn:Process", "bpmn:SubProcess"]) ||
      is(node, "bpmn:AdHocSubProcess")
    ) {
      return;
    }

    if (!hasEndEvent(node)) {
      const type = is(node, "bpmn:SubProcess")
        ? t("types.subProcess")
        : t("types.process");

      reporter.report(node.id, t("endEventRequired.missingEndEvent", { type }));
    }
  }

  return annotateRule("end-event-required", {
    check,
  });
};
