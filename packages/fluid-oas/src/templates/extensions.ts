// Utility extension classes to override particular implementations of the core template classes.
import { CodeBlockWriter } from "ts-morph";
import { MapTemplateBuilder } from "./MapTemplate";
import { PrimitiveTemplateBuilder } from "./PrimitiveTemplate";
import { ArrayTemplateBuilder } from "./ArrayTemplate";

// Special case where we want serialization logic to be on the top level object.
export const KeyNameClass = class extends MapTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `this._${this.serializedName}.forEach((val, key) => { Object.defineProperty(json, key, { value : val, enumerable : true }) })`
        );
      });
      writer.writeLine("return json;");
    });
  }
};

// Special case for regular expressions that have a .source attribute
export const RegExpClass = class extends PrimitiveTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.source, enumerable : true })`
        );
      });
      writer.writeLine("return json;");
    });
  }
};

// Really special case to handle serialization of union types introduced by OAS 3.1
export const UnionClass = class extends ArrayTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer
        .write(`if (this._${this.serializedName} !== undefined)`)
        .block(() => {
          writer.write(
            `
        if (this._type !== undefined) {
          const deserializedSchemas = this._type.map(schema =>
            schema ? schema.toJSON() : schema
          );
          const newJSON: { type: string[] } = { type: [] };
          deserializedSchemas.forEach(jsonVal => {
            if (typeof jsonVal !== "object") {
              throw new Error("Unable to deserialize the union.");
            }
            if (jsonVal === null) {
              newJSON.type.push("null");
            } else if ("type" in jsonVal) {
              newJSON.type.push(jsonVal["type"] as string);
              const { type, ...rest } = jsonVal;
              Object.assign(newJSON, rest);
            }
          });
          return newJSON;
        }
`
          );
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}, enumerable : true })`
          );
        });
      writer.writeLine("return json;");
    });
  }
};
