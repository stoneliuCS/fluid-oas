import { withBooleanTemplate } from "./BooleanTemplate";
import { MainProject } from "./TemplateBuilder";

function main() {
  // Load Boolean Code Gen
  withBooleanTemplate();

  // Save Everything
  MainProject.saveSync();
}

main();
