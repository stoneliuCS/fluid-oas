import {
  withExternalDocs,
  withTags,
  withSecurityArray,
  withWebhooks,
  withPaths,
  withServersArray,
  withJSONSchemaDialect,
  withInfo,
  withOpenApi,
} from "./common";
import type {
  OpenApiServer,
  OpenApiSecurityRequirement,
  OpenApiTag,
  OpenApiInfo,
  OpenApiPath,
  OpenApiPathItem,
  OpenApiDocumentation,
} from "./lib";
import { Base, type BaseInterface } from "./lib/base";
import * as fs from "fs";

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
export interface OpenApiV3_1 extends BaseInterface {
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
   */
  addWebhooks(mappings: { [K in string]: OpenApiPathItem }): this;

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
   * Writes the OpenAPI specification synchronously to a file or outputs it.
   *
   * @param filePath - Optional file path where the specification should be written
   */
  writeOASSync(filePath?: string): void;

  /**
   * Writes the OpenAPI specification asynchronously to a file or outputs it.
   *
   * @param filePath - Optional file path where the specification should be written
   */
  writeOASASync(filePath?: string): void;
}

class _OpenApi extends OpenApiBase implements OpenApiV3_1 {
  writeOASASync(filePath?: string): void {
    const json = JSON.stringify(this, undefined, 2);
    if (!filePath) {
      console.log(json);
    } else {
      fs.writeFile(filePath, json, {}, err => {
        if (err) {
          console.error("Error writing file.", err.message);
        }
      });
    }
  }
  writeOASSync(filePath?: string): void {
    const json = JSON.stringify(this, undefined, 2);
    if (!filePath) {
      console.log(json);
    } else {
      fs.writeFileSync(filePath, json);
    }
  }
}

/**
 * Build a OpenAPI 3.1.0 compliant doc
 * @param info - Info Object, is required to build an OpenAPI Specification
 * @returns OpenAPIV3_1
 */
export function OpenApiV3_1_0(info: OpenApiInfo): OpenApiV3_1 {
  return new _OpenApi().addOpenApiVersion("3.1.0").addInfo(info);
}

/**
 * Build a OpenAPI 3.1.1 compliant doc
 * @param info - Info Object, is required to build an OpenAPI Specification
 * @returns OpenAPIV3_1
 */
export function OpenApiV3_1_1(info: OpenApiInfo): OpenApiV3_1 {
  return new _OpenApi().addOpenApiVersion("3.1.1").addInfo(info);
}
