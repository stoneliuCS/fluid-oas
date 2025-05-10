import {
  Base,
  withDiscriminator,
  withExternalDocs,
  withXML,
} from "../common/common";

class _OpenApiSchema extends Base {}

export const OpenApiSchema = withExternalDocs(
  withDiscriminator(withXML(_OpenApiSchema)),
);

const OpenApiSchemaImpl = new OpenApiSchema();
export type OpenApiSchema = typeof OpenApiSchemaImpl;
