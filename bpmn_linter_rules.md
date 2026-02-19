# BPMN Linter Rules Error Messages

This document lists all the error messages returned by the BPMN linter rules in the `/rules` folder.

## Rule Error Messages

- **ad-hoc-sub-process.js**: 
  - `'A <Start Event> is not allowed in <Ad Hoc Sub Process>'`
  - `'An <End Event> is not allowed in <Ad Hoc Sub Process>'`

- **conditional-event.js**: 
  - `'Conditional event is missing a condition'`

- **conditional-flows.js**: 
  - `'Sequence flow is missing condition'`

- **end-event-required.js**: 
  - `type + ' is missing end event'`

- **event-based-gateway.js**: 
  - `'An <Event-based Gateway> must have at least 2 outgoing <Sequence Flows>'`
  - `'A <Sequence Flow> outgoing from an <Event-based Gateway> must not be conditional'`

- **event-sub-process-typed-start-event.js**: 
  - `'Start event is missing event definition'`

- **fake-join.js**: 
  - `'Incoming flows do not join'`

- **global.js**: 
  - `'Element is missing name'`
  - `'Element is unused'`
  - `'Element name is not unique'`

- **helper.js**: 
  - `'Element type <' + type + '> is discouraged'`

- **label-required.js**: 
  - `'Element is missing label/name'`

- **link-event.js**: 
  - `'Link event is missing link name'`
  - `Link ${isThrowEvent(event) ? 'catch' : 'throw' } event with link name <${ name }> missing in scope`
  - `Duplicate link catch event with link name <${name}> in scope`
  - `Link catch event with link name <${ name }> missing in scope`

- **no-bpmndi.js**: 
  - `'Element is missing bpmndi'`

- **no-disconnected.js**: 
  - `'Element is not connected'`

- **no-duplicate-sequence-flows.js**: 
  - `'SequenceFlow is a duplicate'`
  - `'Duplicate outgoing sequence flows'`
  - `'Duplicate incoming sequence flows'`

- **no-gateway-join-fork.js**: 
  - `'Gateway forks and joins'`

- **no-implicit-end.js**: 
  - `'Element is an implicit end'`

- **no-implicit-split.js**: 
  - `'Flow splits implicitly'`

- **no-implicit-start.js**: 
  - `'Element is an implicit start'`

- **no-overlapping-elements.js**: 
  - `'Element overlaps with other element'`
  - `'Element is outside of parent boundary'`

- **single-blank-start-event.js**: 
  - `type + ' has multiple blank start events'`

- **single-event-definition.js**: 
  - `'Event has multiple event definitions'`

- **start-event-required.js**: 
  - `type + ' is missing start event'`

- **sub-process-blank-start-event.js**: 
  - `'Start event must be blank'`

- **superfluous-gateway.js**: 
  - `'Gateway is superfluous. It only has one source and target.'`

- **superfluous-termination.js**: 
  - `'Termination is superfluous.'`