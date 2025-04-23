import type { OpenApiSchema } from "../core/OpenApiSchema";

export type OpenApiVersion = Readonly<"3.0.0" | "3.1.0" | "3.1.1">;

export type OpenApiEncoding = Readonly<{}>;

export type OpenApiHeader = Readonly<{
  description? : string
  schema? : OpenApiSchema
}>;

export type OpenApiRequestBody = Readonly<{}>;

export type OpenApiCallback = Readonly<{}>;

export type OpenApiParameter = Readonly<{
  name: string;
  in: "query" | "header" | "path" | "cookie";
  description?: string;
  required?: boolean;
  deprecated?: string;
}>;

export type OpenApiOperation = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export enum OpenApiContentType {
  JSON = "application/json",
  XML = "application/xml",
  FORM = "application/x-www-form-urlencoded",
  MULTIPART = "multipart/form-data",
}

export type OpenApiStatusCode =
  | "200"
  | "201"
  | "204"
  | "400"
  | "401"
  | "403"
  | "404"
  | "500";
export enum OpenApiSchemaType {
  STRING = "string",
  NUMBER = "number",
  INTEGER = "integer",
  BOOLEAN = "boolean",
  ARRAY = "array",
  OBJECT = "object",
}

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
