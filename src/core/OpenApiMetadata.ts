import { deepFreeze } from "../lib/freeze";
import type {
  OpenApiExternalDocumentation,
  OpenApiJsonSchemaDialect,
  OpenApiVersion,
} from "../types/OpenApiTypes";
import type { OpenApiPath } from "./OpenApiPath";
import type { OpenApiSchema } from "./OpenApiSchema";
import type { OpenApiSecurity } from "./OpenApiSecurity";
import type { OpenApiServer } from "./OpenApiServer";
import type { OpenApiTag } from "./OpenApiTag";

class OpenApiLicense {}
class OpenApiContact {}

class OpenApiInfo {
  private readonly fn: (info: OpenApiInfo) => OpenApiMetadata;
  private readonly title: string;
  private readonly version: string;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly termsOfService?: string;
  private readonly contact?: OpenApiContact;
  private readonly license?: OpenApiLicense;

  public constructor(
    fn: (info: OpenApiInfo) => OpenApiMetadata,
    title: string,
    version: string,
    summary?: string,
    description?: string,
    termsOfService?: string,
    contact?: OpenApiContact,
    license?: OpenApiLicense,
  ) {
    this.fn = fn;
    this.title = title;
    this.version = version;
    this.summary = summary;
    this.description = description;
    this.termsOfService = termsOfService;
    this.contact = contact;
    this.license = license;
  }

  public addTermsOfService(service: string) {
    return new OpenApiInfo(
      this.fn,
      this.title,
      this.version,
      this.summary,
      this.description,
      service,
      this.contact,
      this.license,
    );
  }

  public addSummary(summary: string) {
    return new OpenApiInfo(
      this.fn,
      this.title,
      this.version,
      summary,
      this.description,
      this.termsOfService,
      this.contact,
      this.license,
    );
  }

  public addDescription(description: string) {
    return new OpenApiInfo(
      this.fn,
      this.title,
      this.version,
      this.summary,
      description,
      this.termsOfService,
      this.contact,
      this.license,
    );
  }

  public endInfo() {
    return this.fn(this);
  }
}

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
  private readonly servers?: OpenApiServer[];
  private readonly routes?: OpenApiPath[];
  private readonly webhooks?: Map<string, OpenApiPath>;
  private readonly components?: OpenApiSchema;
  private readonly security?: OpenApiSecurity[];
  private readonly tags?: OpenApiTag[];
  private readonly externalDocs?: OpenApiExternalDocumentation;

  public static create(version: OpenApiVersion) {
    const _fn = (info: OpenApiInfo) => {
      return new OpenApiMetadata(version, info);
    };
    return {
      beginInfo: {
        addTitle: (title: string) => {
          return {
            addVersion: (version: string) => {
              return new OpenApiInfo(_fn, title, version);
            },
          };
        },
      },
    };
  }

  private constructor(
    version: OpenApiVersion,
    info: OpenApiInfo,
    jsonSchemaDialect?: OpenApiJsonSchemaDialect,
    servers?: OpenApiServer[],
    routes?: OpenApiPath[],
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
    this.routes = routes;
    this.webhooks = webhooks;
    this.components = components;
    this.security = security;
    this.tags = tags;
    this.externalDocs = externalDocs;
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

  public addRoute(route: OpenApiPath) {
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

  public addWebhook(hookUrl: string, route: OpenApiPath) {
    if (!this.webhooks) {
      const map = new Map<string, OpenApiPath>();
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
