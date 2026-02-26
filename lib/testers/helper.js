// @ts-expect-error 'missing <bpmn-moddle> types'
import { BpmnModdle } from "bpmn-moddle";

import { readFileSync } from "node:fs";

/**
 * @typedef { any } ModdleElement
 *
 * @typedef { {
 *   root: ModdleElement,
 *   moddle: BpmnModdle,
 *   warnings: any[]
 * } } CreatedModdle
 */

/**
 * Create moddle instance.
 *
 * @param {string} xml the XML string
 * @param {string} [elementType]
 * @param {Object} [moddleExtensions]
 *
 * @return {Promise<CreatedModdle>}
 */
export async function createModdle(
  xml,
  elementType = "bpmn:Definitions",
  moddleExtensions,
) {
  if (typeof elementType !== "string") {
    moddleExtensions = elementType;
    elementType = undefined;
  }

  if (typeof elementType === "undefined") {
    elementType = "bpmn:Definitions";
  }

  const moddle = new BpmnModdle(moddleExtensions);

  const { rootElement: root, warnings = [] } = await moddle.fromXML(
    xml,
    elementType,
    { lax: true },
  );

  return {
    root,
    moddle,

    // @ts-ignore-next-line "legacy"
    context: {
      warnings,
    },
    warnings,
  };
}

/**
 * Return moddle instance, read from the given file.
 *
 * @param {string|URL} filePath
 * @param {string} [elementType]
 * @param {Object} [moddleExtensions]
 *
 * @return {Promise<CreatedModdle>}
 */
export function readModdle(filePath, elementType, moddleExtensions) {
  const contents = readFileSync(filePath, "utf8");

  return createModdle(contents, elementType, moddleExtensions);
}
