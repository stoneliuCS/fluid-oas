import { ArrayTemplateBuilder } from "./ArrayTemplate";
import { FunctionBuilder } from "./FunctionBuilder";
import { FunctionTemplateBuilder } from "./FunctionTemplate";
import { MapTemplateBuilder } from "./MapTemplate";
import { PrimitiveTemplateBuilder } from "./PrimitiveTemplate";
import { MainProject } from "./TemplateBuilder";

async function main() {
  // Generic Function Generators
  const functions: FunctionBuilder[] = [
    new PrimitiveTemplateBuilder({
      fnName: "withDescription",
      fieldType: "string",
      serializedName: "description",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withSummary",
      fieldType: "string",
      serializedName: "summary",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAllowReserved",
      fieldType: "boolean",
      serializedName: "allowReserved",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withDeprecated",
      fieldType: "boolean",
      serializedName: "deprecated",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequired",
      fieldType: "boolean",
      serializedName: "required",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNullable",
      fieldType: "boolean",
      serializedName: "nullable",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaximum",
      fieldType: "number",
      serializedName: "maximum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinimum",
      fieldType: "number",
      serializedName: "minimum",
    }),
    new FunctionTemplateBuilder({
      fnName: "withValue",
      fieldType: "string | unknown",
      serializedName: "value",
      generic: true,
    }),
    new FunctionTemplateBuilder({
      fnName: "withFormat",
      fieldType: "string",
      serializedName: "format",
      generic: true,
    }),
    new FunctionTemplateBuilder({
      fnName: "withDefault",
      fieldType: FunctionBuilder.genericName,
      serializedName: "default",
      generic: true,
    }),
    new MapTemplateBuilder({
      fnName: "withMapping",
      fieldType: "OpenApiSchema",
      serializedName: "mapping",
    }),
    new ArrayTemplateBuilder({
      fnName: "withParameters",
      fieldType: "OpenApiSchema",
      serializedName: "parameters",
    }),
  ];

  functions.forEach(func => func.write(MainProject));

  await MainProject.save();
}

main();
