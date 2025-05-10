import {
  Base,
  withDiscriminator,
  withExternalDocs,
  withXML,
} from "../common/common";

class _OpenApiSchema extends Base {}

export const OpenApiSchemaClass = withExternalDocs(
  withDiscriminator(withXML(_OpenApiSchema)),
);

export const OpenApiSchema = new OpenApiSchemaClass();
export type OpenApiSchema = typeof OpenApiSchema
