import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class MapTemplateBuilder extends FunctionBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine("const mappings : any = {};");
        writer.writeLine(
          `this._${this.serializedName}.forEach((val, key) => { mappings[key] = val.toJSON() })`
        );
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : mappings, enumerable : true })`
        );
      });
    });
  }
  protected buildFunction(writer: CodeBlockWriter): void {
    this.writeClassReturnBody(writer).writeBody(() => {
      writer.writeLine(
        `private _${this.serializedName}? : Map<string, ${this.fieldType}>;`
      );
      writer.write(`${this.serializedName}(name : string)`).block(() => {
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
      this.buildJSONMethod(writer);
    });
  }
}
