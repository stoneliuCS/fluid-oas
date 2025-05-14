import { CodeBlockWriter } from "ts-morph";
import { FunctionTemplateBuilder } from "./FunctionTemplate";
import { PrimitiveTemplateBuilder } from "./PrimitiveTemplate";
import { MainProject } from "./TemplateBuilder";
import { MapTemplateBuilder } from "./MapTemplate";

const OpenApiClass = class extends PrimitiveTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.toJSON(), enumerable : true })`
        );
      });
    });
  }
};

const RegExpClass = class extends PrimitiveTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.source, enumerable : true })`
        );
      });
    });
  }
};

const ExtensionClass = class extends MapTemplateBuilder {
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer.write(`${this.serializedName}(name : string)`).block(() => {
      writer.writeLine(`if (!name.startsWith("x-"))`).block(() => {
        writer.writeLine(
          `throw new Error("Extension names must start with x-")`
        );
      });
      writer.write(`return`).block(() => {
        writer.write(`with : (val : ${this.fieldType}) => `).block(() => {
          writer.writeLine("const copy : this = Object.create(this);");
          writer.writeLine(
            `copy._${this.serializedName} = new Map(this._${this.serializedName});`
          );
          writer.writeLine(`copy._${this.serializedName}.set(name, val);`);
          writer.writeLine("return copy;");
        });
      });
    });
  }
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.write(`
        for (let [key, val] of this._extensions.entries()) {
          Object.defineProperty(json, key, {
            value: val.toJSON(),
            enumerable: true,
          });
        }
  `);
      });
    });
  }
};

async function main() {
  // Generic Function Generators
  [
    new PrimitiveTemplateBuilder({
      fnName: "withDescription",
      fieldType: "string",
      serializedName: "description",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withSummary",
      fieldType: "string",
      serializedName: "summary",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAllowReserved",
      fieldType: "boolean",
      serializedName: "allowReserved",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withDeprecated",
      fieldType: "boolean",
      serializedName: "deprecated",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequired",
      fieldType: "boolean",
      serializedName: "required",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNullable",
      fieldType: "boolean",
      serializedName: "nullable",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withName",
      fieldType: "string",
      serializedName: "name",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNamespace",
      fieldType: "string",
      serializedName: "namespace",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withPrefix",
      fieldType: "string",
      serializedName: "prefix",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withWrapped",
      fieldType: "boolean",
      serializedName: "wrapped",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAttribute",
      fieldType: "boolean",
      serializedName: "attribute",
    }),
    new FunctionTemplateBuilder({
      fnName: "withValue",
      fieldType: "string | unknown",
      serializedName: "value",
    }),
    new FunctionTemplateBuilder({
      fnName: "withFormat",
      fieldType: "string",
      serializedName: "format",
    }),
    new MapTemplateBuilder({
      fnName: "withMapping",
      fieldType: "Map<string,string>",
      serializedName: "mapping",
    }),
    new ExtensionClass({
      fnName: "withExtensions",
      fieldType: "Map<string, OpenApiSchema>",
      serializedName: "extensions",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMax",
      fieldType: "number",
      serializedName: "minLength",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMin",
      fieldType: "number",
      serializedName: "maxLength",
    }),
    new RegExpClass({
      fnName: "withPattern",
      fieldType: "RegExp",
      serializedName: "pattern",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinLength",
      fieldType: "number",
      serializedName: "minLength",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaxLength",
      fieldType: "number",
      serializedName: "maxLength",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withURL",
      fieldType: "string",
      serializedName: "url",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withPropertyName",
      fieldType: "string",
      serializedName: "propertyName",
    }),
    new OpenApiClass({
      fnName: "withExternalDocs",
      fieldType: "OpenApiDocumentation",
      serializedName: "externalDocs",
    }),
  ].forEach(fn => fn.write(MainProject));

  await MainProject.save();
}

main();
