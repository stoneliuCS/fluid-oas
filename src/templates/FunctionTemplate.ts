import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class FunctionTemplateBuilder extends FunctionBuilder {
  protected buildFunction(writer: CodeBlockWriter): void {
    this.withGenericBody(writer).withBody(() => {
      this.writeClassReturnBody(writer).writeBody(() => {
        writer.writeLine(
          `private _${this.serializedName} : ${this.genericName};`
        );
        this.writeClassMethodBody(writer).writerMethodBodyWithParam()(() => {
          writer.writeLine("const copy: this = Object.create(this);");
          writer.writeLine(
            `copy._${this.serializedName} = ${this.serializedName};`
          );
          writer.writeLine("return copy;");
        });
        this.writeSimpleJSONMethodBody(writer);
      });
    });
  }
}
