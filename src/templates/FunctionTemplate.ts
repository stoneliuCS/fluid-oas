import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class FunctionTemplateBuilder extends FunctionBuilder {
  protected buildFunction(writer: CodeBlockWriter): void {
    this.withGenericBody(writer).withBody(() => {
      this.writeClassReturnBody(writer).writeBody(() => {
        writer.writeLine(
          `private _${this.serializedName} : ${FunctionBuilder.genericName};`
        );
        writer
          .write(`${this.serializedName}(val : ${FunctionBuilder.genericName})`)
          .block(() => {
            writer.writeLine("const copy: this = Object.create(this);");
            writer.writeLine(`copy._${this.serializedName} = val;`);
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
    });
  }
}
