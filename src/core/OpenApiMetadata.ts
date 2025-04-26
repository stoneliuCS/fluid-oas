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

class OpenApiLicense {
  private readonly fn: (contact: OpenApiLicense) => OpenApiInfo;
  private readonly name: string;
  private readonly identifier?: string;
  private readonly url?: string;

  public constructor(
    fn: (contact: OpenApiLicense) => OpenApiInfo,
    name: string,
    identifier?: string,
    url?: string,
  ) {
    this.fn = fn;
    this.name = name;
    this.identifier = identifier;
    this.url = url;
    deepFreeze(this);
  }

  public toJSON() {
    const json = {};
    if (this.name) {
      Object.defineProperty(json, "name", { value: this.name });
    }

    if (this.identifier) {
      Object.defineProperty(json, "identifier", { value: this.identifier });
    }

    if (this.url) {
      Object.defineProperty(json, "url", { value: this.url });
    }
    return json;
  }

  public addIdentifier(identifier: string) {
    return new OpenApiLicense(this.fn, this.name, identifier, this.url);
  }

  public addUrl(url: string) {
    return new OpenApiLicense(this.fn, this.name, this.identifier, url);
  }

  public endLicense() {
    return this.fn(this);
  }
}

class OpenApiContact {
  private readonly fn: (contact: OpenApiContact) => OpenApiInfo;
  private readonly name?: string;
  private readonly url?: string;
  private readonly email?: string;

  public constructor(
    fn: (contact: OpenApiContact) => OpenApiInfo,
    name?: string,
    url?: string,
    email?: string,
  ) {
    this.fn = fn;
    this.name = name;
    this.url = url;
    this.email = email;
    deepFreeze(this);
  }

  public addName(name: string) {
    return new OpenApiContact(this.fn, name, this.url, this.email);
  }

  public addUrl(url: string) {
    return new OpenApiContact(this.fn, this.name, url, this.email);
  }

  public addEmail(email: string) {
    return new OpenApiContact(this.fn, this.name, this.url, email);
  }

  public toJSON() {
    const json = {};
    if (this.name) {
      Object.defineProperty(json, "name", { value: this.name });
    }

    if (this.url) {
      Object.defineProperty(json, "url", { value: this.url });
    }

    if (this.email) {
      Object.defineProperty(json, "email", { value: this.email });
    }
    return json;
  }

  public endContact() {
    return this.fn(this);
  }
}

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

  public toJSON() {
    const json = {};
    Object.defineProperty(json, "title", { value: this.title });
    if (this.summary) {
      Object.defineProperty(json, "summary", { value: this.summary });
    }
    if (this.description) {
      Object.defineProperty(json, "description", { value: this.description });
    }
    if (this.termsOfService) {
      Object.defineProperty(json, "termsOfService", {
        value: this.termsOfService,
      });
    }
    if (this.contact) {
      Object.defineProperty(json, "contact", {
        value: this.contact.toJSON(),
      });
    }
    if (this.license) {
      Object.defineProperty(json, "license", {
        value: this.license.toJSON(),
      });
    }
    Object.defineProperty(json, "version", { value: this.version });
    return json;
  }

  public addContact() {
    const _fn = (contact: OpenApiContact) => {
      return new OpenApiInfo(
        this.fn,
        this.title,
        this.version,
        this.summary,
        this.description,
        this.termsOfService,
        contact,
        this.license,
      );
    };
    return new OpenApiContact(_fn);
  }

  public addLicense(name: string) {
    const _fn = (license: OpenApiLicense) => {
      return new OpenApiInfo(
        this.fn,
        this.title,
        this.version,
        this.summary,
        this.description,
        this.termsOfService,
        this.contact,
        license,
      );
    };
    return new OpenApiLicense(_fn, name);
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

  /**
   * Converts this OpenApiMetadata into a JSON representation.
   * @returns
   */
  public toJSON() {
    const json = {};
    Object.defineProperty(json, "openapi", { value: this.version });
    Object.defineProperty(json, "info", { value: this.info.toJSON() });
    return json;
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
