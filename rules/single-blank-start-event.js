"use strict";

const { is } = require("bpmnlint-utils");

const { annotateRule, t } = require("./helper");

/**
 * A rule that checks whether not more than one blank start event
 * exists per scope.
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
module.exports = function () {
  function check(node, reporter) {
    if (!is(node, "bpmn:FlowElementsContainer")) {
      return;
    }

    const flowElements = node.flowElements || [];

    const blankStartEvents = flowElements.filter(function (flowElement) {
      if (!is(flowElement, "bpmn:StartEvent")) {
        return false;
      }

      const eventDefinitions = flowElement.eventDefinitions || [];

      return eventDefinitions.length === 0;
    });

    if (blankStartEvents.length > 1) {
      const type = is(node, "bpmn:SubProcess")
        ? t("types.subProcess")
        : t("types.process");

      reporter.report(
        node.id,
        t("singleBlankStartEvent.multipleBlankStartEvents", { type }),
      );
    }
  }

  return annotateRule("single-blank-start-event", {
    check,
  });
};
