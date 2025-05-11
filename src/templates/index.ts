import { writePrimitiveFunction } from "./PrimitiveTemplates";
import { makeMixinFunctionSignature } from "./template";
import { MainProject } from "./TemplateBuilder";

function main() {
  // Primitive Signatures
  [
    makeMixinFunctionSignature({
      fnName: "withDescription",
      fieldType: "string",
      serializedName: "description",
      comments:
        "Extends the functionality of a class with a Description Builder.",
    }),
  ].forEach(signature => writePrimitiveFunction(signature).write());
  console.log(MainProject.getText("common.ts"));
}

main();
