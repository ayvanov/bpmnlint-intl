import { is, isAny } from "bpmnlint-utils";
import { flatten, groupBy, isArray, isFunction, isObject } from "min-dash";

//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) {
		__defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	}
	if (!no_symbols) {
		__defProp(target, Symbol.toStringTag, { value: "Module" });
	}
	return target;
};

//#endregion
//#region rules/locales/en.js
/**
* English (default) locale for bpmnlint rule messages.
*/
var en_default = {
	"types.process": "Process",
	"types.subProcess": "Sub process",
	"directions.catch": "catch",
	"directions.throw": "throw",
	"adHocSubProcess.startEventNotAllowed": "A <Start Event> is not allowed in <Ad Hoc Sub Process>",
	"adHocSubProcess.endEventNotAllowed": "An <End Event> is not allowed in <Ad Hoc Sub Process>",
	"conditionalEvent.missingCondition": "Conditional event is missing a condition",
	"conditionalFlows.missingCondition": "Sequence flow is missing condition",
	"endEventRequired.missingEndEvent": "{type} is missing end event",
	"eventBasedGateway.tooFewOutgoing": "An <Event-based Gateway> must have at least 2 outgoing <Sequence Flows>",
	"eventBasedGateway.conditionalFlow": "A <Sequence Flow> outgoing from an <Event-based Gateway> must not be conditional",
	"eventSubProcessTypedStartEvent.missingEventDefinition": "Start event is missing event definition",
	"fakeJoin.incomingFlowsDoNotJoin": "Incoming flows do not join",
	"global.missingName": "Element is missing name",
	"global.unused": "Element is unused",
	"global.nameNotUnique": "Element name is not unique",
	"helper.discouragedType": "Element type <{type}> is discouraged",
	"labelRequired.missingLabel": "Element is missing label/name",
	"linkEvent.missingLinkName": "Link event is missing link name",
	"linkEvent.missingCounterpart": "Link {direction} event with link name <{name}> missing in scope",
	"linkEvent.duplicateCatch": "Duplicate link catch event with link name <{name}> in scope",
	"linkEvent.missingCatch": "Link catch event with link name <{name}> missing in scope",
	"noBpmndi.missingBpmndi": "Element is missing bpmndi",
	"noDisconnected.notConnected": "Element is not connected",
	"noDuplicateSequenceFlows.duplicate": "SequenceFlow is a duplicate",
	"noDuplicateSequenceFlows.duplicateOutgoing": "Duplicate outgoing sequence flows",
	"noDuplicateSequenceFlows.duplicateIncoming": "Duplicate incoming sequence flows",
	"noGatewayJoinFork.forksAndJoins": "Gateway forks and joins",
	"noImplicitEnd.implicitEnd": "Element is an implicit end",
	"noImplicitSplit.implicitSplit": "Flow splits implicitly",
	"noImplicitStart.implicitStart": "Element is an implicit start",
	"noOverlappingElements.overlaps": "Element overlaps with other element",
	"noOverlappingElements.outsideBoundary": "Element is outside of parent boundary",
	"singleBlankStartEvent.multipleBlankStartEvents": "{type} has multiple blank start events",
	"singleEventDefinition.multipleDefinitions": "Event has multiple event definitions",
	"startEventRequired.missingStartEvent": "{type} is missing start event",
	"subProcessBlankStartEvent.mustBeBlank": "Start event must be blank",
	"superfluousGateway.superfluous": "Gateway is superfluous. It only has one source and target.",
	"superfluousTermination.superfluous": "Termination is superfluous."
};

//#endregion
//#region rules/locales/ru.js
/**
* Russian locale for bpmnlint rule messages.
*/
var ru_default = {
	"types.process": "Процесс",
	"types.subProcess": "Подпроцесс",
	"directions.catch": "принимающее",
	"directions.throw": "отправляющее",
	"adHocSubProcess.startEventNotAllowed": "<Начальное событие> недопустимо в <Нерегулярном подпроцессе>",
	"adHocSubProcess.endEventNotAllowed": "<Конечное событие> недопустимо в <Нерегулярном подпроцессе>",
	"conditionalEvent.missingCondition": "В условном событии отсутствует условие",
	"conditionalFlows.missingCondition": "У потока управления отсутствует условие",
	"endEventRequired.missingEndEvent": "{type} не содержит конечного события",
	"eventBasedGateway.tooFewOutgoing": "<Шлюз на основе событий> должен иметь не менее 2 исходящих <потоков управления>",
	"eventBasedGateway.conditionalFlow": "<Поток управления>, исходящий из <шлюза на основе событий>, не должен иметь условия",
	"eventSubProcessTypedStartEvent.missingEventDefinition": "У начального события отсутствует определение события",
	"fakeJoin.incomingFlowsDoNotJoin": "Входящие потоки не объединяются",
	"global.missingName": "У элемента отсутствует имя",
	"global.unused": "Элемент не используется",
	"global.nameNotUnique": "Имя элемента не уникально",
	"helper.discouragedType": "Тип элемента <{type}> не рекомендован к использованию",
	"labelRequired.missingLabel": "У элемента отсутствует метка/имя",
	"linkEvent.missingLinkName": "У связывающего события отсутствует имя связи",
	"linkEvent.missingCounterpart": "Отсутствует {direction} событие связи с именем <{name}> в области",
	"linkEvent.duplicateCatch": "Дублирующееся принимающее событие связи с именем <{name}> в области",
	"linkEvent.missingCatch": "Отсутствует принимающее событие связи с именем <{name}> в области",
	"noBpmndi.missingBpmndi": "У элемента отсутствует описание BPMNDI",
	"noDisconnected.notConnected": "Элемент не подключён",
	"noDuplicateSequenceFlows.duplicate": "Поток управления является дубликатом",
	"noDuplicateSequenceFlows.duplicateOutgoing": "Дублирующиеся исходящие потоки управления",
	"noDuplicateSequenceFlows.duplicateIncoming": "Дублирующиеся входящие потоки управления",
	"noGatewayJoinFork.forksAndJoins": "Шлюз одновременно разветвляет и объединяет потоки",
	"noImplicitEnd.implicitEnd": "Элемент является неявным завершением",
	"noImplicitSplit.implicitSplit": "Поток неявно разветвляется",
	"noImplicitStart.implicitStart": "Элемент является неявным началом",
	"noOverlappingElements.overlaps": "Элемент перекрывается с другим элементом",
	"noOverlappingElements.outsideBoundary": "Элемент находится за пределами родительского контейнера",
	"singleBlankStartEvent.multipleBlankStartEvents": "{type} содержит несколько пустых начальных событий",
	"singleEventDefinition.multipleDefinitions": "Событие содержит несколько определений событий",
	"startEventRequired.missingStartEvent": "{type} не содержит начального события",
	"subProcessBlankStartEvent.mustBeBlank": "Начальное событие должно быть пустым",
	"superfluousGateway.superfluous": "Шлюз избыточен: он имеет только один источник и одну цель.",
	"superfluousTermination.superfluous": "Завершение является избыточным."
};

//#endregion
//#region rules/i18n.js
var i18n_exports = /* @__PURE__ */ __exportAll({
	getLocale: () => getLocale,
	setLocale: () => setLocale,
	t: () => t
});
/**
* @type { Record<string, Record<string, string>> }
*/
const locales = {
	en: en_default,
	ru: ru_default
};
/**
* @type { string }
*/
let currentLocale = "en";
/**
* Set the active locale for rule messages.
*
* @param { string } locale - Locale code, e.g. 'en' or 'ru'
*
* @throws { Error } if the locale is not supported
*/
function setLocale(locale) {
	if (!locales[locale]) throw new Error(`Unsupported locale: "${locale}". Available locales: ${Object.keys(locales).join(", ")}`);
	currentLocale = locale;
}
/**
* Get the currently active locale code.
*
* @return { string }
*/
function getLocale() {
	return currentLocale;
}
/**
* Translate a message key into the current locale, with optional parameter interpolation.
*
* Parameters are interpolated using the `{paramName}` syntax:
*
*   t('foo.bar', { type: 'Process' })
*   // locale string: '{type} is missing end event'
*   // result:        'Process is missing end event'
*
* Falls back to English when a key is missing in the active locale.
* Returns the raw key when it is missing from all locales.
*
* @param { string } key
* @param { Record<string, string> } [params]
*
* @return { string }
*/
function t(key, params) {
	let message = (locales[currentLocale] || locales["en"])[key];
	if (message === void 0) message = locales["en"][key];
	if (message === void 0) return key;
	if (params) message = message.replace(/\{(\w+)\}/g, (match, name) => {
		return params[name] !== void 0 ? String(params[name]) : match;
	});
	return message;
}

//#endregion
//#region rules/helper.js
var helper_exports = /* @__PURE__ */ __exportAll({
	annotateRule: () => annotateRule,
	checkDiscouragedNodeType: () => checkDiscouragedNodeType,
	findParent: () => findParent,
	getLocale: () => getLocale,
	isInExecutableProcess: () => isInExecutableProcess,
	setLocale: () => setLocale,
	t: () => t
});
/**
* @typedef { import('../lib/types.js').ModdleElement } ModdleElement
*
* @typedef { import('../lib/types.js').RuleFactory } RuleFactory
* @typedef { import('../lib/types.js').RuleDefinition } RuleDefinition
*/
/**
* Create a checker that disallows the given element type.
*
* @param { string } type
*
* @return { RuleFactory } ruleFactory
*/
function checkDiscouragedNodeType(type, ruleName) {
	/**
	* @type { RuleFactory }
	*/
	return function() {
		function check(node, reporter) {
			if (is(node, type)) reporter.report(node.id, t("helper.discouragedType", { type }));
		}
		return annotateRule(ruleName, { check });
	};
}
/**
* Find a parent for the given element
*
* @param { ModdleElement } node
* @param { string } type
*
* @return { ModdleElement } element
*/
function findParent(node, type) {
	if (!node) return null;
	const parent = node.$parent;
	if (!parent) return node;
	if (is(parent, type)) return parent;
	return findParent(parent, type);
}
/**
* Check if the node is inside of an executable process.
*
* @param { ModdleElement } node
*
* @return { boolean }
*/
function isInExecutableProcess(node) {
	const process = findParent(node, "bpmn:Process");
	return process && process.isExecutable;
}
const documentationBaseUrl = "https://github.com/bpmn-io/bpmnlint/blob/main/docs/rules";
/**
* Annotate a rule with core information, such as the documentation url.
*
* @param {string} ruleName
* @param {RuleDefinition} options
*
* @return {RuleDefinition}
*/
function annotateRule(ruleName, options) {
	const { meta: { documentation = {}, ...restMeta } = {}, ...restOptions } = options;
	return {
		meta: {
			documentation: {
				url: `${documentationBaseUrl}/${ruleName}.md`,
				...documentation
			},
			...restMeta
		},
		...restOptions
	};
}

//#endregion
//#region rules/ad-hoc-sub-process.js
var ad_hoc_sub_process_exports = /* @__PURE__ */ __exportAll({ default: () => ad_hoc_sub_process_default });
/**
* A rule that ensures that an Ad Hoc Sub Process is valid according to the BPMN spec:
*
* - No start or end events
*
* @type { import('../lib/types.js').RuleFactory }
*/
function ad_hoc_sub_process_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:AdHocSubProcess")) return;
		(node.flowElements || []).forEach(function(flowElement) {
			if (is(flowElement, "bpmn:StartEvent")) reporter.report(flowElement.id, t("adHocSubProcess.startEventNotAllowed"));
			if (is(flowElement, "bpmn:EndEvent")) reporter.report(flowElement.id, t("adHocSubProcess.endEventNotAllowed"));
		});
	}
	return annotateRule("ad-hoc-sub-process", { check });
}

//#endregion
//#region rules/conditional-event.js
var conditional_event_exports = /* @__PURE__ */ __exportAll({ default: () => conditional_event_default });
/**
* Ensures that a conditional event has a condition specified.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function conditional_event_default() {
	function check(node, reporter) {
		if (!isInExecutableProcess(node)) return;
		const eventDefinition = getConditionalEventDefinition(node);
		if (!eventDefinition) return;
		if (!hasCondition$4(eventDefinition)) reporter.report(node.id, t("conditionalEvent.missingCondition"), ["condition"]);
	}
	return annotateRule("conditional-event", { check });
}
function getConditionalEventDefinition(node) {
	if (!is(node, "bpmn:Event")) return;
	return (node.eventDefinitions || []).find((def) => is(def, "bpmn:ConditionalEventDefinition"));
}
function hasCondition$4(eventDefinition) {
	return !!eventDefinition.condition?.body;
}

//#endregion
//#region rules/conditional-flows.js
var conditional_flows_exports = /* @__PURE__ */ __exportAll({ default: () => conditional_flows_default });
/**
* A rule that checks that sequence flows outgoing from a
* conditional forking gateway or activity are
* either default flows _or_ have a condition attached
*
* @type { import('../lib/types.js').RuleFactory }
*/
function conditional_flows_default() {
	function check(node, reporter) {
		if (!isConditionalForking(node)) return;
		(node.outgoing || []).forEach((flow) => {
			if (!hasCondition$3(flow) && !isDefaultFlow$1(node, flow)) reporter.report(flow.id, t("conditionalFlows.missingCondition"), ["conditionExpression"]);
		});
	}
	return annotateRule("conditional-flows", { check });
}
function isConditionalForking(node) {
	const defaultFlow = node["default"];
	const outgoing = node.outgoing || [];
	return defaultFlow || outgoing.find(hasCondition$3);
}
function hasCondition$3(flow) {
	return !!flow.conditionExpression;
}
function isDefaultFlow$1(node, flow) {
	return node["default"] === flow;
}

//#endregion
//#region rules/end-event-required.js
var end_event_required_exports = /* @__PURE__ */ __exportAll({ default: () => end_event_required_default });
/**
* A rule that checks the presence of an end event per scope.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function end_event_required_default() {
	function hasEndEvent(node) {
		return (node.flowElements || []).some((node) => is(node, "bpmn:EndEvent"));
	}
	function check(node, reporter) {
		if (!isAny(node, ["bpmn:Process", "bpmn:SubProcess"]) || is(node, "bpmn:AdHocSubProcess")) return;
		if (!hasEndEvent(node)) {
			const type = is(node, "bpmn:SubProcess") ? t("types.subProcess") : t("types.process");
			reporter.report(node.id, t("endEventRequired.missingEndEvent", { type }));
		}
	}
	return annotateRule("end-event-required", { check });
}

//#endregion
//#region rules/event-based-gateway.js
var event_based_gateway_exports = /* @__PURE__ */ __exportAll({ default: () => event_based_gateway_default });
/**
* A rule that checks, whether an event-based gateway:
* - has at least two outgoing sequence flows
* - the outgoing sequence flows are not conditional
*
* @type { import('../lib/types.js').RuleFactory }
*/
function event_based_gateway_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:EventBasedGateway")) return;
		const outgoing = node.outgoing || [];
		if (outgoing.length < 2) reporter.report(node.id, t("eventBasedGateway.tooFewOutgoing"));
		outgoing.forEach((flow) => {
			if (hasCondition$2(flow)) reporter.report(flow.id, t("eventBasedGateway.conditionalFlow"));
		});
	}
	return annotateRule("event-based-gateway", { check });
}
function hasCondition$2(flow) {
	return !!flow.conditionExpression;
}

//#endregion
//#region rules/event-sub-process-typed-start-event.js
var event_sub_process_typed_start_event_exports = /* @__PURE__ */ __exportAll({ default: () => event_sub_process_typed_start_event_default });
/**
* A rule that checks that start events inside an event sub-process
* are typed.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function event_sub_process_typed_start_event_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:SubProcess") || !node.triggeredByEvent) return;
		(node.flowElements || []).forEach(function(flowElement) {
			if (!is(flowElement, "bpmn:StartEvent")) return false;
			if ((flowElement.eventDefinitions || []).length === 0) reporter.report(flowElement.id, t("eventSubProcessTypedStartEvent.missingEventDefinition"), ["eventDefinitions"]);
		});
	}
	return annotateRule("event-sub-process-typed-start-event", { check });
}

//#endregion
//#region rules/fake-join.js
var fake_join_exports = /* @__PURE__ */ __exportAll({ default: () => fake_join_default });
/**
* A rule that checks that no fake join is modeled by attempting
* to give a task or event join semantics.
*
* Users should model a parallel joining gateway
* to achieve the desired behavior.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function fake_join_default() {
	function check(node, reporter) {
		if (!isAny(node, ["bpmn:Activity", "bpmn:Event"])) return;
		if ((node.incoming || []).length > 1) reporter.report(node.id, t("fakeJoin.incomingFlowsDoNotJoin"));
	}
	return annotateRule("fake-join", { check });
}

//#endregion
//#region rules/global.js
var global_exports = /* @__PURE__ */ __exportAll({ default: () => global_default });
/**
* A rule that verifies that global elements are properly used.
*
* Currently recognized global elements are:
*
*   * `bpmn:Error`
*   * `bpmn:Escalation`
*   * `bpmn:Message`
*   * `bpmn:Signal`
*
* For each of these elements proper usage implies:
*
*   * element must have a name
*   * element is referenced by at least one element
*   * there exists only a single element per type with a given name
*
* @type { import('../lib/types.js').RuleFactory }
*/
function global_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:Definitions")) return false;
		const rootElements = getRootElements(node);
		const referencingElements = getReferencingElements(node);
		rootElements.forEach((rootElement) => {
			if (!hasName(rootElement)) reporter.report(rootElement.id, t("global.missingName"));
			if (!isReferenced(rootElement, referencingElements)) reporter.report(rootElement.id, t("global.unused"));
			if (!isUnique(rootElement, rootElements)) reporter.report(rootElement.id, t("global.nameNotUnique"));
		});
	}
	return annotateRule("global", { check });
	function getRootElements(definitions) {
		return definitions.rootElements.filter((node) => isAny(node, [
			"bpmn:Error",
			"bpmn:Escalation",
			"bpmn:Message",
			"bpmn:Signal"
		]));
	}
	function getReferencingElements(definitions) {
		const referencingElements = [];
		function traverse(element) {
			if (is(element, "bpmn:Definitions") && element.get("rootElements").length) element.get("rootElements").forEach(traverse);
			if (is(element, "bpmn:FlowElementsContainer") && element.get("flowElements").length) element.get("flowElements").forEach(traverse);
			if (is(element, "bpmn:Event") && element.get("eventDefinitions").length) element.get("eventDefinitions").forEach((eventDefinition) => referencingElements.push(eventDefinition));
			if (is(element, "bpmn:Collaboration") && element.get("messageFlows").length) element.get("messageFlows").forEach(traverse);
			if (isAny(element, [
				"bpmn:MessageFlow",
				"bpmn:ReceiveTask",
				"bpmn:SendTask"
			])) referencingElements.push(element);
		}
		traverse(definitions);
		return referencingElements;
	}
	function hasName(event) {
		return event.name?.trim() !== "";
	}
	function isReferenced(rootElement, referencingElements) {
		if (is(rootElement, "bpmn:Error")) return referencingElements.some((referencingElement) => {
			return is(referencingElement, "bpmn:ErrorEventDefinition") && rootElement.get("id") === referencingElement.get("errorRef")?.get("id");
		});
		if (is(rootElement, "bpmn:Escalation")) return referencingElements.some((referencingElement) => {
			return is(referencingElement, "bpmn:EscalationEventDefinition") && rootElement.get("id") === referencingElement.get("escalationRef")?.get("id");
		});
		if (is(rootElement, "bpmn:Message")) return referencingElements.some((referencingElement) => {
			return isAny(referencingElement, [
				"bpmn:MessageEventDefinition",
				"bpmn:MessageFlow",
				"bpmn:ReceiveTask",
				"bpmn:SendTask"
			]) && rootElement.get("id") === referencingElement.get("messageRef")?.get("id");
		});
		if (is(rootElement, "bpmn:Signal")) return referencingElements.some((referencingElement) => {
			return is(referencingElement, "bpmn:SignalEventDefinition") && rootElement.get("id") === referencingElement.get("signalRef")?.get("id");
		});
	}
	function isUnique(rootElement, rootElements) {
		return rootElements.filter((otherRootElement) => is(otherRootElement, rootElement.$type) && rootElement.name === otherRootElement.name).length === 1;
	}
}

//#endregion
//#region rules/label-required.js
var label_required_exports = /* @__PURE__ */ __exportAll({ default: () => label_required_default });
/**
* A rule that checks the presence of a label.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function label_required_default() {
	function check(node, reporter) {
		if (isAny(node, ["bpmn:ParallelGateway", "bpmn:EventBasedGateway"])) return;
		if (is(node, "bpmn:Gateway") && !isForking(node)) return;
		if (is(node, "bpmn:SubProcess")) return;
		if (is(node, "bpmn:SequenceFlow") && !hasCondition$1(node)) return;
		if (isAny(node, [
			"bpmn:FlowNode",
			"bpmn:SequenceFlow",
			"bpmn:Participant",
			"bpmn:Lane"
		])) {
			if ((node.name || "").trim().length === 0) reporter.report(node.id, t("labelRequired.missingLabel"), ["name"]);
		}
	}
	return annotateRule("label-required", { check });
}
function isForking(node) {
	return (node.outgoing || []).length > 1;
}
function hasCondition$1(node) {
	return node.conditionExpression;
}

//#endregion
//#region rules/link-event.js
var link_event_exports = /* @__PURE__ */ __exportAll({ default: () => link_event_default });
/**
* A rule that verifies that link events are properly used.
*
* This implies:
*
*   * for every link throw there exists a link catch within
*     the same scope, and vice versa
*   * there exists only a single pair of [ throw, catch ] links
*     with a given name, per scope
*   * link events have a name
*
* @type { import('../lib/types.js').RuleFactory }
*/
function link_event_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:FlowElementsContainer")) return;
		const links = (node.flowElements || []).filter(isLinkEvent);
		for (const link of links) if (!getLinkName(link)) reporter.report(link.id, t("linkEvent.missingLinkName"));
		const names = groupBy(links, (link) => getLinkName(link));
		for (const [name, events] of Object.entries(names)) {
			if (!name) continue;
			if (events.length === 1) {
				const event = events[0];
				const direction = isThrowEvent(event) ? t("directions.catch") : t("directions.throw");
				reporter.report(event.id, t("linkEvent.missingCounterpart", {
					direction,
					name
				}));
				continue;
			}
			const catchEvents = events.filter(isCatchEvent);
			if (catchEvents.length > 1) for (const event of catchEvents) reporter.report(event.id, t("linkEvent.duplicateCatch", { name }));
			else if (catchEvents.length === 0) for (const event of events) reporter.report(event.id, t("linkEvent.missingCatch", { name }));
		}
	}
	return annotateRule("link-event", { check });
}
function isLinkEvent(node) {
	const eventDefinitions = node.eventDefinitions || [];
	if (!is(node, "bpmn:Event")) return false;
	return eventDefinitions.some((definition) => is(definition, "bpmn:LinkEventDefinition"));
}
function getLinkName(linkEvent) {
	return linkEvent.get("eventDefinitions").find((def) => is(def, "bpmn:LinkEventDefinition")).name;
}
function isThrowEvent(node) {
	return is(node, "bpmn:ThrowEvent");
}
function isCatchEvent(node) {
	return is(node, "bpmn:CatchEvent");
}

//#endregion
//#region rules/no-bpmndi.js
var no_bpmndi_exports = /* @__PURE__ */ __exportAll({ default: () => no_bpmndi_default });
/**
* @typedef { import('../lib/types.js').ModdleElement } ModdleElement
*/
/**
* A rule that checks that there is no BPMNDI information missing for elements,
* which require BPMNDI.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_bpmndi_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:Definitions")) return false;
		const visualBpmnElements = getAllBpmnElements(node.rootElements).filter(hasVisualRepresentation);
		const diBpmnReferences = getAllDiBpmnReferences(node);
		visualBpmnElements.forEach((element) => {
			if (diBpmnReferences.indexOf(element.id) === -1) reporter.report(element.id, t("noBpmndi.missingBpmndi"));
		});
	}
	return annotateRule("no-bpmndi", { check });
}
/**
* Get all BPMN elements within a bpmn:Definitions node
*
* @param { ModdleElement[] } rootElements - An array of Moddle rootElements
*
* @return { { id: string, $type: string }[] } A flat array with all BPMN elements, each represented with { id: elementId, $type: elementType }
*/
function getAllBpmnElements(rootElements) {
	return flatten(rootElements.map((rootElement) => {
		const laneSet = rootElement.laneSets && rootElement.laneSets[0] || rootElement.childLaneSet;
		const elements = flatten([
			rootElement.flowElements || [],
			rootElement.flowElements && getAllBpmnElements(rootElement.flowElements.filter(hasFlowElements)) || [],
			rootElement.participants || [],
			rootElement.artifacts || [],
			laneSet && laneSet.lanes || [],
			laneSet && laneSet.lanes && getAllBpmnElements(laneSet.lanes.filter(hasChildLaneSet)) || [],
			rootElement.messageFlows || []
		]);
		if (elements.length > 0) return elements.map((element) => {
			return {
				id: element.id,
				$type: element.$type
			};
		});
		else return [];
	}));
}
/**
* Get all BPMN elements within a bpmn:Definitions node
*
* @param {ModdleElement} definitionsNode - A moddleElement representing the
*   bpmn:Definitions element
*
* @return {string[]} ids of all BPMNDI element part of
*   this bpmn:Definitions node
*/
function getAllDiBpmnReferences(definitionsNode) {
	return flatten(definitionsNode.get("diagrams").map((diagram) => {
		return (diagram.plane.planeElement || []).map((element) => {
			return element.bpmnElement?.id;
		});
	}));
}
/**
* @param { ModdleElement } element
*
* @return {boolean}
*/
function hasVisualRepresentation(element) {
	return ["bpmn:DataObject"].includes(element.$type) ? false : true;
}
/**
* @param { ModdleElement } element
*
* @return {boolean}
*/
function hasFlowElements(element) {
	return element.flowElements ? true : false;
}
/**
* @param { ModdleElement } element
*
* @return {boolean}
*/
function hasChildLaneSet(element) {
	return element.childLaneSet ? true : false;
}

//#endregion
//#region rules/no-complex-gateway.js
var no_complex_gateway_exports = /* @__PURE__ */ __exportAll({ default: () => no_complex_gateway_default });
var no_complex_gateway_default = checkDiscouragedNodeType("bpmn:ComplexGateway", "no-complex-gateway");

//#endregion
//#region rules/no-disconnected.js
var no_disconnected_exports = /* @__PURE__ */ __exportAll({ default: () => no_disconnected_default });
/**
* A rule that verifies that there exists no disconnected
* flow elements, i.e. elements without incoming or outgoing sequence flows.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_disconnected_default() {
	function check(node, reporter) {
		if (!isAny(node, [
			"bpmn:Task",
			"bpmn:Gateway",
			"bpmn:SubProcess",
			"bpmn:Event"
		]) || node.triggeredByEvent) return;
		if (isCompensationLinked(node)) return;
		if (is(node.$parent, "bpmn:AdHocSubProcess")) return;
		const incoming = node.incoming || [];
		const outgoing = node.outgoing || [];
		if (!incoming.length && !outgoing.length) reporter.report(node.id, t("noDisconnected.notConnected"));
	}
	return annotateRule("no-disconnected", { check });
}
function isCompensationBoundary(node) {
	var eventDefinitions = node.eventDefinitions;
	if (!is(node, "bpmn:BoundaryEvent")) return false;
	if (!eventDefinitions || eventDefinitions.length !== 1) return false;
	return is(eventDefinitions[0], "bpmn:CompensateEventDefinition");
}
function isCompensationActivity(node) {
	return node.isForCompensation;
}
function isCompensationLinked(node) {
	var source = isCompensationBoundary(node);
	var target = isCompensationActivity(node);
	return source || target;
}

//#endregion
//#region rules/no-duplicate-sequence-flows.js
var no_duplicate_sequence_flows_exports = /* @__PURE__ */ __exportAll({ default: () => no_duplicate_sequence_flows_default });
/**
* A rule that verifies that there are no disconnected
* flow elements, i.e. elements without incoming or outgoing sequence flows.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_duplicate_sequence_flows_default() {
	const keyed = {};
	const outgoingReported = {};
	const incomingReported = {};
	function check(node, reporter) {
		if (!is(node, "bpmn:SequenceFlow")) return;
		const key = flowKey(node);
		if (key in keyed) {
			reporter.report(node.id, t("noDuplicateSequenceFlows.duplicate"));
			const sourceId = node.sourceRef.id;
			const targetId = node.targetRef.id;
			if (!outgoingReported[sourceId]) {
				reporter.report(sourceId, t("noDuplicateSequenceFlows.duplicateOutgoing"));
				outgoingReported[sourceId] = true;
			}
			if (!incomingReported[targetId]) {
				reporter.report(targetId, t("noDuplicateSequenceFlows.duplicateIncoming"));
				incomingReported[targetId] = true;
			}
		} else keyed[key] = node;
	}
	return annotateRule("no-duplicate-sequence-flows", { check });
}
function flowKey(flow) {
	const conditionExpression = flow.conditionExpression;
	const condition = conditionExpression ? conditionExpression.body : "";
	const source = flow.sourceRef ? flow.sourceRef.id : flow.id;
	const target = flow.targetRef ? flow.targetRef.id : flow.id;
	return source + "#" + target + "#" + condition;
}

//#endregion
//#region rules/no-gateway-join-fork.js
var no_gateway_join_fork_exports = /* @__PURE__ */ __exportAll({ default: () => no_gateway_join_fork_default });
/**
* A rule that checks, whether a gateway forks and joins
* at the same time.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_gateway_join_fork_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:Gateway")) return;
		const incoming = node.incoming || [];
		const outgoing = node.outgoing || [];
		if (incoming.length > 1 && outgoing.length > 1) reporter.report(node.id, t("noGatewayJoinFork.forksAndJoins"));
	}
	return annotateRule("no-gateway-join-fork", { check });
}

//#endregion
//#region rules/no-implicit-end.js
var no_implicit_end_exports = /* @__PURE__ */ __exportAll({ default: () => no_implicit_end_default });
/**
* A rule that checks that an element is not an implicit end (token sink).
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_implicit_end_default() {
	function isLinkEvent(node) {
		const eventDefinitions = node.eventDefinitions || [];
		return eventDefinitions.length && eventDefinitions.every((definition) => is(definition, "bpmn:LinkEventDefinition"));
	}
	function isCompensationEvent(node) {
		const eventDefinitions = node.eventDefinitions || [];
		return eventDefinitions.length && eventDefinitions.every((definition) => is(definition, "bpmn:CompensateEventDefinition"));
	}
	function hasCompensationActivity(node) {
		return (findParent(node, "bpmn:Process").artifacts || []).some((element) => {
			if (!is(element, "bpmn:Association")) return false;
			return element.sourceRef.id === node.id;
		});
	}
	function isForCompensation(node) {
		return node.isForCompensation;
	}
	function isImplicitEnd(node) {
		const outgoing = node.outgoing || [];
		if (is(node, "bpmn:SubProcess") && node.triggeredByEvent) return false;
		if (is(node, "bpmn:IntermediateThrowEvent") && isLinkEvent(node)) return false;
		if (is(node.$parent, "bpmn:AdHocSubProcess")) return false;
		if (is(node, "bpmn:EndEvent")) return false;
		if (is(node, "bpmn:BoundaryEvent") && isCompensationEvent(node) && hasCompensationActivity(node)) return false;
		if (is(node, "bpmn:Activity") && isForCompensation(node)) return false;
		return outgoing.length === 0;
	}
	function check(node, reporter) {
		if (!isAny(node, [
			"bpmn:Event",
			"bpmn:Activity",
			"bpmn:Gateway"
		])) return;
		if (isImplicitEnd(node)) reporter.report(node.id, t("noImplicitEnd.implicitEnd"));
	}
	return annotateRule("no-implicit-end", { check });
}

//#endregion
//#region rules/no-implicit-split.js
var no_implicit_split_exports = /* @__PURE__ */ __exportAll({ default: () => no_implicit_split_default });
/**
* A rule that checks that no implicit split is modeled
* starting from a task.
*
* Users should model the parallel splitting gateway
* explicitly instead.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_implicit_split_default() {
	function check(node, reporter) {
		if (!isAny(node, ["bpmn:Activity", "bpmn:Event"])) return;
		if ((node.outgoing || []).filter((flow) => {
			return !hasCondition(flow) && !isDefaultFlow(node, flow);
		}).length > 1) reporter.report(node.id, t("noImplicitSplit.implicitSplit"));
	}
	return annotateRule("no-implicit-split", { check });
}
function hasCondition(flow) {
	return !!flow.conditionExpression;
}
function isDefaultFlow(node, flow) {
	return node["default"] === flow;
}

//#endregion
//#region rules/no-implicit-start.js
var no_implicit_start_exports = /* @__PURE__ */ __exportAll({ default: () => no_implicit_start_default });
/**
* A rule that checks that an element is not an implicit start (token spawn).
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_implicit_start_default() {
	function isLinkEvent(node) {
		const eventDefinitions = node.eventDefinitions || [];
		return eventDefinitions.length && eventDefinitions.every((definition) => is(definition, "bpmn:LinkEventDefinition"));
	}
	function isForCompensation(node) {
		return node.isForCompensation;
	}
	function isImplicitStart(node) {
		const incoming = node.incoming || [];
		if (is(node, "bpmn:Activity") && isForCompensation(node)) return false;
		if (is(node.$parent, "bpmn:AdHocSubProcess")) return false;
		if (is(node, "bpmn:SubProcess") && node.triggeredByEvent) return false;
		if (is(node, "bpmn:IntermediateCatchEvent") && isLinkEvent(node)) return false;
		if (isAny(node, ["bpmn:StartEvent", "bpmn:BoundaryEvent"])) return false;
		return incoming.length === 0;
	}
	function check(node, reporter) {
		if (!isAny(node, [
			"bpmn:Event",
			"bpmn:Activity",
			"bpmn:Gateway"
		])) return;
		if (isImplicitStart(node)) reporter.report(node.id, t("noImplicitStart.implicitStart"));
	}
	return annotateRule("no-implicit-start", { check });
}

//#endregion
//#region rules/no-inclusive-gateway.js
var no_inclusive_gateway_exports = /* @__PURE__ */ __exportAll({ default: () => no_inclusive_gateway_default });
var no_inclusive_gateway_default = checkDiscouragedNodeType("bpmn:InclusiveGateway", "no-inclusive-gateway");

//#endregion
//#region rules/no-overlapping-elements.js
var no_overlapping_elements_exports = /* @__PURE__ */ __exportAll({ default: () => no_overlapping_elements_default });
/**
* Rule that checks if two elements overlap except:
*
* - Boundary events overlap their host
* - Child elements overlap / are on top of their parent (e.g., elements within a subProcess)
*
* @type { import('../lib/types.js').RuleFactory }
*/
function no_overlapping_elements_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:Definitions")) return;
		const rootElements = node.rootElements || [];
		const elementsToReport = /* @__PURE__ */ new Set();
		const elementsOutsideToReport = /* @__PURE__ */ new Set();
		const diObjects = getAllDiObjects(node);
		const processElementsParentDiMap = /* @__PURE__ */ new Map();
		rootElements.filter((element) => is(element, "bpmn:Collaboration")).forEach((collaboration) => {
			const participants = collaboration.participants || [];
			checkElementsArray(participants, elementsToReport, diObjects);
			participants.forEach((participant) => {
				processElementsParentDiMap.set(participant.processRef, diObjects.get(participant));
			});
		});
		rootElements.filter((element) => is(element, "bpmn:Process")).forEach((process) => {
			checkProcess(process, elementsToReport, elementsOutsideToReport, diObjects, processElementsParentDiMap.get(process) || {});
		});
		elementsToReport.forEach((element) => reporter.report(element.id, t("noOverlappingElements.overlaps")));
		elementsOutsideToReport.forEach((element) => reporter.report(element.id, t("noOverlappingElements.outsideBoundary")));
	}
	return annotateRule("no-overlapping-elements", { check });
}
/**
* Recursively check subprocesses in a process
* @param {Object} node Process or SubProcess
* @param {Set} elementsToReport
* @param {Set} elementsOutsideToReport
* @param {Map} diObjects
*/
function checkProcess(node, elementsToReport, elementsOutsideToReport, diObjects, parentDi) {
	const flowElements = node.flowElements || [];
	const flowElementsWithDi = flowElements.filter((element) => diObjects.has(element));
	checkElementsArray(flowElementsWithDi, elementsToReport, diObjects);
	flowElementsWithDi.forEach((element) => {
		if (!is(element, "bpmn:DataStoreReference") && isOutsideParentBoundary(diObjects.get(element).bounds, parentDi.bounds)) elementsOutsideToReport.add(element);
	});
	flowElements.filter((element) => is(element, "bpmn:SubProcess")).forEach((subProcess) => {
		const subProcessDi = diObjects.get(subProcess) || {};
		checkProcess(subProcess, elementsToReport, elementsOutsideToReport, diObjects, subProcessDi.isExpanded ? subProcessDi : {});
	});
}
/**
* @param {Array} elements
* @param {Set} elementsToReport
*/
function checkElementsArray(elements, elementsToReport, diObjects) {
	for (let i = 0; i < elements.length - 1; i++) {
		const element = elements[i];
		for (let j = i + 1; j < elements.length; j++) {
			const element2 = elements[j];
			if (element.attachedToRef === element2 || element2.attachedToRef === element) continue;
			const bounds1 = diObjects.get(element)?.bounds;
			const bounds2 = diObjects.get(element2)?.bounds;
			if (!bounds1 || !bounds2) continue;
			if (isCollision(bounds1, bounds2)) {
				elementsToReport.add(element);
				elementsToReport.add(element2);
			}
		}
	}
}
/**
* Check if child element is outside of parent boundary
*/
function isOutsideParentBoundary(childBounds, parentBounds) {
	if (!isValidShapeElement(childBounds) || !isValidShapeElement(parentBounds)) return false;
	const isTopLeftCornerInside = childBounds.x >= parentBounds.x && childBounds.y >= parentBounds.y;
	const isBottomRightCornerInside = childBounds.x + childBounds.width <= parentBounds.x + parentBounds.width && childBounds.y + childBounds.height <= parentBounds.y + parentBounds.height;
	return !(isTopLeftCornerInside && isBottomRightCornerInside);
}
/**
* Check if two rectangle shapes collides
*/
function isCollision(firstBounds, secondBounds) {
	if (!isValidShapeElement(firstBounds) || !isValidShapeElement(secondBounds)) return false;
	const collisionX = firstBounds.x + firstBounds.width >= secondBounds.x && secondBounds.x + secondBounds.width >= firstBounds.x;
	const collisionY = firstBounds.y + firstBounds.height >= secondBounds.y && secondBounds.y + secondBounds.height >= firstBounds.y;
	return collisionX && collisionY;
}
/**
* Checks if shape bounds has all necessary values for collision check
*/
function isValidShapeElement(bounds) {
	return !!bounds && is(bounds, "dc:Bounds") && typeof bounds.x === "number" && typeof bounds.y === "number" && typeof bounds.width === "number" && typeof bounds.height === "number";
}
/**
* Get all di object as one map object
* @param {Object} node bpmn:Definitions
* @returns {Map<Object, Object>} map of di objects with element as key
*/
function getAllDiObjects(node) {
	const diObjects = /* @__PURE__ */ new Map();
	(node.diagrams || []).filter((diagram) => !!diagram.plane).forEach((diagram) => {
		(diagram.plane.planeElement || []).filter((planeElement) => !!planeElement.bpmnElement).forEach((planeElement) => {
			diObjects.set(planeElement.bpmnElement, planeElement);
		});
	});
	return diObjects;
}

//#endregion
//#region rules/single-blank-start-event.js
var single_blank_start_event_exports = /* @__PURE__ */ __exportAll({ default: () => single_blank_start_event_default });
/**
* A rule that checks whether not more than one blank start event
* exists per scope.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function single_blank_start_event_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:FlowElementsContainer")) return;
		if ((node.flowElements || []).filter(function(flowElement) {
			if (!is(flowElement, "bpmn:StartEvent")) return false;
			return (flowElement.eventDefinitions || []).length === 0;
		}).length > 1) {
			const type = is(node, "bpmn:SubProcess") ? t("types.subProcess") : t("types.process");
			reporter.report(node.id, t("singleBlankStartEvent.multipleBlankStartEvents", { type }));
		}
	}
	return annotateRule("single-blank-start-event", { check });
}

//#endregion
//#region rules/single-event-definition.js
var single_event_definition_exports = /* @__PURE__ */ __exportAll({ default: () => single_event_definition_default });
/**
* A rule that verifies that an event contains maximum one event definition.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function single_event_definition_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:Event")) return;
		if ((node.eventDefinitions || []).length > 1) reporter.report(node.id, t("singleEventDefinition.multipleDefinitions"), ["eventDefinitions"]);
	}
	return annotateRule("single-event-definition", { check });
}

//#endregion
//#region rules/start-event-required.js
var start_event_required_exports = /* @__PURE__ */ __exportAll({ default: () => start_event_required_default });
/**
* A rule that checks for the presence of a start event per scope.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function start_event_required_default() {
	function hasStartEvent(node) {
		return (node.flowElements || []).some((node) => is(node, "bpmn:StartEvent"));
	}
	function check(node, reporter) {
		if (!isAny(node, ["bpmn:Process", "bpmn:SubProcess"]) || is(node, "bpmn:AdHocSubProcess")) return;
		if (!hasStartEvent(node)) {
			const type = is(node, "bpmn:SubProcess") ? t("types.subProcess") : t("types.process");
			reporter.report(node.id, t("startEventRequired.missingStartEvent", { type }));
		}
	}
	return annotateRule("start-event-required", { check });
}

//#endregion
//#region rules/sub-process-blank-start-event.js
var sub_process_blank_start_event_exports = /* @__PURE__ */ __exportAll({ default: () => sub_process_blank_start_event_default });
/**
* A rule that checks that start events inside a normal sub-processes
* are blank (do not have an event definition).
*
* @type { import('../lib/types.js').RuleFactory }
*/
function sub_process_blank_start_event_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:SubProcess") || node.triggeredByEvent) return;
		(node.flowElements || []).forEach(function(flowElement) {
			if (!is(flowElement, "bpmn:StartEvent")) return false;
			if ((flowElement.eventDefinitions || []).length > 0) reporter.report(flowElement.id, t("subProcessBlankStartEvent.mustBeBlank"), ["eventDefinitions"]);
		});
	}
	return annotateRule("sub-process-blank-start-event", { check });
}

//#endregion
//#region rules/superfluous-gateway.js
var superfluous_gateway_exports = /* @__PURE__ */ __exportAll({ default: () => superfluous_gateway_default });
/**
* A rule that checks, whether a gateway has only one source and target.
*
* Those gateways are superfluous since they don't do anything.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function superfluous_gateway_default() {
	function check(node, reporter) {
		if (!is(node, "bpmn:Gateway")) return;
		const incoming = node.incoming || [];
		const outgoing = node.outgoing || [];
		if (incoming.length === 1 && outgoing.length === 1) reporter.report(node.id, t("superfluousGateway.superfluous"));
	}
	return annotateRule("superfluous-gateway", { check });
}

//#endregion
//#region rules/superfluous-termination.js
var superfluous_termination_exports = /* @__PURE__ */ __exportAll({ default: () => superfluous_termination_default });
/**
* A rule that checks, whether a termination end event is superfluous,
* i.e. when it is the only possible end of a process or sub-process.
*
* @type { import('../lib/types.js').RuleFactory }
*/
function superfluous_termination_default() {
	function check(node, reporter) {
		if (!isAny(node, ["bpmn:Process", "bpmn:SubProcess"])) return;
		const ends = (node.flowElements || []).filter((element) => is(element, "bpmn:FlowNode") && (element.outgoing || []).length === 0);
		const terminateEnds = ends.filter(isTerminateEnd);
		if (terminateEnds.length !== 1) return;
		if (ends.every((end) => isInterruptingEventSub(end) || isTerminateEnd(end))) for (const node of terminateEnds) reporter.report(node.id, t("superfluousTermination.superfluous"));
	}
	return annotateRule("superfluous-termination", { check });
}
function isTerminateEnd(element) {
	return is(element, "bpmn:EndEvent") && (element.eventDefinitions || []).some((eventDefinition) => is(eventDefinition, "bpmn:TerminateEventDefinition"));
}
function isInterruptingEventSub(element) {
	return is(element, "bpmn:SubProcess") && element.triggeredByEvent && (element.flowElements || []).some((element) => is(element, "bpmn:StartEvent") && element.isInterrupting);
}

//#endregion
//#region lib/traverse.js
/**
* @typedef { import('./types.js').ModdleElement } ModdleElement
*
* @typedef { (element: ModdleElement) => boolean | void } EnterFn
* @typedef { (element: ModdleElement) => void } LeaveFn
*/
/**
* Check if a type is simple, primitive.
*
* @param {string} type
* @return {boolean}
*/
function isSimpleType(type) {
	return [
		"String",
		"Boolean",
		"Integer",
		"Real"
	].includes(type);
}
/**
* Traverse a moddle tree, depth first from top to bottom
* and call the passed visitor fn.
*
* @param { ModdleElement } element
* @param { { enter?: EnterFn; leave?: LeaveFn } } options
*/
function traverse(element, options) {
	const enter = options.enter;
	const leave = options.leave;
	const enterSubTree = enter && enter(element);
	const descriptor = element.$descriptor;
	if (enterSubTree !== false && !descriptor.isGeneric) descriptor.properties.filter((p) => {
		return !p.isAttr && !p.isReference && !isSimpleType(p.type);
	}).forEach((p) => {
		if (p.name in element) {
			const propertyValue = element[p.name];
			if (p.isMany) propertyValue.forEach((child) => {
				traverse(child, options);
			});
			else traverse(propertyValue, options);
		}
	});
	leave && leave(element);
}

//#endregion
//#region lib/test-rule.js
/**
* @typedef { import('./types.js').EnterFn } EnterFn
* @typedef { import('./types.js').ModdleElement } ModdleElement
* @typedef { import('./types.js').RuleDefinition } RuleDefinition
* @typedef { import('./types.js').Report } Report
*/
var Reporter = class {
	/**
	* @param { {
	*   moddleRoot: ModdleElement,
	*   rule: RuleDefinition
	* } } options
	*/
	constructor({ moddleRoot, rule }) {
		this.rule = rule;
		this.moddleRoot = moddleRoot;
		/**
		* @type { Report[] }
		*/
		this.messages = [];
		this.report = this.report.bind(this);
	}
	/**
	* @param { string } id
	* @param { string } message
	* @param { string[] | { path?: string[], [key: string]: any } } [path]
	*
	* @example
	*
	* ```javascript
	* reporter.report('foo', 'Foo error', [ 'foo', 'bar', 'baz' ]);
	*
	* reporter.report('foo', 'Foo error', {
	*   path: [ 'foo', 'bar', 'baz' ],
	*   foo: 'foo'
	* });
	* ```
	*/
	report(id, message, path) {
		let report = {
			id,
			message
		};
		if (path && isArray(path)) report = {
			...report,
			path
		};
		if (path && isObject(path)) report = {
			...report,
			...path
		};
		this.messages.push(report);
	}
};
/**
* @param { {
*   moddleRoot: ModdleElement,
*   rule: RuleDefinition,
*   config: any
* } } options
*
* @return { Report[] } lint reports
*/
function testRule({ moddleRoot, rule }) {
	const reporter = new Reporter({
		rule,
		moddleRoot
	});
	const check = rule.check || {};
	const leave = "leave" in check ? check.leave : void 0;
	const enter = "enter" in check ? check.enter : isFunction(check) ? check : void 0;
	if (!enter && !leave) throw new Error("no check implemented");
	traverse(moddleRoot, {
		enter: enter ? (node) => enter(node, reporter) : void 0,
		leave: leave ? (node) => leave(node, reporter) : void 0
	});
	return reporter.messages;
}

//#endregion
//#region lib/linter.js
/**
* @typedef { import('./types.js').ModdleElement } ModdleElement
*
* @typedef { import('./types.js').ReportingCategory } ReportingCategory
* @typedef { import('./types.js').ReportingCategoryMap } ReportingCategoryMap
* @typedef { import('./types.js').RuleErrorCategory } RuleErrorCategory
*
* @typedef { import('./types.js').Resolver } Resolver
* @typedef { import('./types.js').Config } Config
*
* @typedef { import('./types.js').RuleDefinition } RuleDefinition
* @typedef { import('./types.js').RuleConfigs } RuleConfigs
* @typedef { import('./types.js').RuleConfig } RuleConfig
*
* @typedef { {
*   name: string,
*   rule: RuleDefinition,
*   config: any,
*   category: ReportingCategory
* } } ResolvedRuleDefinition
*
* @typedef { import('./types.js').Report } Report
* @typedef { Report & Pick<RuleDefinition, 'meta'> & {
*   category: ReportingCategory | RuleErrorCategory
* } } AnnotatedReport
*
* @typedef { import('./types.js').TransformRuleFn } TransformRuleFn
*
* @typedef { Record<string, AnnotatedReport[]> } LintResults
*/
/**
* Transform a rule after it is loaded.
*
* @param { RuleDefinition } rule
* @param { { pkg: string, ruleName: string } } options
*/
const noopTransformRule = (rule, options) => rule;
/** @type { ReportingCategoryMap } */
const categoryMap = {
	0: "off",
	1: "warn",
	2: "error",
	3: "info"
};
/** @type { RuleErrorCategory } */
const ruleErrorCategory = "rule-error";
var Linter = class {
	/**
	* @param { {
	*   config?: Config,
	*   resolver: Resolver,
	*   transformRule?: TransformRuleFn
	* } } options
	*/
	constructor(options) {
		const { config = {}, resolver, transformRule = noopTransformRule } = options || {};
		if (typeof resolver === "undefined") throw new Error("must provide <options.resolver>");
		/** @type { Config } */
		this.config = config;
		/** @type { Resolver } */
		this.resolver = resolver;
		/** @type { TransformRuleFn } */
		this.transformRule = transformRule;
		/** @type { Record<string, RuleDefinition> } */
		this.cachedRules = {};
		/** @type { Record<string, Config> } */
		this.cachedConfigs = {};
	}
	/**
	* Applies a rule on the moddleRoot and adds reports to the finalReport
	*
	* @param { ModdleElement } moddleRoot
	* @param { ResolvedRuleDefinition } ruleDefinition
	*
	* @return { AnnotatedReport[] } reports
	*/
	applyRule(moddleRoot, ruleDefinition) {
		const { config, rule, category, name } = ruleDefinition;
		try {
			return testRule({
				moddleRoot,
				rule,
				config
			}).map((report) => ({
				...report,
				meta: rule.meta,
				category
			}));
		} catch (e) {
			console.error("rule <" + name + "> failed with error: ", e);
			return [{
				message: e.message,
				category: ruleErrorCategory
			}];
		}
	}
	/**
	* @param { string } name
	* @param  { RuleConfig } config
	*
	* @return { Promise<RuleDefinition> }
	*/
	resolveRule(name, config) {
		const { pkg, ruleName } = this.parseRuleName(name);
		const id = `${pkg}-${ruleName}`;
		const cached = this.cachedRules[id];
		if (cached) return Promise.resolve(cached);
		return Promise.resolve(this.resolver.resolveRule(pkg, ruleName)).then((ruleFactory) => {
			if (!ruleFactory) throw new Error(`unknown rule <${name}>`);
			return this.cachedRules[id] = this.transformRule(ruleFactory(config), {
				pkg,
				ruleName
			});
		});
	}
	/**
	* @param {string} name
	* @return {Promise<Config>}
	*/
	resolveConfig(name) {
		const { pkg, configName } = this.parseConfigName(name);
		const id = `${pkg}-${configName}`;
		const cached = this.cachedConfigs[id];
		if (cached) return Promise.resolve(cached);
		return Promise.resolve(this.resolver.resolveConfig(pkg, configName)).then((config) => {
			if (!config) throw new Error(`unknown config <${name}>`);
			return this.cachedConfigs[id] = this.normalizeConfig(config, pkg);
		});
	}
	/**
	* Take a linter config and return list of resolved rules.
	*
	* @param { Config } config
	* @return { Promise<ResolvedRuleDefinition[]> }
	*/
	resolveRules(config) {
		return this.resolveConfiguredRules(config).then((rulesConfig) => {
			const loaders = Object.entries(rulesConfig).map(([name, value]) => {
				const { category, config } = this.parseRuleValue(value);
				return {
					name,
					category,
					config
				};
			}).filter((definition) => definition.category !== "off").map((definition) => {
				const { name, config } = definition;
				return this.resolveRule(name, config).then((rule) => ({
					...definition,
					rule
				}));
			});
			return Promise.all(loaders);
		});
	}
	/**
	* @param { Config } config
	* @return { Promise<RuleConfigs> }
	*/
	resolveConfiguredRules(config) {
		let parents = config.extends;
		if (typeof parents === "string") parents = [parents];
		if (typeof parents === "undefined") parents = [];
		return Promise.all(parents.map((configName) => this.resolveConfig(configName).then((cfg) => this.resolveConfiguredRules(cfg)))).then((inheritedRules) => {
			const overrideRules = this.normalizeConfig(config, "bpmnlint").rules;
			return [...inheritedRules, overrideRules].reduce((acc, currentRules) => ({
				...acc,
				...currentRules
			}), {});
		});
	}
	/**
	* Lint the given model root, using the specified linter config.
	*
	* @param { ModdleElement } moddleRoot
	* @param { Config } [config] the bpmnlint configuration to use
	*
	* @return { Promise<LintResults> } lint results, keyed by rule names
	*/
	lint(moddleRoot, config) {
		config = config || this.config;
		return this.resolveRules(config).then((ruleDefinitions) => {
			/** @type { LintResults } */
			const allReports = {};
			ruleDefinitions.forEach((ruleDefinition) => {
				const { name } = ruleDefinition;
				const reports = this.applyRule(moddleRoot, ruleDefinition);
				if (reports.length) allReports[name] = reports;
			});
			return allReports;
		});
	}
	/**
	* @param { RuleConfig } value
	* @return { { config: any, category: ReportingCategory } }
	*/
	parseRuleValue(value) {
		let category;
		let config;
		if (Array.isArray(value)) {
			category = value[0];
			config = value[1];
		} else {
			category = value;
			config = {};
		}
		if (typeof category === "string") category = category.toLowerCase();
		category = categoryMap[category] || category;
		return {
			config,
			category
		};
	}
	parseRuleName(name, localPackage = "bpmnlint") {
		/**
		* We recognize the following rule name patterns:
		*
		* {RULE_NAME} => PKG = 'bpmnlint'
		* bpmnlint/{RULE_NAME} => PKG = 'bpmnlint'
		* {PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		* bpmnlint-plugin-{PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		* @scope/{PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		* @scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}/{RULE_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		*/
		const match = /^(?:(?:(@[^/]+)\/)?([^@]{1}[^/]*)\/)?([^/]+)$/.exec(name);
		if (!match) throw new Error(`unparseable rule name <${name}>`);
		const [_, ns, packageName, ruleName] = match;
		if (!packageName) return {
			pkg: localPackage,
			ruleName
		};
		return {
			pkg: `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`,
			ruleName
		};
	}
	parseConfigName(name) {
		/**
		* We recognize the following config name patterns:
		*
		* bpmnlint:{CONFIG_NAME} => PKG = 'bpmnlint'
		* plugin:{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		* plugin:bpmnlint-plugin-{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = 'bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		* plugin:@scope/{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		* plugin:@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}/{CONFIG_NAME} => PKG = '@scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}'
		*/
		const match = /^(?:(?:plugin:(?:(@[^/]+)\/)?([^@]{1}[^/]*)\/)|bpmnlint:)([^/]+)$/.exec(name);
		if (!match) throw new Error(`unparseable config name <${name}>`);
		const [_, ns, packageName, configName] = match;
		if (!packageName) return {
			pkg: "bpmnlint",
			configName
		};
		return {
			pkg: `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`,
			configName
		};
	}
	getSimplePackageName(name) {
		/**
		* We recognize the following package name patterns:
		*
		* bpmnlint => PKG = 'bpmnlint'
		* {PACKAGE_SHORTCUT} => PKG = PACKAGE_SHORTCUT
		* bpmnlint-plugin-{PACKAGE_SHORTCUT}' => PKG = PACKAGE_SHORTCUT
		* @scope/{PACKAGE_SHORTCUT} => PKG = '@scope/{PACKAGE_SHORTCUT}'
		* @scope/bpmnlint-plugin-{PACKAGE_SHORTCUT}' => PKG = '@scope/PACKAGE_SHORTCUT'
		*/
		const match = /^(?:(@[^/]+)\/)?([^/]+)$/.exec(name);
		if (!match) throw new Error(`unparseable package name <${name}>`);
		const [_, ns, packageName] = match;
		return `${ns ? ns + "/" : ""}${unprefixPackage(packageName)}`;
	}
	/**
	* Validate and return validated config.
	*
	* @param  {Object} config
	* @param  {String} localPackage
	*
	* @return {Object} validated config
	*/
	normalizeConfig(config, localPackage) {
		const rules = config.rules || {};
		const validatedRules = Object.keys(rules).reduce((normalizedRules, name) => {
			const value = rules[name];
			const { pkg, ruleName } = this.parseRuleName(name, localPackage);
			const normalizedName = pkg === "bpmnlint" ? ruleName : `${this.getSimplePackageName(pkg)}/${ruleName}`;
			normalizedRules[normalizedName] = value;
			return normalizedRules;
		}, {});
		return {
			...config,
			rules: validatedRules
		};
	}
};
function prefixPackage(pkg) {
	if (pkg === "bpmnlint") return "bpmnlint";
	if (pkg.startsWith("bpmnlint-plugin-")) return pkg;
	return `bpmnlint-plugin-${pkg}`;
}
function unprefixPackage(pkg) {
	if (pkg.startsWith("bpmnlint-plugin-")) return pkg.substring(16);
	return pkg;
}

//#endregion
//#region lib/resolver/static-resolver.js
/**
* @typedef { import('../types.js').RuleFactory } RuleFactory
* @typedef { import('../types.js').Config } Config
*/
/**
* A resolver that resolves rules and packages from a static cache.
*
* @param { any } cache
*/
var StaticResolver = class {
	/**
	* @param {any} cache
	*/
	constructor(cache) {
		this.cache = cache;
	}
	/**
	* @param { string } pkg
	* @param { string } ruleName
	*
	* @return { RuleFactory }
	*/
	resolveRule(pkg, ruleName) {
		return this.resolve("rule", pkg, ruleName);
	}
	/**
	* @param { string } pkg
	* @param { string } configName
	*
	* @return { Config }
	*/
	resolveConfig(pkg, configName) {
		return this.resolve("config", pkg, configName);
	}
	/**
	* @param {string} type
	* @param {string} pkg
	* @param {string} name
	*/
	resolve(type, pkg, name) {
		const id = `${pkg}/${name}`;
		const resolved = this.cache[`${type}:${id}`];
		if (!resolved) throw new Error(`unknown ${type} <${id}>`);
		return resolved;
	}
};

//#endregion
//#region lib/index.js
const rules = /* @__PURE__ */ Object.assign({
	"../rules/ad-hoc-sub-process.js": ad_hoc_sub_process_exports,
	"../rules/conditional-event.js": conditional_event_exports,
	"../rules/conditional-flows.js": conditional_flows_exports,
	"../rules/end-event-required.js": end_event_required_exports,
	"../rules/event-based-gateway.js": event_based_gateway_exports,
	"../rules/event-sub-process-typed-start-event.js": event_sub_process_typed_start_event_exports,
	"../rules/fake-join.js": fake_join_exports,
	"../rules/global.js": global_exports,
	"../rules/helper.js": helper_exports,
	"../rules/i18n.js": i18n_exports,
	"../rules/label-required.js": label_required_exports,
	"../rules/link-event.js": link_event_exports,
	"../rules/no-bpmndi.js": no_bpmndi_exports,
	"../rules/no-complex-gateway.js": no_complex_gateway_exports,
	"../rules/no-disconnected.js": no_disconnected_exports,
	"../rules/no-duplicate-sequence-flows.js": no_duplicate_sequence_flows_exports,
	"../rules/no-gateway-join-fork.js": no_gateway_join_fork_exports,
	"../rules/no-implicit-end.js": no_implicit_end_exports,
	"../rules/no-implicit-split.js": no_implicit_split_exports,
	"../rules/no-implicit-start.js": no_implicit_start_exports,
	"../rules/no-inclusive-gateway.js": no_inclusive_gateway_exports,
	"../rules/no-overlapping-elements.js": no_overlapping_elements_exports,
	"../rules/single-blank-start-event.js": single_blank_start_event_exports,
	"../rules/single-event-definition.js": single_event_definition_exports,
	"../rules/start-event-required.js": start_event_required_exports,
	"../rules/sub-process-blank-start-event.js": sub_process_blank_start_event_exports,
	"../rules/superfluous-gateway.js": superfluous_gateway_exports,
	"../rules/superfluous-termination.js": superfluous_termination_exports
});
const resolveConfig = (configs = []) => {
	return (Array.isArray(configs) ? configs : [configs]).reduce((acc, { rules: rulesDef }) => {
		for (const rule in rulesDef) acc[`rule:bpmnlint/${rule}`] = rules[`../rules/${rule}.js`].default;
		return acc;
	}, {});
};

//#endregion
export { Linter, StaticResolver, getLocale, resolveConfig, setLocale };