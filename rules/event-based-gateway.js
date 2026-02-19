const {
  is
} = require('bpmnlint-utils');

const {
  annotateRule
} = require('./helper');


/**
 * A rule that checks, whether an event-based gateway:
 * - has at least two outgoing sequence flows
 * - the outgoing sequence flows are not conditional
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
module.exports = function() {

  function check(node, reporter) {

    if (!is(node, 'bpmn:EventBasedGateway')) {
      return;
    }

    const outgoing = node.outgoing || [];

    if (outgoing.length < 2) {
      reporter.report(node.id, 'Шлюз на основе событий должен иметь не менее 2 исходящих потоков последовательности');
    }

    outgoing.forEach((flow) => {
      if (hasCondition(flow)) {
        reporter.report(flow.id, 'Исходящий поток последовательности из шлюза на основе событий не должен быть условным');
      }
    });
  }

  return annotateRule('event-based-gateway', {
    check
  });
};

function hasCondition(flow) {
  return !!flow.conditionExpression;
}