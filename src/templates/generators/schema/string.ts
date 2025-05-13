import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "../../FunctionBuilder";
import { PrimitiveTemplateBuilder } from "../../PrimitiveTemplate";

export const stringTemplates = (): FunctionBuilder[] => {
  const withRegExpClass = class extends PrimitiveTemplateBuilder {
    protected buildJSONMethod(writer: CodeBlockWriter): void {
      writer.write("toJSON()").block(() => {
        writer.writeLine("const json = super.toJSON();");
        writer.write(`if (this._${this.serializedName})`).block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.source, enumerable : true })`
          );
        });
      });
    }
  };
  return [
    new withRegExpClass({
      fnName: "withPattern",
      fieldType: "RegExp",
      serializedName: "pattern",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinLength",
      fieldType: "number",
      serializedName: "minLength",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaxLength",
      fieldType: "number",
      serializedName: "maxLength",
    }),
  ];
};
