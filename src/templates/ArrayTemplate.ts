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
  protected buildField(writer: CodeBlockWriter): void {
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
}
