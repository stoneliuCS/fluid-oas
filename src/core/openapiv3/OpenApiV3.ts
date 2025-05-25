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
import type {
  OpenApiDocumentation,
  OpenApiInfo,
  OpenApiPath,
  OpenApiPathItem,
  OpenApiSecurityRequirement,
  OpenApiServer,
  OpenApiTag,
} from "../common";
import { Base, type BaseInterface } from "../common/base";

const OpenApiBase = withExternalDocs(
  withTags(
    withSecurityArray(
      withWebhooks(
        withPaths(
          withServersArray(
            withJSONSchemaDialect(withInfo(withOpenApi(Base)))
          )<OpenApiServer>()
        )
      )
    )<OpenApiSecurityRequirement>()
  )<OpenApiTag>()
);

export interface OpenApi extends BaseInterface {
  addOpenApiVersion(version: string): this;
  addInfo(info: OpenApiInfo): this;
  addJsonSchemaDialect(jsonDialect: string): this;
  addServers(servers: OpenApiServer[]): this;
  addPaths(path: OpenApiPath): this;
  addWebhook(webhook: string, val: OpenApiPathItem): this;
  addSecurity(security: OpenApiSecurityRequirement[]): this;
  addTags(tags: OpenApiTag[]): this;
  addExternalDocs(docs: OpenApiDocumentation): this;
}

class _OpenApi extends OpenApiBase implements OpenApi {}

export function OpenApi(openapiVersion: string) {
  return {
    withInfo: (info: OpenApiInfo): OpenApi => {
      return new _OpenApi().addOpenApiVersion(openapiVersion).addInfo(info);
    },
  };
}
