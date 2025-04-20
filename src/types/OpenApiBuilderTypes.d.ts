export type OpenApiVersion = Readonly<"3.0.0" | "3.1.0" | "3.1.1">;

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
