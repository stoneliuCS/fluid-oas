import { BadPathError, PropertyNotFound } from "../lib/error";
import { deepFreeze } from "../lib/freeze";
import { validatePath } from "../lib/url";
import {
  type OpenApiCallback,
  type OpenApiContentType,
  type OpenApiEncoding,
  type OpenApiExternalDocumentation,
  type OpenApiHeader,
  type OpenApiOperation,
  type OpenApiParameter,
  type OpenApiRequestBody,
  type OpenApiServer,
  type OpenApiStatusCode,
  type OpenApiTag,
} from "../types/OpenApiTypes";
import type { OpenApiSchema } from "./OpenApiSchema";
import type { OpenApiSecurity } from "./OpenApiSecurity";

// Internal Types

type OpenApiExample = Readonly<{}>;

class OpenApiParameterBuilder<T extends OpenApiRoute | OpenApiRouteBuilder> {
  private readonly name: string;
  private readonly in: OpenApiParameter;
  private readonly fn: (builder: OpenApiParameterBuilder<T>) => T;
  private readonly description?: string;
  private readonly required?: boolean;
  private readonly deprecated?: boolean;
  private readonly style?: string;
  private readonly explode?: string;
  private readonly allowReserved?: boolean;
  private readonly schema?: OpenApiSchema;
  private readonly example?: unknown;
  private readonly examples?: Map<string, OpenApiExample>;
  private readonly content?: Map<OpenApiContentType, OpenApiMediaBuilder>;

  public constructor(
    name: string,
    _in: OpenApiParameter,
    fn: (builder: OpenApiParameterBuilder<T>) => T,
    description?: string,
    required?: boolean,
    deprecated?: boolean,
    style?: string,
    explode?: string,
    allowReserved?: boolean,
    schema?: OpenApiSchema,
    example?: unknown,
    examples?: Map<string, OpenApiExample>,
    content?: Map<OpenApiContentType, OpenApiMediaBuilder>,
  ) {
    this.name = name;
    this.in = _in;
    this.fn = fn;
    if (description) {
      this.description = description;
    }
    if (required) {
      this.required = required;
    }
    if (deprecated) {
      this.deprecated = deprecated;
    }
    if (style) {
      this.style = style;
    }
    if (explode) {
      this.explode = explode;
    }
    if (allowReserved) {
      this.allowReserved = allowReserved;
    }
    if (schema) {
      this.schema = schema;
    }
    if (example) {
      this.example = example;
    }
    if (examples) {
      this.examples = examples;
    }
    if (content) {
      this.content = content;
    }
    deepFreeze(this);
  }

  public endParameter(): T {
    return this.fn(this);
  }
}

/**
 * Builds the Media object for an OpenApi operation.
 */
class OpenApiMediaBuilder {
  private readonly fn: (builder: OpenApiMediaBuilder) => OpenApiResponseBuilder;
  private readonly schema?: OpenApiSchema;
  private readonly example?: unknown;
  private readonly examples?: Map<string, OpenApiExample>;
  private readonly encoding?: Map<string, OpenApiEncoding>;

  public constructor(
    fn: (builder: OpenApiMediaBuilder) => OpenApiResponseBuilder,
    schema?: OpenApiSchema,
    example?: unknown,
    examples?: Map<string, OpenApiExample>,
    encoding?: Map<string, OpenApiEncoding>,
  ) {
    this.fn = fn;
    if (schema) {
      this.schema = schema;
    }
    if (example) {
      this.example = example;
    }
    if (examples) {
      this.examples = examples;
    }
    if (encoding) {
      this.encoding = encoding;
    }
    deepFreeze(this);
  }

  public addSchema(schema: OpenApiSchema) {
    return new OpenApiMediaBuilder(
      this.fn,
      schema,
      this.example,
      this.examples,
      this.encoding,
    );
  }

  public addSingularExample(example: unknown) {
    return new OpenApiMediaBuilder(
      this.fn,
      this.schema,
      example,
      this.examples,
      this.encoding,
    );
  }

  public addExample(name: string) {
    return {
      addExampleObject: (example: OpenApiExample) => {
        if (!this.examples) {
          const newExamples: Map<string, OpenApiExample> = new Map();
          newExamples.set(name, example);
          return new OpenApiMediaBuilder(
            this.fn,
            this.schema,
            this.example,
            newExamples,
            this.encoding,
          );
        }
        const examplesCopy = new Map(this.examples);
        examplesCopy.set(name, example);
        return new OpenApiMediaBuilder(
          this.fn,
          this.schema,
          this.example,
          examplesCopy,
          this.encoding,
        );
      },
    };
  }

  public addEncoding(name: string) {
    return {
      addEncoding: (encoding: OpenApiEncoding) => {
        if (!this.encoding) {
          const newEncodings: Map<string, OpenApiEncoding> = new Map();
          newEncodings.set(name, encoding);
          return new OpenApiMediaBuilder(
            this.fn,
            this.schema,
            this.example,
            this.examples,
            newEncodings,
          );
        }
        const encodingCopy = new Map(this.encoding);
        encodingCopy.set(name, encoding);
        return new OpenApiMediaBuilder(
          this.fn,
          this.schema,
          this.example,
          this.examples,
          encodingCopy,
        );
      },
    };
  }

  public endResponse() {
    return this.fn(this).endResponse();
  }
}

class OpenApiResponseBuilder {
  private readonly fn: (builder: OpenApiResponseBuilder) => OpenApiRouteBuilder;
  private readonly description: string;
  private readonly headers?: Map<string, OpenApiHeader>;
  private readonly content?: Map<OpenApiContentType, OpenApiMediaBuilder>;

  public constructor(
    fn: (builder: OpenApiResponseBuilder) => OpenApiRouteBuilder,
    description: string,
    headers?: Map<string, OpenApiHeader>,
    content?: Map<OpenApiContentType, OpenApiMediaBuilder>,
  ) {
    this.fn = fn;
    this.description = description;
    if (headers) {
      this.headers = headers;
    }
    if (content) {
      this.content = content;
    }
    deepFreeze(this);
  }

  public addHeader(name: string) {
    return {
      addHeaderObject: (header: OpenApiHeader) => {
        let headers: Map<string, OpenApiHeader>;
        if (!this.headers) {
          const newHeaders: Map<string, OpenApiHeader> = new Map();
          newHeaders.set(name, header);
          headers = newHeaders;
        } else {
          const headersCopy = new Map(this.headers);
          headersCopy.set(name, header);
          headers = headersCopy;
        }
        return new OpenApiResponseBuilder(
          this.fn,
          this.description,
          headers,
          this.content,
        );
      },
    };
  }

  public addContent(contentType: OpenApiContentType) {
    const _fn = (builder: OpenApiMediaBuilder) => {
      let content: Map<OpenApiContentType, OpenApiMediaBuilder>;
      if (!this.content) {
        content = new Map();
        content.set(contentType, builder);
      } else {
        const contentCopy = new Map(this.content);
        contentCopy.set(contentType, builder);
        content = contentCopy;
      }
      return new OpenApiResponseBuilder(
        this.fn,
        this.description,
        this.headers,
        content,
      );
    };
    return new OpenApiMediaBuilder(_fn);
  }

  public endResponse(): OpenApiRouteBuilder {
    return this.fn(this);
  }
}

/**
 * Represents a single API operation on a path.
 *
 * See: https://swagger.io/specification/
 */
class OpenApiRouteBuilder {
  private readonly fn: (routeBuilder: OpenApiRouteBuilder) => OpenApiRoute;
  private readonly tags?: OpenApiTag[];
  private readonly summary?: string;
  private readonly description?: string;
  private readonly externalDocs?: OpenApiExternalDocumentation;
  private readonly operationId?: string;
  private readonly parameters?: Set<
    OpenApiParameterBuilder<OpenApiRouteBuilder>
  >;
  private readonly requestBody?: OpenApiRequestBody;
  private readonly responses?: Map<OpenApiStatusCode, OpenApiResponseBuilder>;
  private readonly callBacks?: Map<string, OpenApiCallback>;
  private readonly deprecated?: boolean;
  private readonly security?: OpenApiSecurity[];
  private readonly servers?: OpenApiServer[];

  public constructor(
    fn: (routeBuilder: OpenApiRouteBuilder) => OpenApiRoute,
    tags?: OpenApiTag[],
    summary?: string,
    description?: string,
    externalDocs?: OpenApiExternalDocumentation,
    operationId?: string,
    parameters?: Set<OpenApiParameterBuilder<OpenApiRouteBuilder>>,
    requestBody?: OpenApiRequestBody,
    responses?: Map<OpenApiStatusCode, OpenApiResponseBuilder>,
    callBacks?: Map<string, OpenApiCallback>,
    deprecated?: boolean,
    security?: OpenApiSecurity[],
    servers?: OpenApiServer[],
  ) {
    this.fn = fn;
    if (tags) {
      this.tags = tags;
    }
    if (summary) {
      this.summary = summary;
    }
    if (description) {
      this.description = description;
    }
    if (externalDocs) {
      this.externalDocs = externalDocs;
    }
    if (operationId) {
      this.operationId = operationId;
    }
    if (parameters) {
      this.parameters = parameters;
    }
    if (requestBody) {
      this.requestBody = requestBody;
    }
    if (responses) {
      this.responses = responses;
    }
    if (callBacks) {
      this.callBacks = callBacks;
    }
    if (deprecated) {
      this.deprecated = deprecated;
    }
    if (security) {
      this.security = security;
    }
    if (servers) {
      this.servers = servers;
    }
    deepFreeze(this);
  }

  public addParameter(name: string) {
    const builderFn = (
      parameterBuilder: OpenApiParameterBuilder<OpenApiRouteBuilder>,
    ) => {
      let parameters: Set<OpenApiParameterBuilder<OpenApiRouteBuilder>>;
      if (!this.parameters) {
        const newParameters: Set<OpenApiParameterBuilder<OpenApiRouteBuilder>> =
          new Set();
        newParameters.add(parameterBuilder);
        parameters = newParameters;
      } else {
        const parametersCopy = new Set(this.parameters);
        parametersCopy.add(parameterBuilder);
        parameters = parametersCopy;
      }
      return new OpenApiRouteBuilder(
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
      addIn: (_in: OpenApiParameter) => {
        return new OpenApiParameterBuilder<OpenApiRouteBuilder>(
          name,
          _in,
          builderFn,
        );
      },
    };
  }

  /**
   * Adds a response to this OpenApiRouteBuilder
   * @param statusCode -- The HTTP status code.
   * @returns An object with a single method, addsDescription to continue building the response.
   */
  public addResponse(statusCode: OpenApiStatusCode) {
    const _fn = (responseBuilder: OpenApiResponseBuilder) => {
      let responses: Map<OpenApiStatusCode, OpenApiResponseBuilder>;
      if (!this.responses) {
        responses = new Map();
        responses.set(statusCode, responseBuilder);
      } else {
        const responsesCopy = new Map(this.responses);
        responsesCopy.set(statusCode, responseBuilder);
        responses = responsesCopy;
      }
      return new OpenApiRouteBuilder(
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
        return new OpenApiResponseBuilder(_fn, description);
      },
    };
  }

  public endOperation(): OpenApiRoute {
    return this.fn(this);
  }
}

export class OpenApiRoute {
  private readonly uri: string;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly operations?: Map<OpenApiOperation, OpenApiRouteBuilder>;
  private readonly servers?: Set<OpenApiServer>;
  private readonly parameters?: Set<OpenApiParameterBuilder<OpenApiRoute>>;

  public static create(uri: string) {
    return new OpenApiRoute(uri);
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
    operations?: Map<OpenApiOperation, OpenApiRouteBuilder>,
    servers?: Set<OpenApiServer>,
    parameters?: Set<OpenApiParameterBuilder<OpenApiRoute>>,
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

  public addParameter(name: string) {
    const builderFn = (
      parameterBuilder: OpenApiParameterBuilder<OpenApiRoute>,
    ) => {
      let parameters: Set<OpenApiParameterBuilder<OpenApiRoute>>;
      if (!this.parameters) {
        const newParameters: Set<OpenApiParameterBuilder<OpenApiRoute>> =
          new Set();
        newParameters.add(parameterBuilder);
        parameters = newParameters;
      } else {
        const parametersCopy = new Set(this.parameters);
        parametersCopy.add(parameterBuilder);
        parameters = parametersCopy;
      }
      return new OpenApiRoute(
        this.uri,
        this.summary,
        this.description,
        this.operations,
        this.servers,
        parameters,
      );
    };
    return {
      addIn: (_in: OpenApiParameter) => {
        return new OpenApiParameterBuilder<OpenApiRoute>(name, _in, builderFn);
      },
    };
  }

  /**
   * Adds a server url, overriding any upstream servers defined in the root metadata.
   * @param server - A Server route that applies to all routes for this operation.
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
    return new OpenApiRoute(
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
   * @param description - Description for this OpenApiRoute
   * @returns A new OpenApiRoute with the provided description.
   */
  public addDescription(description: string) {
    return new OpenApiRoute(
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
   * @param summary - Summary for this OpenApiRoute
   * @returns A new OpenApiRoute with the provided summary.
   */
  public addSummary(summary: string) {
    return new OpenApiRoute(
      this.uri,
      summary,
      this.description,
      this.operations,
      this.servers,
      this.parameters,
    );
  }

  public addOperation(op: OpenApiOperation) {
    const _fn = (builder: OpenApiRouteBuilder) => {
      let operations: Map<OpenApiOperation, OpenApiRouteBuilder>;
      if (!this.operations) {
        operations = new Map();
        operations.set(op, builder);
      } else {
        const operationsCopy = new Map(this.operations);
        operationsCopy.set(op, builder);
        operations = operationsCopy;
      }
      return new OpenApiRoute(
        this.uri,
        this.summary,
        this.description,
        operations,
        this.servers,
        this.parameters,
      );
    };
    return new OpenApiRouteBuilder(_fn);
  }
}
