import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class PrimitiveTemplateBuilder extends FunctionBuilder {
  protected buildFunction(writer: CodeBlockWriter): void {
    this.writeClassReturnBody(writer).writeBody(() => {
      writer.writeLine(`private _${this.serializedName}? : ${this.fieldType};`);
      let method: (cb: () => void) => CodeBlockWriter;
      const flag = this.fieldType === "boolean";
      if (flag) {
        method = this.writeClassMethodBody(writer).writeMethodBody();
      } else {
        method = this.writeClassMethodBody(writer).writerMethodBodyWithParam();
      }
      method(() => {
        writer.writeLine("const copy: this = Object.create(this);");
        writer.conditionalWriteLine(
          flag,
          () => `copy._${this.serializedName} = true;`
        );
        writer.conditionalWriteLine(
          !flag,
          () => `copy._${this.serializedName} = ${this.serializedName};`
        );
        writer.writeLine("return copy;");
      });

      this.writeSimpleJSONMethodBody(writer);
    });
  }
}
