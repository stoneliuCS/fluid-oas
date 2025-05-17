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
      writer.writeLine("return json;");
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
      writer.writeLine("return json;");
    });
  }
};

const ExtensionClass = class extends MapTemplateBuilder {
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer
      .write(`${this.serializedName}(name : ${this.parseField().key})`)
      .block(() => {
        writer.write(`return`).block(() => {
          writer
            .write(`with : (val : ${this.parseField().val}) => `)
            .block(() => {
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
      writer.writeLine("return json;");
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
    new FunctionTemplateBuilder({
      fnName: "withDefault",
      fieldType: "T",
      serializedName: "default",
    }),
    new FunctionTemplateBuilder({
      fnName: "withType",
      fieldType: `"apiKey" | "http" | "mutualTLS" | "oauth2" |"openIdConnect"`,
      serializedName: "type",
    }),
    new FunctionTemplateBuilder({
      fnName: "withIn",
      fieldType: `"query" | "header" | "cookie"`,
      serializedName: "in",
    }),
    new MapTemplateBuilder({
      fnName: "withMapping",
      fieldType: "Map<string,string>",
      serializedName: "mapping",
    }),
    new ExtensionClass({
      fnName: "withExtensions",
      fieldType: "Map<OpenApiExtensionString, OpenApiSchema>",
      serializedName: "extensions",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaximum",
      fieldType: "number",
      serializedName: "minimum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinimum",
      fieldType: "number",
      serializedName: "maximum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExclusiveMinimum",
      fieldType: "boolean",
      serializedName: "exclusiveMinimum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExclusiveMaximum",
      fieldType: "boolean",
      serializedName: "exclusiveMaximum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMultipleOf",
      fieldType: "number",
      serializedName: "multipleOf",
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
    new PrimitiveTemplateBuilder({
      fnName: "withScheme",
      fieldType: "string",
      serializedName: "scheme",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withBearerFormat",
      fieldType: "string",
      serializedName: "bearerFormat",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAuthorizationURL",
      fieldType: "string",
      serializedName: "authorizationUrl",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withTokenURL",
      fieldType: "string",
      serializedName: "tokenUrl",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRefreshURL",
      fieldType: "string",
      serializedName: "refreshUrl",
    }),
    new MapTemplateBuilder({
      fnName: "withScopes",
      fieldType: "Map<string,string>",
      serializedName: "scopes",
    }),
    new OpenApiClass({
      fnName: "withExternalDocs",
      fieldType: "Documentation",
      serializedName: "externalDocs",
    }),
    new OpenApiClass({
      fnName: "withImplicit",
      fieldType: "OAuthFlow",
      serializedName: "implicit",
    }),
    new OpenApiClass({
      fnName: "withPassword",
      fieldType: "OAuthFlow",
      serializedName: "password",
    }),
    new OpenApiClass({
      fnName: "withClientCredentials",
      fieldType: "OAuthFlow",
      serializedName: "clientCredentials",
    }),
    new OpenApiClass({
      fnName: "withAuthorizationCode",
      fieldType: "OAuthFlow",
      serializedName: "authorizationCode",
    }),
    new OpenApiClass({
      fnName: "withFlows",
      fieldType: "OAuthFlows",
      serializedName: "flows",
    }),
    new OpenApiClass({
      fnName: "withExample",
      fieldType: "Example",
      serializedName: "example",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withOpenIdConnectURL",
      fieldType: "string",
      serializedName: "openIdConnectUrl",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExternalValue",
      fieldType: "string",
      serializedName: "externalValue",
    }),
  ].forEach(fn => fn.write(MainProject));

  await MainProject.save();
}

main();
