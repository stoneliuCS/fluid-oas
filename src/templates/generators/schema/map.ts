import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "../../FunctionBuilder";
import { MapTemplateBuilder } from "../../MapTemplate";

export const mapTemplates = (): FunctionBuilder[] => {
  const ExtensionClass = class extends MapTemplateBuilder {
    protected buildBuilderMethod(writer: CodeBlockWriter): void {
      writer.write(`${this.serializedName}(name : string)`).block(() => {
        writer.writeLine(`if (!name.startsWith("x-"))`).block(() => {
          writer.writeLine(
            `throw new Error("Extension names must start with x-")`
          );
        });
        writer.write(`return`).block(() => {
          writer.write(`with : (val : ${this.fieldType}) => `).block(() => {
            writer.writeLine("const copy : this = Object.create(this);");
            writer.writeLine(
              `copy._${this.serializedName} = new Map(this._${this.serializedName});`
            );
            writer.writeLine(`copy._${this.serializedName}.set(name, val);`);
            writer.writeLine("return copy;");
          });
        });
      });
    }
    protected buildJSONMethod(writer: CodeBlockWriter): void {
      writer.write("toJSON()").block(() => {
        writer.writeLine("const json = super.toJSON();");
        writer.write(`if (this._${this.serializedName})`).block(() => {
          writer.write(`
        for (let [key, val] of this._extensions.entries()) {
          Object.defineProperty(json, key, {
            value: val.toJSON(),
            enumerable: true,
          });
        }
  `);
        });
      });
    }
  };

  return [
    new MapTemplateBuilder({
      fnName: "withMapping",
      fieldType: "OpenApiSchema",
      serializedName: "mapping",
    }),
    new ExtensionClass({
      fnName: "withExtensions",
      fieldType: "OpenApiSchema",
      serializedName: "extensions",
    }),
  ];
};
