import { deepFreeze } from "../lib/freeze";
import type {
  OpenApiExternalDocumentation,
  OpenApiInfo,
  OpenApiJsonSchemaDialect,
  OpenApiServer,
  OpenApiTag,
  OpenApiVersion,
} from "../types/OpenApiTypes";
import type { OpenApiRoute } from "./OpenApiRoute";
import type { OpenApiSchema } from "./OpenApiSchema";
import type { OpenApiSecurity } from "./OpenApiSecurity";

/**
 * The OpenAPI metadata class holds the entire root construction of the OpenAPI specification
 *
 * Its fields are deeply immutable, and are safe to access without mutability. All methods
 * related to the OpenApiMetadata class will construct new OpenApiMetadata classes.
 */
export class OpenApiMetadata {
  private readonly version?: OpenApiVersion;
  private readonly info?: OpenApiInfo;
  private readonly jsonSchemaDialect?: OpenApiJsonSchemaDialect;
  private readonly servers?: OpenApiServer[];
  private readonly routes?: OpenApiRoute[];
  private readonly webhooks?: Map<string, OpenApiRoute>;
  private readonly components?: OpenApiSchema;
  private readonly security?: OpenApiSecurity[];
  private readonly tags?: OpenApiTag[];
  private readonly externalDocs?: OpenApiExternalDocumentation;

  public static create() {
    return new OpenApiMetadata();
  }

  private constructor(
    version?: OpenApiVersion,
    info?: OpenApiInfo,
    jsonSchemaDialect?: OpenApiJsonSchemaDialect,
    servers?: OpenApiServer[],
    routes?: OpenApiRoute[],
    webhooks?: Map<string, OpenApiRoute>,
    components?: OpenApiSchema,
    security?: OpenApiSecurity[],
    tags?: OpenApiTag[],
    externalDocs?: OpenApiExternalDocumentation,
  ) {
    // Sets all properties.
    if (version) {
      this.version = version;
    }
    if (info) {
      this.info = info;
    }
    if (jsonSchemaDialect) {
      this.jsonSchemaDialect = jsonSchemaDialect;
    }
    if (servers) {
      this.servers = servers;
    }
    if (routes) {
      this.routes = routes;
    }
    if (webhooks) {
      this.webhooks = webhooks;
    }
    if (components) {
      this.components = components;
    }
    if (security) {
      this.security = security;
    }
    if (tags) {
      this.tags = tags;
    }
    if (externalDocs) {
      this.externalDocs = externalDocs;
    }
    // Freezes everything inside this class to prevent mutability.
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
      this.routes,
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
      this.routes,
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
      this.routes,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addServer(server: OpenApiServer) {
    if (!this.servers) {
      return new OpenApiMetadata(
        this.version,
        this.info,
        this.jsonSchemaDialect,
        [server],
        this.routes,
        this.webhooks,
        this.components,
        this.security,
        this.tags,
        this.externalDocs,
      );
    }
    const serversCopy = [...this.servers];
    serversCopy.push(server);
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      serversCopy,
      this.routes,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addRoute(route: OpenApiRoute) {
    if (!this.routes) {
      return new OpenApiMetadata(
        this.version,
        this.info,
        this.jsonSchemaDialect,
        this.servers,
        [route],
        this.webhooks,
        this.components,
        this.security,
        this.tags,
        this.externalDocs,
      );
    }
    const routesCopy = [...this.routes];
    routesCopy.push(route);
    return new OpenApiMetadata(
      this.version,
      this.info,
      this.jsonSchemaDialect,
      this.servers,
      routesCopy,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      this.externalDocs,
    );
  }

  public addWebhook(hookUrl: string, route: OpenApiRoute) {
    if (!this.webhooks) {
      const map = new Map<string, OpenApiRoute>();
      map.set(hookUrl, route);
      return new OpenApiMetadata(
        this.version,
        this.info,
        this.jsonSchemaDialect,
        this.servers,
        this.routes,
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
      this.routes,
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
      this.routes,
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
        this.routes,
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
      this.routes,
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
      this.routes,
      this.webhooks,
      this.components,
      this.security,
      this.tags,
      externalDocs,
    );
  }
}
