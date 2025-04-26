import type { OpenApiSchema } from "../core/OpenApiSchema";

export type OpenApiVersion = Readonly<"3.0.0" | "3.1.0" | "3.1.1">;

export type OpenApiEncoding = Readonly<{}>;

export type OpenApiHeader = Readonly<{
  description?: string;
  schema?: OpenApiSchema;
}>;

export type OpenApiRequestBody = Readonly<{}>;

export type OpenApiCallback = Readonly<{}>;

export type OpenApiParameter = Readonly<"query" | "header" | "path" | "cookie">;

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
  "string" | "number" | "integer" | "boolean" | "array" | "object"
>;

export type OpenApiInfo = Readonly<{
  title: string;
  version: string;
  summary?: string;
  description?: string;
  termsOfService?: string;
  contact?: OpenApiInfoContact;
  license?: OpenApiInfoLicense;
}>;

export type OpenApiTag = Readonly<{
  name: string;
  description?: string;
  externalDocs?: OpenApiExternalDocumentation;
}>;

export type OpenApiExternalDocumentation = Readonly<{
  description?: string;
  url: string;
}>;

export type OpenApiJsonSchemaDialect = Readonly<string>;
export type OpenApiServer = Readonly<{
  url: string;
  description?: string;
  variables?: Map<string, OpenApiServerVariable>;
}>;

type OpenApiServerVariable = Readonly<{
  enum?: string[];
  default: string;
  description?: string;
}>;

type OpenApiInfoContact = Readonly<{
  name: string;
  url: string;
  email: string;
}>;

type OpenApiInfoLicense = Readonly<{
  name: string;
  identifier?: string;
  url?: string;
}>;
