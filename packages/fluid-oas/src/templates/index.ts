import { FunctionTemplateBuilder } from "./FunctionTemplate";
import { PrimitiveTemplateBuilder } from "./PrimitiveTemplate";
import { OpenAPIV3Project } from "./TemplateBuilder";
import { MapTemplateBuilder } from "./MapTemplate";
import { ArrayTemplateBuilder } from "./ArrayTemplate";
import { KeyNameClass, RegExpClass, UnionClass } from "./extensions";

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
      methodName: "addAllowReserved",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withDeprecated",
      fieldType: "boolean",
      serializedName: "deprecated",
      methodName: "addDeprecated",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequired",
      fieldType: "boolean",
      serializedName: "required",
      methodName: "addRequired",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNullable",
      fieldType: "boolean",
      serializedName: "nullable",
      methodName: "addNullable",
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
      methodName: "addWrapped",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAttribute",
      fieldType: "boolean",
      serializedName: "attribute",
      methodName: "addAttribute",
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
      methodName: "addMappings",
    }),
    new MapTemplateBuilder({
      fnName: "withExamples",
      fieldType: "Map<string, OpenApiExample>",
      serializedName: "examples",
      methodName: "addExamples",
    }),
    new MapTemplateBuilder({
      fnName: "withExtensions",
      fieldType: "Map<OpenApiExtensionString, OpenApiSchema>",
      serializedName: "extensions",
      methodName: "addExtensions",
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
      methodName: "addExclusiveMin",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExclusiveMaximum",
      fieldType: "number",
      serializedName: "exclusiveMaximum",
      methodName: "addExclusiveMax",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExclusiveMinimumBoolean",
      fieldType: "boolean",
      serializedName: "exclusiveMinimum",
      methodName: "addExclusiveMin",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExclusiveMaximumBoolean",
      fieldType: "boolean",
      serializedName: "exclusiveMaximum",
      methodName: "addExclusiveMax",
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
      methodName: "addScopes",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExternalDocs",
      fieldType: "OpenApiDocumentation",
      serializedName: "externalDocs",
      methodName: "addExternalDocs",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withImplicit",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "implicit",
      methodName: "addImplicit",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withPassword",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "password",
      methodName: "addPassword",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withClientCredentials",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "clientCredentials",
      methodName: "addClientCredentials",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAuthorizationCode",
      fieldType: "OpenApiOAuthFlow",
      serializedName: "authorizationCode",
      methodName: "addAuthorizationCode",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withSchema",
      fieldType: "OpenApiSchema",
      serializedName: "schema",
      methodName: "addSchema",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withFlows",
      fieldType: "OpenApiOAuthFlows",
      serializedName: "flows",
      methodName: "addFlows",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withExample",
      fieldType: "any",
      serializedName: "example",
      methodName: "addExample",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withItems",
      fieldType: "OpenApiSchema",
      serializedName: "items",
      methodName: "addItems",
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
    new MapTemplateBuilder({
      fnName: "withProperties",
      fieldType: "Map<string, OpenApiSchema>",
      serializedName: "properties",
      methodName: "addProperties",
    }),
    new MapTemplateBuilder({
      fnName: "withPatternProperties",
      fieldType: "Map<string, OpenApiSchema>",
      serializedName: "patternProperties",
      methodName: "addPatternProperties",
    }),
    new ArrayTemplateBuilder({
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
      methodName: "addExplode",
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
    new MapTemplateBuilder({
      fnName: "withHeaders",
      fieldType: "Map<string, OpenApiHeader>",
      serializedName: "headers",
      methodName: "addHeaders",
    }),
    new MapTemplateBuilder({
      fnName: "withContent",
      fieldType: "Map<OpenApiMediaContentType, OpenApiMediaType>",
      serializedName: "content",
      methodName: "addContents",
    }),
    new MapTemplateBuilder({
      fnName: "withEncoding",
      fieldType: "Map<string, OpenApiEncoding>",
      serializedName: "encoding",
      methodName: "addEncodings",
    }),
    new MapTemplateBuilder({
      fnName: "withCallback",
      fieldType: "Map<string, OpenApiPathItem>",
      serializedName: "callback",
      methodName: "addCallback",
    }),
    new MapTemplateBuilder({
      fnName: "withVariables",
      fieldType: "Map<string, OpenApiServerVariable>",
      serializedName: "variables",
      methodName: "addVariables",
    }),
    new MapTemplateBuilder({
      fnName: "withLinks",
      fieldType: "Map<string, OpenApiLink>",
      serializedName: "links",
      methodName: "addLinks",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withServer",
      fieldType: "OpenApiServer",
      serializedName: "server",
      methodName: "addServer",
    }),
    new MapTemplateBuilder({
      fnName: "withCallbacks",
      fieldType: "Map<string, OpenApiCallback>",
      serializedName: "callbacks",
      methodName: "addCallbacks",
    }),
    new MapTemplateBuilder({
      fnName: "withParametersPrimitive",
      fieldType: "Map<string, string>",
      serializedName: "parameters",
      methodName: "addParametersLiteral",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequestBodyPrimitive",
      fieldType: "string",
      serializedName: "requestBody",
      methodName: "addRequestBodyLiteral",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequestBody",
      fieldType: "OpenApiRequestBody",
      serializedName: "requestBody",
      methodName: "addRequestBody",
    }),
    new KeyNameClass({
      fnName: "withResponses",
      fieldType: "Map<OpenApiHTTPStatusCode, OpenApiResponse>",
      serializedName: "response",
      methodName: "addResponses",
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
      methodName: "addEndpoints",
    }),
    new ArrayTemplateBuilder({
      fnName: "withParametersArray",
      fieldType: "OpenApiParameter",
      serializedName: "parameters",
      methodName: "addParameters",
    }),
    new ArrayTemplateBuilder({
      fnName: "withSecurityArray",
      fieldType: "OpenApiSecurityRequirement",
      serializedName: "security",
      methodName: "addSecurity",
    }),
    new ArrayTemplateBuilder({
      fnName: "withServersArray",
      fieldType: "OpenApiServer",
      serializedName: "servers",
      methodName: "addServers",
    }),
    new UnionClass({
      fnName: "withUnionTypes",
      fieldType: "OpenApiSchema",
      serializedName: "type",
      methodName: "ofTypes",
    }),
    new ArrayTemplateBuilder({
      fnName: "withTags",
      fieldType: "T",
      serializedName: "tags",
      methodName: "addTags",
    }),
    new ArrayTemplateBuilder({
      fnName: "withRequiredEnumerable",
      fieldType: "T",
      serializedName: "required",
      methodName: "addRequired",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAdditionalProperties",
      fieldType: "OpenApiSchema",
      serializedName: "additionalProperties",
      methodName: "addAdditionalProperties",
    }),
    new KeyNameClass({
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
    new PrimitiveTemplateBuilder({
      fnName: "withInfo",
      fieldType: "OpenApiInfo",
      serializedName: "info",
      methodName: "addInfo",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withPaths",
      fieldType: "OpenApiPath",
      serializedName: "paths",
      methodName: "addPaths",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withContact",
      fieldType: "OpenApiContact",
      serializedName: "contact",
      methodName: "addContact",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withResponsesObject",
      fieldType: "OpenApiResponses",
      serializedName: "responses",
      methodName: "addResponses",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withLicense",
      fieldType: "OpenApiLicense",
      serializedName: "license",
      methodName: "addLicense",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withUnevaluatedProperties",
      fieldType: "boolean",
      serializedName: "unevaluatedProperties",
      methodName: "addUnevaluatedProperties",
    }),
    new MapTemplateBuilder({
      fnName: "withWebhooks",
      fieldType: "Map<string, OpenApiPathItem>",
      serializedName: "webhooks",
      methodName: "addWebhooks",
    }),
    new MapTemplateBuilder({
      fnName: "withPropertyNames",
      fieldType: "Map<string, string>",
      serializedName: "propertyNames",
      methodName: "addPropertyNames",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinProperties",
      fieldType: "number",
      serializedName: "minProperties",
      methodName: "addMinProperties",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaxProperties",
      fieldType: "number",
      serializedName: "maxProperties",
      methodName: "addMaxProperties",
    }),
    new ArrayTemplateBuilder({
      fnName: "withPrefixItems",
      fieldType: "OpenApiSchema",
      serializedName: "prefixItems",
      methodName: "addPrefixItems",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAdditionalItems",
      fieldType: "OpenApiSchema",
      serializedName: "additionalItems",
      methodName: "addAdditionalItems",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withReadOnly",
      fieldType: "boolean",
      serializedName: "readOnly",
      methodName: "addReadOnly",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withWriteOnly",
      fieldType: "boolean",
      serializedName: "writeOnly",
      methodName: "addWriteOnly",
    }),

    new MapTemplateBuilder({
      fnName: "withSchemasComponent",
      fieldType: "Map<string, OpenApiSchema>",
      serializedName: "schemas",
      methodName: "addSchemas",
    }),

    new MapTemplateBuilder({
      fnName: "withResponsesComponent",
      fieldType: "Map<string, OpenApiResponses>",
      serializedName: "responses",
      methodName: "addResponses",
    }),

    new MapTemplateBuilder({
      fnName: "withParametersComponent",
      fieldType: "Map<string, OpenApiParameter>",
      serializedName: "parameters",
      methodName: "addParameters",
    }),

    new MapTemplateBuilder({
      fnName: "withExamplesComponent",
      fieldType: "Map<string, OpenApiExample>",
      serializedName: "examples",
      methodName: "addExamples",
    }),

    new MapTemplateBuilder({
      fnName: "withRequestBodiesComponent",
      fieldType: "Map<string, OpenApiRequestBody>",
      serializedName: "requestBodies",
      methodName: "addRequestBodies",
    }),

    new MapTemplateBuilder({
      fnName: "withHeadersComponent",
      fieldType: "Map<string, OpenApiHeader>",
      serializedName: "headers",
      methodName: "addHeaders",
    }),

    new MapTemplateBuilder({
      fnName: "withSecuritySchemesComponent",
      fieldType: "Map<string, OpenApiSecurityScheme>",
      serializedName: "securitySchemes",
      methodName: "addSecuritySchemes",
    }),

    new MapTemplateBuilder({
      fnName: "withLinksComponent",
      fieldType: "Map<string, OpenApiLink>",
      serializedName: "links",
      methodName: "addLinks",
    }),

    new MapTemplateBuilder({
      fnName: "withCallbacksComponent",
      fieldType: "Map<string, OpenApiCallback>",
      serializedName: "callbacks",
      methodName: "addCallbacks",
    }),

    new MapTemplateBuilder({
      fnName: "withPathItemsComponent",
      fieldType: "Map<string, OpenApiPathItem>",
      serializedName: "pathItems",
      methodName: "addPathItems",
    }),

    new PrimitiveTemplateBuilder({
      fnName: "withComponents",
      fieldType: "OpenApiComponent",
      serializedName: "components",
      methodName: "addComponents",
    }),
  ].forEach(fn => fn.write(OpenAPIV3Project));

  await OpenAPIV3Project.save();
}

main();
