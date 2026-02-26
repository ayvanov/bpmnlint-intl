import { is } from "bpmnlint-utils";

import { annotateRule, t } from "./helper.js";

/**
 * A rule that checks, whether a gateway has only one source and target.
 *
 * Those gateways are superfluous since they don't do anything.
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
export default function () {
  function check(node, reporter) {
    if (!is(node, "bpmn:Gateway")) {
      return;
    }

    const incoming = node.incoming || [];
    const outgoing = node.outgoing || [];

    if (incoming.length === 1 && outgoing.length === 1) {
      reporter.report(node.id, t("superfluousGateway.superfluous"));
    }
  }

  return annotateRule("superfluous-gateway", {
    check,
  });
}
