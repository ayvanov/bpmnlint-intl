const {
  is
} = require('bpmnlint-utils');

const {
  annotateRule
} = require('./helper');


/**
 * A rule that ensures that an Ad Hoc Sub Process is valid according to the BPMN spec:
 *
 * - No start or end events
 *
 * @type { import('../lib/types.js').RuleFactory }
 */
module.exports = function() {

  function check(node, reporter) {

    if (!is(node, 'bpmn:AdHocSubProcess')) {
      return;
    }

    const flowElements = node.flowElements || [];

    flowElements.forEach(function(flowElement) {

      if (is(flowElement, 'bpmn:StartEvent')) {
        reporter.report(flowElement.id, 'Событие начала не допускается в подпроцессе ad hoc');
      }

      if (is(flowElement, 'bpmn:EndEvent')) {
        reporter.report(flowElement.id, 'Событие окончания не допускается в подпроцессе ad hoc');
      }
    });
  }

  return annotateRule('ad-hoc-sub-process', {
    check
  });

};
