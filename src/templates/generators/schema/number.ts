import { FunctionBuilder } from "../../FunctionBuilder";
import { PrimitiveTemplateBuilder } from "../../PrimitiveTemplate";

export const numberTemplates = (): FunctionBuilder[] => {
  return [
    new PrimitiveTemplateBuilder({
      fnName: "withMax",
      fieldType: "number",
      serializedName: "minLength",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMin",
      fieldType: "number",
      serializedName: "maxLength",
    }),
  ];
};
