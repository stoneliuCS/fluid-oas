import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class PrimitiveTemplateBuilder extends FunctionBuilder {
  private writeClassMethodBody(writer: CodeBlockWriter) {
    const methodBlock: (
      withParam: boolean
    ) => (cb: () => void) => CodeBlockWriter = param => {
      return writer
        .write(
          `${this.serializedName}(${param ? "val : " + this.fieldType : ""})`
        )
        .block.bind(writer);
    };

    return {
      writeMethodBody: () => methodBlock(false),
      writerMethodBodyWithParam: () => methodBlock(true),
    };
  }
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
          () => `copy._${this.serializedName} = val;`
        );
        writer.writeLine("return copy;");
      });

      writer.write("toJSON()").block(() => {
        writer.writeLine("const json = super.toJSON();");
        writer.write(`if (this._${this.serializedName})`).block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}, enumerable : true })`
          );
        });
      });
    });
  }
}
