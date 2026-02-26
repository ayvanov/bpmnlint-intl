const { is } = require("bpmnlint-utils");

const { annotateRule, t } = require("./helper");

/**
 * A rule that checks, whether an event-based gateway:
 * - has at least two outgoing sequence flows
 * - the outgoing sequence flows are not conditional
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
module.exports = function () {
  function check(node, reporter) {
    if (!is(node, "bpmn:EventBasedGateway")) {
      return;
    }

    const outgoing = node.outgoing || [];

    if (outgoing.length < 2) {
      reporter.report(node.id, t("eventBasedGateway.tooFewOutgoing"));
    }

    outgoing.forEach((flow) => {
      if (hasCondition(flow)) {
        reporter.report(flow.id, t("eventBasedGateway.conditionalFlow"));
      }
    });
  }

  return annotateRule("event-based-gateway", {
    check,
  });
};

function hasCondition(flow) {
  return !!flow.conditionExpression;
}
