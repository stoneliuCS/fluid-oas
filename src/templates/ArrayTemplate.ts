import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class ArrayTemplateBuilder extends FunctionBuilder {
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
      });
    });
  }
}
