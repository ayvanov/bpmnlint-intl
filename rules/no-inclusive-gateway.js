import { checkDiscouragedNodeType } from "./helper.js";

export default checkDiscouragedNodeType(
  "bpmn:InclusiveGateway",
  "no-inclusive-gateway",
);
