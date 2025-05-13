import { CodeBlockWriter } from "ts-morph";
import { ArrayTemplateBuilder } from "../../ArrayTemplate";
import { FunctionBuilder } from "../../FunctionBuilder";

export const arrayTemplates = (): FunctionBuilder[] => {
  const withParametersClass = class extends ArrayTemplateBuilder {
    protected buildJSONMethod(writer: CodeBlockWriter): void {
      writer.write("toJSON()").block(() => {
        writer.writeLine("const json = super.toJSON();");
        writer.write(`if (this._${this.serializedName})`).block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.map(val => val.toJSON()), enumerable : true })`
          );
        });
      });
    }
  };
  const withParameters = new withParametersClass({
    fnName: "withParameters",
    fieldType: "OpenApiParameter",
    serializedName: "parameters",
  });
  return [withParameters];
};
