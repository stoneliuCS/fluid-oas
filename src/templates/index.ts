import { commonTemplates } from "./generators/common/common";
import { arrayTemplates } from "./generators/schema/array";
import { mapTemplates } from "./generators/schema/map";
import { numberTemplates } from "./generators/schema/number";
import { stringTemplates } from "./generators/schema/string";
import { MainProject } from "./TemplateBuilder";

async function main() {
  // Generic Function Generators
  commonTemplates()
    .concat(arrayTemplates())
    .concat(mapTemplates())
    .concat(stringTemplates())
    .concat(numberTemplates())
    .forEach(func => func.write(MainProject));

  await MainProject.save();
}

main();
