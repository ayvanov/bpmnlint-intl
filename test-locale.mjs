import { Linter, setLocale, getLocale } from "./lib/index.js";
import { BpmnModdle } from "bpmn-moddle";
import StaticResolver from "./lib/resolver/static-resolver.js";
import noDisconnected from "./rules/no-disconnected.js";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:task id="Task_disconnected" name="Disconnected Task" />
  </bpmn:process>
</bpmn:definitions>`;

async function lint(locale) {
  setLocale(locale);

  const moddle = new BpmnModdle();
  const { rootElement: root } = await moddle.fromXML(xml, "bpmn:Definitions", {
    lax: true,
  });

  const resolver = new StaticResolver({
    "rule:bpmnlint/no-disconnected": noDisconnected,
  });

  const linter = new Linter({ resolver });

  const results = await linter.lint(root, {
    rules: { "no-disconnected": "error" },
  });

  console.log(`\n--- locale: "${getLocale()}" ---`);
  for (const [rule, reports] of Object.entries(results)) {
    for (const report of reports) {
      console.log(`[${rule}] ${report.message}`);
    }
  }
}

await lint("en");
await lint("ru");
