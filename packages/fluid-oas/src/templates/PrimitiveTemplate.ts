import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class PrimitiveTemplateBuilder extends FunctionBuilder {
  protected buildAbstractBody(
    writer: CodeBlockWriter
  ): (cb: () => void) => CodeBlockWriter {
    return this.writeClassReturnBody(writer).writeBody;
  }
  protected buildField(writer: CodeBlockWriter): void {
    writer.writeLine(`_${this.serializedName}? : ${this.fieldType};`);
  }
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer.write(`${this.methodName}(val : ${this.fieldType})`).block(() => {
      writer.writeLine("const copy: this = Object.create(this);");
      writer.writeLine(`copy._${this.serializedName} = val`);
      writer.writeLine("return copy;");
    });
  }
}
