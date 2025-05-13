import { FunctionBuilder } from "../../FunctionBuilder";
import { PrimitiveTemplateBuilder } from "../../PrimitiveTemplate";
import { FunctionTemplateBuilder } from "../../FunctionTemplate.ts";

export const commonTemplates = (): FunctionBuilder[] => {
  const primitves: FunctionBuilder[] = [
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
      fnName: "withName",
      fieldType: "string",
      serializedName: "name",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNamespace",
      fieldType: "string",
      serializedName: "namespace",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withPrefix",
      fieldType: "string",
      serializedName: "prefix",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withWrapped",
      fieldType: "boolean",
      serializedName: "wrapped",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAttribute",
      fieldType: "boolean",
      serializedName: "attribute",
    }),
  ];

  const functions: FunctionBuilder[] = [
    new FunctionTemplateBuilder({
      fnName: "withValue",
      fieldType: "string | unknown",
      serializedName: "value",
    }),
    new FunctionTemplateBuilder({
      fnName: "withFormat",
      fieldType: "string",
      serializedName: "format",
    }),
  ];
  return primitves.concat(functions);
};
