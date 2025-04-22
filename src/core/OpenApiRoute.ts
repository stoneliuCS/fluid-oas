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
} from "../types/OpenApiTypes";
import type { OpenApiSchema } from "./OpenApiSchema";
import type { OpenApiSecurity } from "./OpenApiSecurity";

type OpenApiRouteContext = Readonly<{
  uri: string;
  summary?: string;
  description?: string;
  operations?: Map<OpenApiOperation, OpenApiRouteBuilder>;
}>;

type OpenApiMedia = Readonly<{
  schema: OpenApiSchema;
}>;

type OpenApiLink = Readonly<{}>;

type OpenApiResponse = Readonly<{
  description: string;
  headers?: Map<string, OpenApiHeader>;
  content?: Map<string, OpenApiMedia>;
  links?: Map<string, OpenApiLink>;
}>;

/**
 * Represents a single API operation on a path.
 *
 * See: https://swagger.io/specification/
 */
class OpenApiRouteBuilder {
  private readonly type: OpenApiOperation;
  private readonly ctx: OpenApiRouteContext;
  private readonly contentType?: OpenApiContentType;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly responses?: Map<OpenApiStatusCode, OpenApiResponse>;
  private readonly parameters?: Set<OpenApiParameter>;
  private readonly externalDocs?: OpenApiExternalDocumentation;
  private readonly operationId?: string;
  private readonly requestBody?: OpenApiRequestBody;
  private readonly callBacks?: Map<string, OpenApiCallback>;
  private readonly deprecated?: boolean;
  private readonly security?: OpenApiSecurity[];
  private readonly servers?: OpenApiServer[];

  public constructor(
    type: OpenApiOperation,
    ctx: OpenApiRouteContext,
    summary?: string,
    description?: string,
    contentType?: OpenApiContentType,
    responses?: Map<OpenApiStatusCode, OpenApiResponse>,
    parameters?: Set<OpenApiParameter>,
  ) {
    this.type = type;
    this.ctx = ctx;
    if (contentType) {
      this.contentType = contentType;
    }
    if (summary) {
      this.summary = summary;
    }
    if (description) {
      this.description = description;
    }
    if (responses) {
      this.responses = responses;
    }
    if (parameters) {
      this.parameters = parameters;
    }
    deepFreeze(this);
  }

  /**
   * Adds a parameter to this OpenApiRouteBuilder
   * @param name - The name of the parameter
   * @returns OpenApiRouteBuilder with the added parameters.
   */
  public addParameter(name: string) {
    return {
      addLocation: (location: "query" | "header" | "path" | "cookie") => {
        return {
          additionalMetadata: (
            description?: string,
            required?: boolean,
            deprecated?: string,
          ) => {
            const parameter: OpenApiParameter = {
              name: name,
              in: location,
              description: description,
              required: required,
              deprecated: deprecated,
            };
            if (!this.parameters) {
              return new OpenApiRouteBuilder(
                this.type,
                this.ctx,
                this.summary,
                this.description,
                this.contentType,
                this.responses,
                new Set([parameter]),
              );
            }
            const parameterCopy = structuredClone(this.parameters);
            parameterCopy.add(parameter);
            return new OpenApiRouteBuilder(
              this.type,
              this.ctx,
              this.summary,
              this.description,
              this.contentType,
              this.responses,
              parameterCopy,
            );
          },
        };
      },
    };
  }

  public addResponse(statusCode: OpenApiStatusCode) {
    return {
      addDescription: (description: string) => {
        return {
          addHeaders: (headers?: Map<string, OpenApiHeader>) => {
            return {
              addContentType: (contentType: OpenApiContentType) => {
                return {
                  addSchema: (schema: OpenApiSchema) => {
                    return {
                      additionalMetadata: (
                        examples?: string[],
                        encodings?: Map<string, OpenApiEncoding>,
                      ) => {
                        return this;
                      },
                    };
                  },
                };
              },
            };
          },
        };
      },
    };
  }

  public return(): OpenApiRoute {
    const operationsCopy = structuredClone(this.ctx.operations);
    if (operationsCopy) {
      operationsCopy.set(this.type, this);
    }
    return new OpenApiRoute(
      this.ctx.uri,
      this.ctx.summary,
      this.description,
      operationsCopy,
    );
  }
}

export class OpenApiRoute {
  private readonly uri: string;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly operations?: Map<OpenApiOperation, OpenApiRouteBuilder>;

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
    deepFreeze(this);
  }

  public addOperation(op: OpenApiOperation) {
    const ctx: OpenApiRouteContext = {
      uri: this.uri,
      summary: this.summary,
      description: this.description,
      operations: this.operations,
    };
    return new OpenApiRouteBuilder(op, ctx);
  }
}
