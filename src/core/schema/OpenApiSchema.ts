import {
  Base,
  withDiscriminator,
  withExternalDocs,
  withXML,
} from "../common/common";

class _OpenApiSchema extends Base {}

const OpenApiSchemaImpl = withExternalDocs(
  withDiscriminator(withXML(_OpenApiSchema)),
);

export const OpenApiSchema = OpenApiSchemaImpl
