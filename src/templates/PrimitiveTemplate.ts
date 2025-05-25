import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class PrimitiveTemplateBuilder extends FunctionBuilder {
  protected buildAbstractBody(
    writer: CodeBlockWriter
  ): (cb: () => void) => CodeBlockWriter {
    return this.writeClassReturnBody(writer).writeBody;
  }
  protected buildField(writer: CodeBlockWriter): void {
    writer.writeLine(`#${this.serializedName}? : ${this.fieldType};`);
  }
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
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
        () => `copy.#${this.serializedName} = true;`
      );
      writer.conditionalWriteLine(
        !flag,
        () => `copy.#${this.serializedName} = val;`
      );
      writer.writeLine("return copy;");
    });
  }
  private writeClassMethodBody(writer: CodeBlockWriter) {
    const methodBlock: (
      withParam: boolean
    ) => (cb: () => void) => CodeBlockWriter = param => {
      return writer
        .write(`${this.methodName}(${param ? "val : " + this.fieldType : ""})`)
        .block.bind(writer);
    };

    return {
      writeMethodBody: () => methodBlock(false),
      writerMethodBodyWithParam: () => methodBlock(true),
    };
  }
}
