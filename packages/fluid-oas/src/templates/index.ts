import { CodeBlockWriter } from "ts-morph";
import { FunctionTemplateBuilder } from "./FunctionTemplate";
import { PrimitiveTemplateBuilder } from "./PrimitiveTemplate";
import { MainProject } from "./TemplateBuilder";
import { MapTemplateBuilder } from "./MapTemplate";
import { ArrayTemplateBuilder } from "./ArrayTemplate";
import { FunctionBuilder } from "./FunctionBuilder";

const SecurityRequirementClass = class extends MapTemplateBuilder {
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer
      .write(
        `${this.methodName}(name : ${this.parseField().key}, val : ${this.parseField().val})`
      )
      .block(() => {
        writer.writeLine("const copy : this = Object.create(this);");
        writer.writeLine(
          `copy._${this.serializedName} = new Map(this._${this.serializedName});`
        );
        writer.writeLine(`copy._${this.serializedName}.set(name, val);`);
        writer.writeLine("return copy;");
      });
  }
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer
        .write(`if (this._${this.serializedName} !== undefined)`)
        .block(() => {
          writer.writeLine(
            `this._${this.serializedName}.forEach((val, key) => {
              Object.defineProperty(json, key, { value : val, enumerable : true })
            }) `
          );
        });
      writer.writeLine("return json;");
    });
  }
};

const Enumerable = class extends ArrayTemplateBuilder {
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer
      .write(`${this.methodName}(val : ${FunctionBuilder.genericName}[])`)
      .block(() => {
        writer.writeLine("const copy: this = Object.create(this);");
        writer.writeLine(`copy._${this.serializedName} = val`);
        writer.writeLine("return copy;");
      });
  }
};

const KeyNameClass = class extends MapTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `this._${this.serializedName}.forEach((val, key) => { Object.defineProperty(json, key, { value : val.toJSON(), enumerable : true }) })`
        );
      });
      writer.writeLine("return json;");
    });
  }
};

const ObjectProperty = class extends MapTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine("const mappings : any = {};");
        writer.writeLine(
          `this._${this.serializedName}.forEach((val, key) => { mappings[key] = val.toJSON() })`
        );
        writer.writeLine(
          `Object.defineProperty(json, "properties", { value : mappings, enumerable : true })`
        );
      });
      writer.writeLine("return json;");
    });
  }
};

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

const OpenApiMapClass = class extends MapTemplateBuilder {
  protected buildBuilderMethod(writer: CodeBlockWriter): void {
    writer
      .write(
        `${this.methodName}(name : ${this.parseField().key}, val : ${this.parseField().val})`
      )
      .block(() => {
        writer.writeLine("const copy : this = Object.create(this);");
        writer.writeLine(
          `copy._${this.serializedName} = new Map(this._${this.serializedName});`
        );
        writer.writeLine(`copy._${this.serializedName}.set(name, val);`);
        writer.writeLine("return copy;");
      });
  }
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine("const mappings : any = {};");
        writer.writeLine(
          `this._${this.serializedName}.forEach((val, key) => { mappings[key] = val.toJSON() })`
        );
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : mappings, enumerable : true })`
        );
      });
      writer.writeLine("return json;");
    });
  }
};

const OpenApiArrayClass = class extends ArrayTemplateBuilder {
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer
        .write(`if (this._${this.serializedName} !== undefined)`)
        .block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.map(val => val.toJSON()), enumerable : true })`
          );
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
      methodName: "addDescription",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withSummary",
      fieldType: "string",
      serializedName: "summary",
      methodName: "addSummary",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAllowReserved",
      fieldType: "boolean",
      serializedName: "allowReserved",
      methodName: "allowReserved",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withDeprecated",
      fieldType: "boolean",
      serializedName: "deprecated",
      methodName: "deprecated",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequired",
      fieldType: "boolean",
      serializedName: "required",
      methodName: "required",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNullable",
      fieldType: "boolean",
      serializedName: "nullable",
      methodName: "nullable",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withName",
      fieldType: "string",
      serializedName: "name",
      methodName: "addName",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNamespace",
      fieldType: "string",
      serializedName: "namespace",
      methodName: "addNamespace",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withPrefix",
      fieldType: "string",
      serializedName: "prefix",
      methodName: "addPrefix",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withWrapped",
      fieldType: "boolean",
      serializedName: "wrapped",
      methodName: "wrapped",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAttribute",
      fieldType: "boolean",
      serializedName: "attribute",
      methodName: "attribute",
    }),
    new FunctionTemplateBuilder({
      fnName: "withValue",
      fieldType: "string | unknown",
      serializedName: "value",
      methodName: "addValue",
    }),
    new FunctionTemplateBuilder({
      fnName: "withFormat",
      fieldType: "string",
      serializedName: "format",
      methodName: "addFormat",
    }),
    new FunctionTemplateBuilder({
      fnName: "withDefault",
      fieldType: "T",
      serializedName: "default",
      methodName: "addDefault",
    }),
    new FunctionTemplateBuilder({
      fnName: "withType",
      fieldType: `"apiKey" | "http" | "mutualTLS" | "oauth2" |"openIdConnect"`,
      serializedName: "type",
      methodName: "addType",
    }),
    new FunctionTemplateBuilder({
      fnName: "withIn",
      fieldType: `T`,
      serializedName: "in",
      methodName: "addIn",
    }),
    new MapTemplateBuilder({
      fnName: "withMapping",
      fieldType: "Map<string,string>",
      serializedName: "mapping",
      methodName: "addMap",
    }),
    new OpenApiMapClass({
      fnName: "withExamples",
      fieldType: "Map<string, OpenApiExample>",
      serializedName: "examples",
      methodName: "addExample",
    }),
    new OpenApiMapClass({
      fnName: "withExtensions",
      fieldType: "Map<OpenApiExtensionString, OpenApiSchema>",
      serializedName: "extensions",
      methodName: "addExtension",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaximum",
      fieldType: "number",
      serializedName: "maximum",
      methodName: "addMaximum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinimum",
      fieldType: "number",
      serializedName: "minimum",
      methodName: "addMinimum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExclusiveMinimum",
      fieldType: "number",
      serializedName: "exclusiveMinimum",
      methodName: "exclusiveMin",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExclusiveMaximum",
      fieldType: "number",
      serializedName: "exclusiveMaximum",
      methodName: "exclusiveMax",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMultipleOf",
      fieldType: "number",
      serializedName: "multipleOf",
      methodName: "addMultiple",
    }),
    new RegExpClass({
      fnName: "withPattern",
      fieldType: "RegExp",
      serializedName: "pattern",
      methodName: "addPattern",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinLength",
      fieldType: "number",
      serializedName: "minLength",
      methodName: "addMinLength",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaxLength",
      fieldType: "number",
      serializedName: "maxLength",
      methodName: "addMaxLength",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withURL",
      fieldType: "string",
      serializedName: "url",
      methodName: "addUrl",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withPropertyName",
      fieldType: "string",
      serializedName: "propertyName",
      methodName: "addPropertyName",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withScheme",
      fieldType: "string",
      serializedName: "scheme",
      methodName: "addScheme",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withBearerFormat",
      fieldType: "string",
      serializedName: "bearerFormat",
      methodName: "addBearerFormat",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAuthorizationURL",
      fieldType: "string",
      serializedName: "authorizationUrl",
      methodName: "addAuthorizationUrl",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withTokenURL",
      fieldType: "string",
      serializedName: "tokenUrl",
      methodName: "addTokenUrl",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRefreshURL",
      fieldType: "string",
      serializedName: "refreshUrl",
      methodName: "addRefreshUrl",
    }),
    new MapTemplateBuilder({
      fnName: "withScopes",
      fieldType: "Map<string,string>",
      serializedName: "scopes",
      methodName: "addScope",
    }),
    new OpenApiClass({
      fnName: "withExternalDocs",
      fieldType: "OpenApiDocumentation",
      serializedName: "externalDocs",
      methodName: "addExternalDocs",
    }),
    new OpenApiClass({
      fnName: "withImplicit",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "implicit",
      methodName: "addImplicit",
    }),
    new OpenApiClass({
      fnName: "withPassword",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "password",
      methodName: "addPassword",
    }),
    new OpenApiClass({
      fnName: "withClientCredentials",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "clientCredentials",
      methodName: "addClientCredentials",
    }),
    new OpenApiClass({
      fnName: "withAuthorizationCode",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "authorizationCode",
      methodName: "addAuthorizationCode",
    }),
    new OpenApiClass({
      fnName: "withSchema",
      fieldType: "OpenApiSchema",
      serializedName: "schema",
      methodName: "addSchema",
    }),
    new OpenApiClass({
      fnName: "withFlows",
      fieldType: "OpenApiOAuthFlows",
      serializedName: "flows",
      methodName: "addFlows",
    }),
    new OpenApiClass({
      fnName: "withExample",
      fieldType: "OpenApiExample",
      serializedName: "example",
      methodName: "addExample",
    }),
    new OpenApiClass({
      fnName: "withItems",
      fieldType: "OpenApiSchema",
      serializedName: "items",
      methodName: "addItemTypes",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withOpenIdConnectURL",
      fieldType: "string",
      serializedName: "openIdConnectUrl",
      methodName: "addOpenIdConnectUrl",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExternalValue",
      fieldType: "string",
      serializedName: "externalValue",
      methodName: "addExternalValue",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withTitle",
      fieldType: "string",
      serializedName: "title",
      methodName: "addTitle",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withVersion",
      fieldType: "string",
      serializedName: "version",
      methodName: "addVersion",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinItems",
      fieldType: "number",
      serializedName: "minItems",
      methodName: "addMinItems",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaxItems",
      fieldType: "number",
      serializedName: "maxItems",
      methodName: "addMaxItems",
    }),
    new ObjectProperty({
      fnName: "withProperty",
      fieldType: "Map<string, OpenApiSchema>",
      serializedName: "property",
      methodName: "addProperty",
    }),
    new Enumerable({
      fnName: "withEnum",
      fieldType: "T",
      serializedName: "enum",
      methodName: "addEnums",
    }),
    new FunctionTemplateBuilder({
      fnName: "withStyle",
      fieldType: `string`,
      serializedName: "style",
      methodName: "addStyle",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExplode",
      fieldType: "boolean",
      serializedName: "explode",
      methodName: "explode",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withContentType",
      fieldType: "string",
      serializedName: "contentType",
      methodName: "addContentType",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withOperationRef",
      fieldType: "string",
      serializedName: "operationRef",
      methodName: "addOperationRef",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withOperationId",
      fieldType: "string",
      serializedName: "operationId",
      methodName: "addOperationId",
    }),
    new OpenApiMapClass({
      fnName: "withHeaders",
      fieldType: "Map<string, OpenApiHeader>",
      serializedName: "headers",
      methodName: "addHeader",
    }),
    new OpenApiMapClass({
      fnName: "withContent",
      fieldType: "Map<OpenApiMediaContentType, OpenApiMediaType>",
      serializedName: "content",
      methodName: "addContent",
    }),
    new OpenApiMapClass({
      fnName: "withEncoding",
      fieldType: "Map<string, OpenApiEncoding>",
      serializedName: "encoding",
      methodName: "addEncoding",
    }),
    new OpenApiMapClass({
      fnName: "withCallback",
      fieldType: "Map<string, OpenApiPathItem>",
      serializedName: "callback",
      methodName: "addCallback",
    }),
    new OpenApiMapClass({
      fnName: "withVariables",
      fieldType: "Map<string, OpenApiServerVariable>",
      serializedName: "variables",
      methodName: "addVariable",
    }),
    new OpenApiMapClass({
      fnName: "withLinks",
      fieldType: "Map<string, OpenApiLink>",
      serializedName: "links",
      methodName: "addLink",
    }),
    new OpenApiClass({
      fnName: "withServer",
      fieldType: "OpenApiServer",
      serializedName: "server",
      methodName: "addServer",
    }),
    new OpenApiMapClass({
      fnName: "withCallbacks",
      fieldType: "Map<string, OpenApiCallback>",
      serializedName: "callbacks",
      methodName: "addCallback",
    }),
    new MapTemplateBuilder({
      fnName: "withParametersPrimitive",
      fieldType: "Map<string, string>",
      serializedName: "parameters",
      methodName: "addParameterLiteral",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequestBodyPrimitive",
      fieldType: "string",
      serializedName: "requestBody",
      methodName: "addRequestBodyLiteral",
    }),
    new OpenApiClass({
      fnName: "withRequestBody",
      fieldType: "OpenApiRequestBody",
      serializedName: "requestBody",
      methodName: "addRequestBody",
    }),
    new KeyNameClass({
      fnName: "withResponses",
      fieldType: "Map<OpenApiHTTPStatusCode, OpenApiResponse>",
      serializedName: "response",
      methodName: "addResponse",
    }),
    new KeyNameClass({
      fnName: "withMethods",
      fieldType: "Map<OpenApiHTTPMethod, OpenApiOperation>",
      serializedName: "method",
      methodName: "addMethod",
    }),
    new KeyNameClass({
      fnName: "withPath",
      fieldType: "Map<string, OpenApiPathItem>",
      serializedName: "endpoint",
      methodName: "addEndpoint",
    }),
    new OpenApiArrayClass({
      fnName: "withParametersArray",
      fieldType: "OpenApiParameter",
      serializedName: "parameters",
      methodName: "addParameters",
    }),
    new OpenApiArrayClass({
      fnName: "withSecurityArray",
      fieldType: "OpenApiSecurityRequirement",
      serializedName: "security",
      methodName: "addSecurity",
    }),
    new OpenApiArrayClass({
      fnName: "withServersArray",
      fieldType: "OpenApiServer",
      serializedName: "servers",
      methodName: "addServers",
    }),
    new Enumerable({
      fnName: "withTags",
      fieldType: "T",
      serializedName: "tags",
      methodName: "addTags",
    }),
    new Enumerable({
      fnName: "withRequiredEnumerable",
      fieldType: "T",
      serializedName: "required",
      methodName: "addRequired",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAdditionalProperties",
      fieldType: "boolean",
      serializedName: "additionalProperties",
      methodName: "additionalProperties",
    }),
    new SecurityRequirementClass({
      fnName: "withSecurityRequirement",
      fieldType: "Map<string, string[]>",
      serializedName: "field",
      methodName: "addSecurityRequirement",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withOpenApi",
      fieldType: "string",
      serializedName: "openapi",
      methodName: "addOpenApiVersion",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withTermsOfService",
      fieldType: "string",
      serializedName: "termsOfService",
      methodName: "addTermsOfService",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withJSONSchemaDialect",
      fieldType: "string",
      serializedName: "jsonSchemaDialect",
      methodName: "addJsonSchemaDialect",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withEmail",
      fieldType: "string",
      serializedName: "email",
      methodName: "addEmail",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withIdentifier",
      fieldType: "string",
      serializedName: "identifier",
      methodName: "addIdentifier",
    }),
    new OpenApiClass({
      fnName: "withInfo",
      fieldType: "OpenApiInfo",
      serializedName: "info",
      methodName: "addInfo",
    }),
    new OpenApiClass({
      fnName: "withPaths",
      fieldType: "OpenApiPath",
      serializedName: "paths",
      methodName: "addPaths",
    }),
    new OpenApiClass({
      fnName: "withContact",
      fieldType: "OpenApiContact",
      serializedName: "contact",
      methodName: "addContact",
    }),
    new OpenApiClass({
      fnName: "withResponsesObject",
      fieldType: "OpenApiResponses",
      serializedName: "responses",
      methodName: "addResponses",
    }),
    new OpenApiClass({
      fnName: "withLicense",
      fieldType: "OpenApiLicense",
      serializedName: "license",
      methodName: "addLicense",
    }),
    new OpenApiMapClass({
      fnName: "withWebhooks",
      fieldType: "Map<string, OpenApiPathItem>",
      serializedName: "webhooks",
      methodName: "addWebhook",
    }),
  ].forEach(fn => fn.write(MainProject));

  await MainProject.save();
}

main();
