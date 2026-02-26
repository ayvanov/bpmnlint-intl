/**
 * Russian locale for bpmnlint rule messages.
 */
export default {
  // Element type labels (used in parameterized messages)
  "types.process": "Процесс",
  "types.subProcess": "Подпроцесс",

  // Link event direction labels
  "directions.catch": "принимающее",
  "directions.throw": "отправляющее",

  // ad-hoc-sub-process
  "adHocSubProcess.startEventNotAllowed":
    "<Начальное событие> недопустимо в <Нерегулярном подпроцессе>",
  "adHocSubProcess.endEventNotAllowed":
    "<Конечное событие> недопустимо в <Нерегулярном подпроцессе>",

  // conditional-event
  "conditionalEvent.missingCondition": "В условном событии отсутствует условие",

  // conditional-flows
  "conditionalFlows.missingCondition":
    "У потока управления отсутствует условие",

  // end-event-required
  "endEventRequired.missingEndEvent": "{type} не содержит конечного события",

  // event-based-gateway
  "eventBasedGateway.tooFewOutgoing":
    "<Шлюз на основе событий> должен иметь не менее 2 исходящих <потоков управления>",
  "eventBasedGateway.conditionalFlow":
    "<Поток управления>, исходящий из <шлюза на основе событий>, не должен иметь условия",

  // event-sub-process-typed-start-event
  "eventSubProcessTypedStartEvent.missingEventDefinition":
    "У начального события отсутствует определение события",

  // fake-join
  "fakeJoin.incomingFlowsDoNotJoin": "Входящие потоки не объединяются",

  // global
  "global.missingName": "У элемента отсутствует имя",
  "global.unused": "Элемент не используется",
  "global.nameNotUnique": "Имя элемента не уникально",

  // helper (checkDiscouragedNodeType)
  "helper.discouragedType":
    "Тип элемента <{type}> не рекомендован к использованию",

  // label-required
  "labelRequired.missingLabel": "У элемента отсутствует метка/имя",

  // link-event
  "linkEvent.missingLinkName": "У связывающего события отсутствует имя связи",
  "linkEvent.missingCounterpart":
    "Отсутствует {direction} событие связи с именем <{name}> в области",
  "linkEvent.duplicateCatch":
    "Дублирующееся принимающее событие связи с именем <{name}> в области",
  "linkEvent.missingCatch":
    "Отсутствует принимающее событие связи с именем <{name}> в области",

  // no-bpmndi
  "noBpmndi.missingBpmndi": "У элемента отсутствует описание BPMNDI",

  // no-disconnected
  "noDisconnected.notConnected": "Элемент не подключён",

  // no-duplicate-sequence-flows
  "noDuplicateSequenceFlows.duplicate": "Поток управления является дубликатом",
  "noDuplicateSequenceFlows.duplicateOutgoing":
    "Дублирующиеся исходящие потоки управления",
  "noDuplicateSequenceFlows.duplicateIncoming":
    "Дублирующиеся входящие потоки управления",

  // no-gateway-join-fork
  "noGatewayJoinFork.forksAndJoins":
    "Шлюз одновременно разветвляет и объединяет потоки",

  // no-implicit-end
  "noImplicitEnd.implicitEnd": "Элемент является неявным завершением",

  // no-implicit-split
  "noImplicitSplit.implicitSplit": "Поток неявно разветвляется",

  // no-implicit-start
  "noImplicitStart.implicitStart": "Элемент является неявным началом",

  // no-overlapping-elements
  "noOverlappingElements.overlaps": "Элемент перекрывается с другим элементом",
  "noOverlappingElements.outsideBoundary":
    "Элемент находится за пределами родительского контейнера",

  // single-blank-start-event
  "singleBlankStartEvent.multipleBlankStartEvents":
    "{type} содержит несколько пустых начальных событий",

  // single-event-definition
  "singleEventDefinition.multipleDefinitions":
    "Событие содержит несколько определений событий",

  // start-event-required
  "startEventRequired.missingStartEvent":
    "{type} не содержит начального события",

  // sub-process-blank-start-event
  "subProcessBlankStartEvent.mustBeBlank":
    "Начальное событие должно быть пустым",

  // superfluous-gateway
  "superfluousGateway.superfluous":
    "Шлюз избыточен: он имеет только один источник и одну цель.",

  // superfluous-termination
  "superfluousTermination.superfluous": "Завершение является избыточным.",
};
