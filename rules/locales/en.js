'use strict';

/**
 * English (default) locale for bpmnlint rule messages.
 */
module.exports = {

  // Element type labels (used in parameterized messages)
  'types.process': 'Process',
  'types.subProcess': 'Sub process',

  // Link event direction labels
  'directions.catch': 'catch',
  'directions.throw': 'throw',

  // ad-hoc-sub-process
  'adHocSubProcess.startEventNotAllowed': 'A <Start Event> is not allowed in <Ad Hoc Sub Process>',
  'adHocSubProcess.endEventNotAllowed': 'An <End Event> is not allowed in <Ad Hoc Sub Process>',

  // conditional-event
  'conditionalEvent.missingCondition': 'Conditional event is missing a condition',

  // conditional-flows
  'conditionalFlows.missingCondition': 'Sequence flow is missing condition',

  // end-event-required
  'endEventRequired.missingEndEvent': '{type} is missing end event',

  // event-based-gateway
  'eventBasedGateway.tooFewOutgoing': 'An <Event-based Gateway> must have at least 2 outgoing <Sequence Flows>',
  'eventBasedGateway.conditionalFlow': 'A <Sequence Flow> outgoing from an <Event-based Gateway> must not be conditional',

  // event-sub-process-typed-start-event
  'eventSubProcessTypedStartEvent.missingEventDefinition': 'Start event is missing event definition',

  // fake-join
  'fakeJoin.incomingFlowsDoNotJoin': 'Incoming flows do not join',

  // global
  'global.missingName': 'Element is missing name',
  'global.unused': 'Element is unused',
  'global.nameNotUnique': 'Element name is not unique',

  // helper (checkDiscouragedNodeType)
  'helper.discouragedType': 'Element type <{type}> is discouraged',

  // label-required
  'labelRequired.missingLabel': 'Element is missing label/name',

  // link-event
  'linkEvent.missingLinkName': 'Link event is missing link name',
  'linkEvent.missingCounterpart': 'Link {direction} event with link name <{name}> missing in scope',
  'linkEvent.duplicateCatch': 'Duplicate link catch event with link name <{name}> in scope',
  'linkEvent.missingCatch': 'Link catch event with link name <{name}> missing in scope',

  // no-bpmndi
  'noBpmndi.missingBpmndi': 'Element is missing bpmndi',

  // no-disconnected
  'noDisconnected.notConnected': 'Element is not connected',

  // no-duplicate-sequence-flows
  'noDuplicateSequenceFlows.duplicate': 'SequenceFlow is a duplicate',
  'noDuplicateSequenceFlows.duplicateOutgoing': 'Duplicate outgoing sequence flows',
  'noDuplicateSequenceFlows.duplicateIncoming': 'Duplicate incoming sequence flows',

  // no-gateway-join-fork
  'noGatewayJoinFork.forksAndJoins': 'Gateway forks and joins',

  // no-implicit-end
  'noImplicitEnd.implicitEnd': 'Element is an implicit end',

  // no-implicit-split
  'noImplicitSplit.implicitSplit': 'Flow splits implicitly',

  // no-implicit-start
  'noImplicitStart.implicitStart': 'Element is an implicit start',

  // no-overlapping-elements
  'noOverlappingElements.overlaps': 'Element overlaps with other element',
  'noOverlappingElements.outsideBoundary': 'Element is outside of parent boundary',

  // single-blank-start-event
  'singleBlankStartEvent.multipleBlankStartEvents': '{type} has multiple blank start events',

  // single-event-definition
  'singleEventDefinition.multipleDefinitions': 'Event has multiple event definitions',

  // start-event-required
  'startEventRequired.missingStartEvent': '{type} is missing start event',

  // sub-process-blank-start-event
  'subProcessBlankStartEvent.mustBeBlank': 'Start event must be blank',

  // superfluous-gateway
  'superfluousGateway.superfluous': 'Gateway is superfluous. It only has one source and target.',

  // superfluous-termination
  'superfluousTermination.superfluous': 'Termination is superfluous.'
};
