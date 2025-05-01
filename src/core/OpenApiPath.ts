import { BadPathError } from "../lib/error";
import { deepFreeze } from "../lib/freeze";
import { validatePath } from "../lib/url";
import {
  type OpenApiCallback,
  type OpenApiContentType,
  type OpenApiExternalDocumentation,
  type OpenApiOperation,
  type OpenApiParameterInType,
  type OpenApiRequestBody,
  type OpenApiStatusCode,
} from "../types/OpenApiTypes";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiMedia } from "./OpenApiMedia";
import { OpenApiParameter } from "./OpenApiParameter";
import type { OpenApiResponse } from "./OpenApiResponse";
import type { OpenApiSchema } from "./OpenApiSchema";
import type { OpenApiSecurity } from "./OpenApiSecurity";
import type { OpenApiServer } from "./OpenApiServer";
import type { OpenApiTag } from "./OpenApiTag";

type OpenApiParameterFunc = OpenApiParameter | string;

class OpenApiParameterWrapper<T> extends OpenApiParameter {
  private readonly supplier: (parameter: OpenApiParameter) => T;
  public constructor(
    name: string,
    supplier: (parameter: OpenApiParameter) => T,
    _in: OpenApiParameterInType,
    description?: string,
    required?: boolean,
    deprecated?: boolean,
    style?: string,
    explode?: string,
    allowReserved?: boolean,
    schema?: OpenApiSchema,
    example?: unknown,
    examples?: Map<string, OpenApiExample>,
    content?: Map<OpenApiContentType, OpenApiMedia>,
  ) {
    super(
      name,
      _in,
      description,
      required,
      deprecated,
      style,
      explode,
      allowReserved,
      schema,
      example,
      examples,
      content,
    );
    this.supplier = supplier;
  }

  public addAllowReserved(allowReserved: boolean) {
    return new OpenApiParameterWrapper(
      this.name,
      this.supplier,
      this.in,
      this.description,
      this.required,
      this.deprecated,
      this.style,
      this.explode,
      allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public addExplode(explode: string) {
    return new OpenApiParameterWrapper(
      this.name,
      this.supplier,
      this.in,
      this.description,
      this.required,
      this.deprecated,
      this.style,
      explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public addStyle(style: string) {
    return new OpenApiParameterWrapper(
      this.name,
      this.supplier,
      this.in,
      this.description,
      this.required,
      this.deprecated,
      style,
      this.explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public addDeprecated(deprecated: boolean) {
    return new OpenApiParameterWrapper(
      this.name,
      this.supplier,
      this.in,
      this.description,
      this.required,
      deprecated,
      this.style,
      this.explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public addRequired(required: boolean): OpenApiParameterWrapper<T> {
    return new OpenApiParameterWrapper(
      this.name,
      this.supplier,
      this.in,
      this.description,
      required,
      this.deprecated,
      this.style,
      this.explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public addDescription(description: string): OpenApiParameterWrapper<T> {
    return new OpenApiParameterWrapper(
      this.name,
      this.supplier,
      this.in,
      description,
      this.required,
      this.deprecated,
      this.style,
      this.explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public endParameter() {
    return this.supplier(this);
  }
}

/**
 * Represents a single API operation on a path.
 *
 * See: https://swagger.io/specification/
 */
class OpenApiPathBuilder {
  private readonly fn: (routeBuilder: OpenApiPathBuilder) => OpenApiPath;
  private readonly tags?: OpenApiTag[];
  private readonly summary?: string;
  private readonly description?: string;
  private readonly externalDocs?: OpenApiExternalDocumentation;
  private readonly operationId?: string;
  private readonly parameters?: Set<OpenApiParameter>;
  private readonly requestBody?: OpenApiRequestBody;
  private readonly responses?: Map<OpenApiStatusCode, OpenApiResponse>;
  private readonly callBacks?: Map<string, OpenApiCallback>;
  private readonly deprecated?: boolean;
  private readonly security?: OpenApiSecurity[];
  private readonly servers?: OpenApiServer[];

  public constructor(
    fn: (routeBuilder: OpenApiPathBuilder) => OpenApiPath,
    tags?: OpenApiTag[],
    summary?: string,
    description?: string,
    externalDocs?: OpenApiExternalDocumentation,
    operationId?: string,
    parameters?: Set<OpenApiParameter>,
    requestBody?: OpenApiRequestBody,
    responses?: Map<OpenApiStatusCode, OpenApiResponse>,
    callBacks?: Map<string, OpenApiCallback>,
    deprecated?: boolean,
    security?: OpenApiSecurity[],
    servers?: OpenApiServer[],
  ) {
    this.fn = fn;
    this.tags = tags;
    this.summary = summary;
    this.description = description;
    this.externalDocs = externalDocs;
    this.operationId = operationId;
    this.parameters = parameters;
    this.requestBody = requestBody;
    this.responses = responses;
    this.callBacks = callBacks;
    this.deprecated = deprecated;
    this.security = security;
    this.servers = servers;
    deepFreeze(this);
  }

  public addParameter(name: string): {
    addIn: (
      _in: OpenApiParameterInType,
    ) => OpenApiParameterWrapper<OpenApiPathBuilder>;
  };
  public addParameter(parameter: OpenApiParameter): OpenApiPathBuilder;
  public addParameter(type: OpenApiParameterFunc) {
    if (typeof type === "string") {
      const builderFn = (parameterBuilder: OpenApiParameter) => {
        let parameters: Set<OpenApiParameter>;
        if (!this.parameters) {
          const newParameters: Set<OpenApiParameter> = new Set();
          newParameters.add(parameterBuilder);
          parameters = newParameters;
        } else {
          const parametersCopy = new Set(this.parameters);
          parametersCopy.add(parameterBuilder);
          parameters = parametersCopy;
        }
        return new OpenApiPathBuilder(
          this.fn,
          this.tags,
          this.summary,
          this.description,
          this.externalDocs,
          this.operationId,
          parameters,
          this.requestBody,
          this.responses,
          this.callBacks,
          this.deprecated,
          this.security,
          this.servers,
        );
      };
      return {
        addIn: (_in: OpenApiParameterInType) => {
          return new OpenApiParameterWrapper<OpenApiPathBuilder>(
            type,
            builderFn,
            _in,
          );
        },
      };
    } else {
      let parameters: Set<OpenApiParameter>;
      if (!this.parameters) {
        const newParameters: Set<OpenApiParameter> = new Set();
        newParameters.add(type);
        parameters = newParameters;
      } else {
        const parametersCopy = new Set(this.parameters);
        parametersCopy.add(type);
        parameters = parametersCopy;
      }
      return new OpenApiPathBuilder(
        this.fn,
        this.tags,
        this.summary,
        this.description,
        this.externalDocs,
        this.operationId,
        parameters,
        this.requestBody,
        this.responses,
        this.callBacks,
        this.deprecated,
        this.security,
        this.servers,
      );
    }
  }

  /**
   * Adds a response to this OpenApiPathBuilder
   * @param statusCode -- The HTTP status code.
   * @returns An object with a single method, addsDescription to continue building the response.
   */
  public addResponse(statusCode: OpenApiStatusCode) {
    const _fn = (responseBuilder: OpenApiResponse) => {
      let responses: Map<OpenApiStatusCode, OpenApiResponse>;
      if (!this.responses) {
        responses = new Map();
        responses.set(statusCode, responseBuilder);
      } else {
        const responsesCopy = new Map(this.responses);
        responsesCopy.set(statusCode, responseBuilder);
        responses = responsesCopy;
      }
      return new OpenApiPathBuilder(
        this.fn,
        this.tags,
        this.summary,
        this.description,
        this.externalDocs,
        this.operationId,
        this.parameters,
        this.requestBody,
        responses,
        this.callBacks,
        this.deprecated,
        this.security,
        this.servers,
      );
    };
    return {
      addDescription: (description: string) => {
        return null as any; // FIX
      },
    };
  }

  public endOperation(): OpenApiPath {
    return this.fn(this);
  }
}

export class OpenApiPath {
  private readonly uri: string;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly operations?: Map<OpenApiOperation, OpenApiPathBuilder>;
  private readonly servers?: Set<OpenApiServer>;
  private readonly parameters?: Set<OpenApiParameter>;

  public static create(uri: string) {
    return new OpenApiPath(uri);
  }

  /**
   * @param uri - Uri of the route, must be a string of the form: /foo/bar or can allow parameters such as /foo/{id}
   * @param summary - An optional summary
   * @param description - An optional description
   */
  private constructor(
    uri: string,
    summary?: string,
    description?: string,
    operations?: Map<OpenApiOperation, OpenApiPathBuilder>,
    servers?: Set<OpenApiServer>,
    parameters?: Set<OpenApiParameter>,
  ) {
    if (!validatePath(uri)) {
      throw new BadPathError(`Uri is of invalid form: ${uri}`);
    }
    this.uri = uri;
    if (summary) {
      this.summary = summary;
    }
    if (description) {
      this.description = description;
    }
    if (operations) {
      this.operations = operations;
    }
    if (servers) {
      this.servers;
    }
    if (parameters) {
      this.parameters = parameters;
    }
    deepFreeze(this);
  }

  public addParameter(name: string): {
    addIn: (
      _in: OpenApiParameterInType,
    ) => OpenApiParameterWrapper<OpenApiPath>;
  };
  public addParameter(parameter: OpenApiParameter): OpenApiPath;
  public addParameter(type: OpenApiParameterFunc) {
    if (typeof type === "string") {
      const builderFn = (parameterBuilder: OpenApiParameter) => {
        let parameters: Set<OpenApiParameter>;
        if (!this.parameters) {
          const newParameters: Set<OpenApiParameter> = new Set();
          newParameters.add(parameterBuilder);
          parameters = newParameters;
        } else {
          const parametersCopy = new Set(this.parameters);
          parametersCopy.add(parameterBuilder);
          parameters = parametersCopy;
        }
        return new OpenApiPath(
          this.uri,
          this.summary,
          this.description,
          this.operations,
          this.servers,
          parameters,
        );
      };
      return {
        addIn: (_in: OpenApiParameterInType) => {
          return new OpenApiParameterWrapper(type, builderFn, _in);
        },
      };
    } else {
      let parameters: Set<OpenApiParameter>;
      if (!this.parameters) {
        const newParameters: Set<OpenApiParameter> = new Set();
        newParameters.add(type);
        parameters = newParameters;
      } else {
        const parametersCopy = new Set(this.parameters);
        parametersCopy.add(type);
        parameters = parametersCopy;
      }
      return new OpenApiPath(
        this.uri,
        this.summary,
        this.description,
        this.operations,
        this.servers,
        parameters,
      );
    }
  }

  /**
   * Adds a server url, overriding any upstream servers defined in the root metadata.
   * @param server - A Server route that applies to all paths for this operation.
   * @returns A new OpenAPiRoute with the specified servers.
   */
  public addServer(server: OpenApiServer) {
    let servers: Set<OpenApiServer>;
    if (!this.servers) {
      const newServers: Set<OpenApiServer> = new Set();
      newServers.add(server);
      servers = newServers;
    } else {
      const serverCopy = new Set(this.servers);
      serverCopy.add(server);
      servers = serverCopy;
    }
    return new OpenApiPath(
      this.uri,
      this.summary,
      this.description,
      this.operations,
      servers,
      this.parameters,
    );
  }

  /**
   * Adds a description to this route.
   * @param description - Description for this OpenApiPath
   * @returns A new OpenApiPath with the provided description.
   */
  public addDescription(description: string) {
    return new OpenApiPath(
      this.uri,
      this.summary,
      description,
      this.operations,
      this.servers,
      this.parameters,
    );
  }

  /**
   * Adds a summary attached to this route.
   * @param summary - Summary for this OpenApiPath
   * @returns A new OpenApiPath with the provided summary.
   */
  public addSummary(summary: string) {
    return new OpenApiPath(
      this.uri,
      summary,
      this.description,
      this.operations,
      this.servers,
      this.parameters,
    );
  }

  public addOperation(op: OpenApiOperation) {
    const _fn = (builder: OpenApiPathBuilder) => {
      let operations: Map<OpenApiOperation, OpenApiPathBuilder>;
      if (!this.operations) {
        operations = new Map();
        operations.set(op, builder);
      } else {
        const operationsCopy = new Map(this.operations);
        operationsCopy.set(op, builder);
        operations = operationsCopy;
      }
      return new OpenApiPath(
        this.uri,
        this.summary,
        this.description,
        operations,
        this.servers,
        this.parameters,
      );
    };
    return new OpenApiPathBuilder(_fn);
  }

  /**
   * Gets additional metadata related to this Path, including all used
   * schemas which can be passed up in context to the OpenApiMetadata object.
   *
   **/
  public getComponentMetadata() {}

  public getJSON() {
    return {};
  }
}
