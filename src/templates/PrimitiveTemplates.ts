import {
  FunctionDeclarationStructure,
  OptionalKind,
  CodeBlockWriter,
} from "ts-morph";
import { CommonWriter } from "./template";
import { FunctionBuilder } from "./FunctionBuilder";

class PrimitiveBuilder extends FunctionBuilder {
  protected buildPrimitive(writer: CodeBlockWriter): void {
    writer
      .write(
        `return class extends ${this.function.getParameter("Base")?.getName()} => `
      )
      .block(() => {
        writer.writeLine(`private`);
      });
  }
}

export const writePrimitiveFunction = (
  signature: OptionalKind<FunctionDeclarationStructure>
) => {
  const fn = CommonWriter(signature);
  return new PrimitiveBuilder(fn);
};
