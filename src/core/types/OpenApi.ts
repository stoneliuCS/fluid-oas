import type { OpenApiDocumentation } from "../common/OpenApiDocumentation";
import type { OpenApiXML } from "../common/OpenApiXML";

export interface OpenApiSpecificationProperty<T> {
  toJSON(): unknown;
  extend(name: string, schema: OpenApiSchema): T;
}

export interface OpenApiSchema
  extends OpenApiSpecificationProperty<OpenApiSchema> {
  toJSON(): unknown;
  extend(name: string, schema: OpenApiSchema): OpenApiSchema;
  xml(xml: OpenApiXML): OpenApiSchema;
  externalDocs(externalDocs: OpenApiDocumentation): OpenApiSchema;
  nullable(): OpenApiSchema;
}
