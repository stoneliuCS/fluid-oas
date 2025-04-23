import { BadPathError } from "../lib/error";
import { deepFreeze } from "../lib/freeze";
import { validatePath } from "../lib/url";
import {
  OpenApiContentType,
  type OpenApiCallback,
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

type OpenApiResponseContext = Readonly<{
  routeBuilderCtx: OpenApiRouteBuilderContext;
  contentType: OpenApiContentType;
  statusCode: OpenApiStatusCode;
  description: string;
  headers?: Map<string, OpenApiHeader>;
  content?: Map<OpenApiContentType, OpenApiMediaBuilder>;
}>;

type OpenApiRouteContext = Readonly<{
  uri: string;
  operation: OpenApiOperation;
  summary?: string;
  description?: string;
  operations?: Map<OpenApiOperation, OpenApiRouteBuilder>;
  servers?: Set<OpenApiServer>;
  parameters?: Set<OpenApiParameter>;
}>;

type OpenApiExample = Readonly<{}>;

/**
 * Builds the Media object for an OpenApi operation.
 */
class OpenApiMediaBuilder {
  private readonly ctx: OpenApiResponseContext;
  private readonly schema?: OpenApiSchema;
  private readonly example?: unknown;
  private readonly examples?: Map<string, OpenApiExample>;
  private readonly encoding?: Map<string, OpenApiEncoding>;

  public constructor(
    ctx: OpenApiResponseContext,
    schema?: OpenApiSchema,
    example?: unknown,
    examples?: Map<string, OpenApiExample>,
    encoding?: Map<string, OpenApiEncoding>,
  ) {
    this.ctx = ctx;
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
  }

  public addSchema(schema: OpenApiSchema) {
    return new OpenApiMediaBuilder(
      this.ctx,
      schema,
      this.example,
      this.examples,
      this.encoding,
    );
  }

  public addSingularExample(example: unknown) {
    return new OpenApiMediaBuilder(
      this.ctx,
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
            this.ctx,
            this.schema,
            this.example,
            newExamples,
            this.encoding,
          );
        }
        const examplesCopy = structuredClone(this.examples);
        examplesCopy.set(name, example);
        return new OpenApiMediaBuilder(
          this.ctx,
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
            this.ctx,
            this.schema,
            this.example,
            this.examples,
            newEncodings,
          );
        }
        const encodingCopy = structuredClone(this.encoding);
        encodingCopy.set(name, encoding);
        return new OpenApiMediaBuilder(
          this.ctx,
          this.schema,
          this.example,
          this.examples,
          encodingCopy,
        );
      },
    };
  }

  public endResponse() {
    if (!this.ctx.content) {
      const newContent: Map<OpenApiContentType, OpenApiMediaBuilder> =
        new Map();
      newContent.set(this.ctx.contentType, this);
      return new OpenApiResponseBuilder(
        this.ctx.statusCode,
        this.ctx.description,
        this.ctx.routeBuilderCtx,
        this.ctx.headers,
        newContent,
      ).build();
    }

    const contentCopy = structuredClone(this.ctx.content);
    contentCopy.set(this.ctx.contentType, this);
    return new OpenApiResponseBuilder(
      this.ctx.statusCode,
      this.ctx.description,
      this.ctx.routeBuilderCtx,
      this.ctx.headers,
      contentCopy,
    ).build();
  }
}

class OpenApiResponseBuilder {
  private readonly statusCode: OpenApiStatusCode;
  private readonly ctx: OpenApiRouteBuilderContext;
  private readonly description: string;
  private readonly headers?: Map<string, OpenApiHeader>;
  private readonly content?: Map<OpenApiContentType, OpenApiMediaBuilder>;

  public constructor(
    statusCode: OpenApiStatusCode,
    description: string,
    ctx: OpenApiRouteBuilderContext,
    headers?: Map<string, OpenApiHeader>,
    content?: Map<OpenApiContentType, OpenApiMediaBuilder>,
  ) {
    this.statusCode = statusCode;
    this.description = description;
    this.ctx = ctx;
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
          const headersCopy = structuredClone(this.headers);
          headersCopy.set(name, header);
          headers = headersCopy;
        }
        return new OpenApiResponseBuilder(
          this.statusCode,
          this.description,
          this.ctx,
          headers,
          this.content,
        );
      },
    };
  }

  public addContent(contentType: OpenApiContentType) {
    const ctx: OpenApiResponseContext = {
      contentType: contentType,
      routeBuilderCtx: this.ctx,
      statusCode: this.statusCode,
      description: this.description,
      headers: this.headers,
      content: this.content,
    };
    return new OpenApiMediaBuilder(ctx);
  }

  public build(): OpenApiRouteBuilder {
    let responses: Set<OpenApiResponseBuilder>;
    if (this.ctx.responses) {
      const copy = structuredClone(this.ctx.responses);
      copy.add(this);
      responses = copy;
    } else {
      const newResponses: Set<OpenApiResponseBuilder> = new Set();
      newResponses.add(this);
      responses = newResponses;
    }
    return new OpenApiRouteBuilder(
      this.ctx.routeContext,
      this.ctx.tags,
      this.ctx.summary,
      this.ctx.description,
      this.ctx.externalDocs,
      this.ctx.operationId,
      this.ctx.parameters,
      this.ctx.requestBody,
      responses,
      this.ctx.callBacks,
      this.ctx.deprecated,
      this.ctx.security,
      this.ctx.servers,
    );
  }
}

type OpenApiRouteBuilderContext = {
  routeContext: OpenApiRouteContext;
  tags?: OpenApiTag[];
  summary?: string;
  description?: string;
  externalDocs?: OpenApiExternalDocumentation;
  operationId?: string;
  parameters?: Set<OpenApiParameter>;
  requestBody?: OpenApiRequestBody;
  responses?: Set<OpenApiResponseBuilder>;
  callBacks?: Map<string, OpenApiCallback>;
  deprecated?: boolean;
  security?: OpenApiSecurity[];
  servers?: OpenApiServer[];
};

/**
 * Represents a single API operation on a path.
 *
 * See: https://swagger.io/specification/
 */
class OpenApiRouteBuilder {
  private readonly ctx: OpenApiRouteContext;
  private readonly tags?: OpenApiTag[];
  private readonly summary?: string;
  private readonly description?: string;
  private readonly externalDocs?: OpenApiExternalDocumentation;
  private readonly operationId?: string;
  private readonly parameters?: Set<OpenApiParameter>;
  private readonly requestBody?: OpenApiRequestBody;
  private readonly responses?: Set<OpenApiResponseBuilder>;
  private readonly callBacks?: Map<string, OpenApiCallback>;
  private readonly deprecated?: boolean;
  private readonly security?: OpenApiSecurity[];
  private readonly servers?: OpenApiServer[];

  public constructor(
    ctx: OpenApiRouteContext,
    tags?: OpenApiTag[],
    summary?: string,
    description?: string,
    externalDocs?: OpenApiExternalDocumentation,
    operationId?: string,
    parameters?: Set<OpenApiParameter>,
    requestBody?: OpenApiRequestBody,
    responses?: Set<OpenApiResponseBuilder>,
    callBacks?: Map<string, OpenApiCallback>,
    deprecated?: boolean,
    security?: OpenApiSecurity[],
    servers?: OpenApiServer[],
  ) {
    this.ctx = ctx;
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

  /**
   * Adds a response to this OpenApiRouteBuilder
   * @param statusCode -- The HTTP status code.
   * @returns An object with a single method, addsDescription to continue building the response.
   */
  public addResponse(statusCode: OpenApiStatusCode) {
    const ctx: OpenApiRouteBuilderContext = {
      routeContext: this.ctx,
      tags: this.tags,
      summary: this.summary,
      description: this.description,
      externalDocs: this.externalDocs,
      operationId: this.operationId,
      parameters: this.parameters,
      requestBody: this.requestBody,
      responses: this.responses,
      callBacks: this.callBacks,
      deprecated: this.deprecated,
      security: this.security,
      servers: this.servers,
    };
    return {
      addDescription: (description: string) => {
        return new OpenApiResponseBuilder(statusCode, description, ctx);
      },
    };
  }

  public return(): OpenApiRoute {
    let operations: Map<OpenApiOperation, OpenApiRouteBuilder>;
    if (!this.ctx.operations) {
      const newOperations = new Map<OpenApiOperation, OpenApiRouteBuilder>();
      newOperations.set(this.ctx.operation, this);
      operations = newOperations;
    } else {
      const copyOperations = structuredClone(this.ctx.operations);
      copyOperations.set(this.ctx.operation, this);
      operations = copyOperations;
    }
    return new OpenApiRoute(
      this.ctx.uri,
      this.ctx.summary,
      this.ctx.description,
      operations,
      this.ctx.servers,
      this.ctx.parameters,
    );
  }
}

export class OpenApiRoute {
  private readonly uri: string;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly operations?: Map<OpenApiOperation, OpenApiRouteBuilder>;
  private readonly servers?: Set<OpenApiServer>;
  private readonly parameters?: Set<OpenApiParameter>;

  /**
   * @param uri - Uri of the route, must be a string of the form: /foo/bar or can allow parameters such as /foo/{id}
   * @param summary - An optional summary
   * @param description - An optional description
   */
  public constructor(
    uri: string,
    summary?: string,
    description?: string,
    operations?: Map<OpenApiOperation, OpenApiRouteBuilder>,
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

  public addOperation(op: OpenApiOperation) {
    const ctx: OpenApiRouteContext = {
      uri: this.uri,
      operation: op,
      summary: this.summary,
      description: this.description,
      operations: this.operations,
      servers: this.servers,
      parameters: this.parameters,
    };
    return new OpenApiRouteBuilder(ctx);
  }
}
