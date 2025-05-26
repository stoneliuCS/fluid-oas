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

/**
 * Root OpenAPI Object. Allows for method chaining to build a single
 * API Specification.
 */
export interface OpenApi extends BaseInterface {
  /**
   * Adds the current version of the OpenAPI Specification.
   *
   * @param version - The OpenAPI specification version (e.g., "3.1.0")
   */
  addOpenApiVersion(version: string): this;

  /**
   * Adds metadata about the API.
   *
   * @param info - Object containing API metadata including title, version, description, etc.
   */
  addInfo(info: OpenApiInfo): this;

  /**
   * Adds the JSON Schema dialect used for the API specification.
   *
   * @param jsonDialect - URI of the JSON Schema dialect (e.g., "https://json-schema.org/draft/2020-12/schema")
   */
  addJsonSchemaDialect(jsonDialect: string): this;

  /**
   * Adds an array of server objects which provide connectivity information to target servers.
   *
   * @param servers - Array of server objects containing URL and optional description/variables
   */
  addServers(servers: OpenApiServer[]): this;

  /**
   * Adds the available paths and operations for the API.
   *
   * @param path - Object containing path definitions with their operations (GET, POST, etc.)
   */
  addPaths(path: OpenApiPath): this;

  /**
   * Adds a webhook to the API specification.
   *
   * @param webhook - The webhook name/identifier
   * @param val - Path item object defining the webhook operations
   */
  addWebhook(webhook: string, val: OpenApiPathItem): this;

  /**
   * Adds security requirements that apply to the entire API.
   *
   * @param security - Array of security requirement objects
   */
  addSecurity(security: OpenApiSecurityRequirement[]): this;

  /**
   * Adds metadata tags for grouping operations.
   *
   * @param tags - Array of tag objects containing name and optional description
   */
  addTags(tags: OpenApiTag[]): this;

  /**
   * Adds external documentation reference.
   *
   * @param docs - External documentation object with URL and optional description
   */
  addExternalDocs(docs: OpenApiDocumentation): this;

  /**
   * Writes the OpenAPI specification to a file or outputs it.
   *
   * @param filePath - Optional file path where the specification should be written
   */
  writeOAS(filePath?: string): void;
}

class _OpenApi extends OpenApiBase implements OpenApi {
  writeOAS(filePath?: string): void {
    const json = JSON.stringify(this, undefined, 2);
    if (!filePath) {
      console.log(json);
    }
  }
}

export function OpenApiV311(info: OpenApiInfo): OpenApi {
  return new _OpenApi().addOpenApiVersion("3.1.1").addInfo(info);
}
