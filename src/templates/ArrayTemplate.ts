import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class ArrayTemplateBuilder extends FunctionBuilder {
  private override?: boolean;
  public overrideJSONMethod(): this {
    this.override = true;
    return this;
  }
  private overridenJSONMethod(writer: CodeBlockWriter) {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.map(val => val.toJSON()), enumerable : true })`
        );
      });
    });
  }
  private standardJSONMethod(writer: CodeBlockWriter) {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}, enumerable : true })`
        );
      });
    });
  }
  protected buildFunction(writer: CodeBlockWriter): void {
    this.withGenericBody(writer).withBody(() => {
      this.writeClassReturnBody(writer).writeBody(() => {
        writer.writeLine(
          `private _${this.serializedName} : ${FunctionBuilder.genericName}[];`
        );
        writer
          .write(`${this.serializedName}(val : ${FunctionBuilder.genericName})`)
          .block(() => {
            writer.writeLine("const copy: this = Object.create(this);");
            writer.writeLine(
              `copy._${this.serializedName} = this._${this.serializedName} === undefined ? [val] : [...this._${this.serializedName}, val]`
            );
            writer.writeLine("return copy;");
          });
        if (this.override) {
          this.overridenJSONMethod(writer);
        } else {
          this.standardJSONMethod(writer);
        }
      });
    });
  }
}
