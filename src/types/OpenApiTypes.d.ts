import type { OpenApiSchema } from "../core/OpenApiSchema";

export type OpenApiVersion = Readonly<"3.0.0" | "3.1.0" | "3.1.1">;

export type OpenApiEncoding = Readonly<{}>;

export type OpenApiHeader = Readonly<{
  description?: string;
  schema?: OpenApiSchema;
}>;

export type OpenApiRequestBody = Readonly<{}>;

export type OpenApiCallback = Readonly<{}>;

export type OpenApiParameterInType = Readonly<
  "query" | "header" | "path" | "cookie"
>;

export type OpenApiOperation = Readonly<
  "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
>;

export type OpenApiContentType = Readonly<
  | "application/json"
  | "application/xml"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
>;

export type OpenApiStatusCode = Readonly<
  "200" | "201" | "204" | "400" | "401" | "403" | "404" | "500"
>;

export type OpenApiSchemaType = Readonly<
  | "boolean"
  | "object"
  | "array"
  | "number"
  | "string"
  | "integer"
  | "any"
  | "oneOf"
  | "allOf"
  | "anyOf"
  | "not"
>;

export type OpenApiDocumentation = Readonly<{
  description?: string;
  url: string;
}>;

export type OpenApiJsonSchemaDialect = Readonly<string>;
