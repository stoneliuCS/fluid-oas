import { FunctionBuilder } from "./FunctionBuilder";
import { FunctionTemplateBuilder } from "./FunctionTemplate";
import { PrimitiveTemplateBuilder } from "./PrimitiveTemplate";
import { MainProject } from "./TemplateBuilder";

const description = new PrimitiveTemplateBuilder({
  fnName: "withDescription",
  fieldType: "string",
  serializedName: "description",
  generic: false,
  comments: "Extends the functionality of a class with a Description Builder.",
});

const summary = new PrimitiveTemplateBuilder({
  fnName: "withSummary",
  fieldType: "string",
  serializedName: "summary",
  generic: false,
  comments: "Extends the functionality of a class with a Summary Builder.",
});

const allowReserved = new PrimitiveTemplateBuilder({
  fnName: "withAllowReserved",
  fieldType: "boolean",
  serializedName: "allowReserved",
  generic: false,
  comments:
    "Extends the functionality of a class with a AllowReserved Builder.",
});

const value = new FunctionTemplateBuilder({
  fnName: "withValue",
  fieldType: "string | unknown",
  serializedName: "value",
  generic: true,
  comments: "Extends the functionality of a class with a Value Builder.",
});

async function main() {
  // Generic Function Generators
  const functions: FunctionBuilder[] = [
    description,
    summary,
    allowReserved,
    value,
  ];

  functions.forEach(func => func.write(MainProject));

  console.log(MainProject.getText("common.ts"));

  await MainProject.save();
}

main();
