import {
  withExternalDocs,
  withInfo,
  withJSONSchemaDialect,
  withOpenApi,
  withPaths,
  withSecurityArray,
  withServersArray,
  withTags,
  withWebhooks,
} from "../../common/common";
import type { OpenApiInfo, OpenApiTag } from "../common";
import { Base } from "../common/base";

const OpenApiBase = withExternalDocs(
  withTags(
    withSecurityArray(
      withWebhooks(
        withPaths(
          withServersArray(withJSONSchemaDialect(withInfo(withOpenApi(Base))))()
        )
      )
    )()
  )<OpenApiTag>()
);

class _OpenApi extends OpenApiBase {}

export function OpenApi(openapiVersion: string) {
  return {
    withInfo: (info: OpenApiInfo) => {
      return new _OpenApi().addOpenApiVersion(openapiVersion).addInfo(info);
    },
  };
}
