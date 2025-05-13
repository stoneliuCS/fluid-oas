import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class ArrayTemplateBuilder extends FunctionBuilder {
  protected buildAbstractBody(
    writer: CodeBlockWriter
  ): (cb: () => void) => CodeBlockWriter {
    return (cb: () => void) =>
      this.withGenericBody(writer).withBody(() => {
        return this.writeClassReturnBody(writer).writeBody(cb);
      });
  }
  protected buildFields(writer: CodeBlockWriter): void {
    writer.writeLine(
      `private _${this.serializedName} : ${FunctionBuilder.genericName}[];`
    );
  }
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer
      .write(`${this.serializedName}(val : ${FunctionBuilder.genericName})`)
      .block(() => {
        writer.writeLine("const copy: this = Object.create(this);");
        writer.writeLine(
          `copy._${this.serializedName} = this._${this.serializedName} === undefined ? [val] : [...this._${this.serializedName}, val]`
        );
        writer.writeLine("return copy;");
      });
  }

  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}, enumerable : true })`
        );
      });
    });
  }
}
