import { checkDiscouragedNodeType } from "./helper.js";

export default checkDiscouragedNodeType(
  "bpmn:ComplexGateway",
  "no-complex-gateway",
);
