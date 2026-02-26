"use strict";

const { is } = require("bpmnlint-utils");

const { annotateRule, t } = require("./helper");

/**
 * A rule that checks, whether a gateway forks and joins
 * at the same time.
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
module.exports = function () {
  function check(node, reporter) {
    if (!is(node, "bpmn:Gateway")) {
      return;
    }

    const incoming = node.incoming || [];
    const outgoing = node.outgoing || [];

    if (incoming.length > 1 && outgoing.length > 1) {
      reporter.report(node.id, t("noGatewayJoinFork.forksAndJoins"));
    }
  }

  return annotateRule("no-gateway-join-fork", {
    check,
  });
};
