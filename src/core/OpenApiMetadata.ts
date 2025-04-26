import { PropertyNotFoundError } from "../lib/error";
import { deepFreeze } from "../lib/freeze";
import type {
  OpenApiExternalDocumentation,
  OpenApiJsonSchemaDialect,
  OpenApiVersion,
} from "../types/OpenApiTypes";
import type { OpenApiInfo } from "./OpenApiInfo";
import type { OpenApiPath } from "./OpenApiPath";
import type { OpenApiSchema } from "./OpenApiSchema";
import type { OpenApiSecurity } from "./OpenApiSecurity";
import type { OpenApiServer } from "./OpenApiServer";
import type { OpenApiTag } from "./OpenApiTag";

/**
 * The OpenAPI metadata class holds the entire root construction of the OpenAPI specification
 *
 * Its fields are deeply immutable, and are safe to access without mutability. All methods
 * related to the OpenApiMetadata class will construct new OpenApiMetadata classes.
 */
export class OpenApiMetadata {
  private readonly version: OpenApiVersion;
  private readonly info: OpenApiInfo;
  private readonly jsonSchemaDialect?: OpenApiJsonSchemaDialect;
  private readonly servers?: Set<OpenApiServer>;
  private readonly paths?: Set<OpenApiPath>;
  private readonly webhooks?: Map<string, OpenApiPath>;
  private readonly components?: OpenApiSchema;
  private readonly security?: OpenApiSecurity[];
  private readonly tags?: OpenApiTag[];
  private readonly externalDocs?: OpenApiExternalDocumentation;

  public static create(version: OpenApiVersion, info: OpenApiInfo) {
    return new OpenApiMetadata(version, info);
  }

  /**
   * Converts this OpenApiMetadata into a JSON representation.
   * @returns
   */
  public getJSON() {
    const json = {};
    Object.defineProperty(json, "openapi", { value: this.version });
    Object.defineProperty(json, "info", { value: this.info.getJSON() });
    if (this.jsonSchemaDialect) {
      Object.defineProperty(json, "jsonSchemaDialect", {
        value: this.jsonSchemaDialect,
      });
    }
    if (this.servers) {
      Object.defineProperty(json, "servers", {
        value: this.serializeServerJsons(),
      });
    }
    if (this.paths) {
      Object.defineProperty(json, "paths", this.serializePathJsons());
    }
    return json;
  }

  private serializePathJsons() {
    const pathJson = {}
    if (!this.paths)
      throw new PropertyNotFoundError(
        "Cannot invoke a serialization on this paths.",
      );
    for (const path of this.paths) {
      Object.assign(pathJson, path)
    }
    return pathJson;
  }

  private serializeServerJsons() {
    const serverJsons = [];
    if (!this.servers)
      throw new PropertyNotFoundError(
        "Cannot invoke a serialization on this servers.",
      );
    for (const server of this.servers) {
      const serverJson = server.getJSON();
      serverJsons.push(serverJson);
    }
    return serverJsons;
  }

  private constructor(
    version: OpenApiVersion,
    info: OpenApiInfo,
    jsonSchemaDialect?: OpenApiJsonSchemaDialect,
    servers?: Set<OpenApiServer>,
    paths?: Set<OpenApiPath>,
    webhooks?: Map<string, OpenApiPath>,
    components?: OpenApiSchema,
    security?: OpenApiSecurity[],
    tags?: OpenApiTag[],
    externalDocs?: OpenApiExternalDocumentation,
  ) {
    // Sets all properties.
    this.version = version;
    this.info = info;
    this.jsonSchemaDialect = jsonSchemaDialect;
    this.servers = servers;
    this.paths = paths;
    this.webhooks = webhooks;
    this.components = components;
    this.security = security;
    this.tags = tags;
    this.externalDocs = externalDocs;
    deepFreeze(this);
  }

  /**
   * From this OpenApiMetadata, create an OpenApiSpecification.
   *
   * NOTE: It is recommended that the OpenAPIBuilder calls this method.
   */
  public toOpenApiSpecification(): void {
    throw new Error("Unimplemented.");
  }

  /**
   * From this OpenApiMetadata, adds that OpenApiVersion specification and
   * computes the new OpenApiMetadata version.
   */
  public addVersion(version: OpenApiVersion) {
    return new OpenApiMetadata(
      version,
      this.info,
      this.jsonSchemaDialect,
      this.servers,
      this.paths,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addInfo(info: OpenApiInfo) {
    return new OpenApiMetadata(
      this.version,
      info,
      this.jsonSchemaDialect,
      this.servers,
      this.paths,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addJsonSchemaDialect(jsonSchemaDialect: OpenApiJsonSchemaDialect) {
    return new OpenApiMetadata(
      this.version,
      this.info,
      jsonSchemaDialect,
      this.servers,
      this.paths,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addServer(server: OpenApiServer) {
    let servers: Set<OpenApiServer>;
    if (!this.servers) {
      servers = new Set();
      servers.add(server);
    } else {
      const serversCopy = new Set(this.servers);
      serversCopy.add(server);
      servers = serversCopy;
    }
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      servers,
      this.paths,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addPath(path: OpenApiPath) {
    let paths: Set<OpenApiPath>;
    if (!this.paths) {
      paths = new Set();
      paths.add(path);
    } else {
      const pathsCopy = new Set(this.paths);
      pathsCopy.add(path);
      paths = pathsCopy;
    }
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      this.servers,
      paths,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addWebhook(hookUrl: string, route: OpenApiPath) {
    if (!this.webhooks) {
      const map = new Map<string, OpenApiPath>();
      map.set(hookUrl, route);
      return new OpenApiMetadata(
        this.version,
        this.info,
        this.jsonSchemaDialect,
        this.servers,
        this.paths,
        map,
        this.components,
        this.security,
        this.tags,
        this.externalDocs,
      );
    }
    const mapCopy = new Map(this.webhooks);
    mapCopy.set(hookUrl, route);
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      this.servers,
      this.paths,
      mapCopy,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addComponent(component: OpenApiSchema) {
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      this.servers,
      this.paths,
      this.webhooks,
      component,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addTag(tag: OpenApiTag) {
    if (!this.tags) {
      return new OpenApiMetadata(
        this.version,
        this.info,
        this.jsonSchemaDialect,
        this.servers,
        this.paths,
        this.webhooks,
        this.components,
        this.security,
        [tag],
        this.externalDocs,
      );
    }
    const tagsCopy = [...this.tags];
    tagsCopy.push(tag);
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      this.servers,
      this.paths,
      this.webhooks,
      this.components,
      this.security,
      tagsCopy,
      this.externalDocs,
    );
  }

  public addExternalDocumentation(externalDocs: OpenApiExternalDocumentation) {
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      this.servers,
      this.paths,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      externalDocs,
    );
  }
}
