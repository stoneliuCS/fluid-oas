import { CodeBlockWriter } from "ts-morph";
import { FunctionBuilder } from "./FunctionBuilder";

export class MapTemplateBuilder extends FunctionBuilder {
  protected parseField() {
    const temp = `const tempVar: ${this.fieldType} = undefined as any;`;
    const sourceFile = this.currentProject?.createSourceFile("temp.ts", temp, {
      overwrite: true,
    });
    if (!sourceFile) {
      throw new Error("Source file undefined.");
    }
    const variable = sourceFile.getVariableDeclaration("tempVar") as any;
    if (!variable) {
      throw new Error("Variable undefined.");
    }
    const types = variable.getTypeNode().getTypeArguments();
    if (types.length != 2) {
      throw new Error("Map types must only have exactly two args.");
    }
    const key = types[0].getText();
    const val = types[1].getText();
    sourceFile.delete();
    return {
      key: key,
      val: val,
    };
  }
  protected buildAbstractBody(
    writer: CodeBlockWriter
  ): (cb: () => void) => CodeBlockWriter {
    return this.writeClassReturnBody(writer).writeBody;
  }
  protected buildField(writer: CodeBlockWriter): void {
    this.parseField();
    writer.writeLine(`_${this.serializedName}? : ${this.fieldType};`);
  }
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer
      .write(
        `${this.methodName}(mappings : Partial<{ [K in ${this.parseField().key}] : ${this.parseField().val} }>)`
      )
      .block(() => {
        writer.writeLine("const copy : this = Object.create(this);");
        writer.writeLine(
          `copy._${this.serializedName} = new Map(this._${this.serializedName});`
        );
        writer.write(`for (const key in mappings)`).block(() => {
          writer.writeLine(
            `const k : ${this.parseField().key} = key as ${this.parseField().key}`
          );
          writer.writeLine(
            `copy._${this.serializedName}.set(k, mappings[k]!);`
          );
        });
        writer.writeLine("return copy;");
      });
  }

  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine("const mappings : any = {};");
        writer.writeLine(
          `this._${this.serializedName}.forEach((val, key) => { mappings[key] = val })`
        );
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : mappings, enumerable : true })`
        );
      });
      writer.writeLine("return json;");
    });
  }
}
