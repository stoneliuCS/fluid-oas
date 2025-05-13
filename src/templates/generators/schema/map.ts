import { FunctionBuilder } from "../../FunctionBuilder";
import { MapTemplateBuilder } from "../../MapTemplate";

export const mapTemplates = (): FunctionBuilder[] => {
  return [
    new MapTemplateBuilder({
      fnName: "withMapping",
      fieldType: "OpenApiSchema",
      serializedName: "mapping",
    }),
  ];
};
