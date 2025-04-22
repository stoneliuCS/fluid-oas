import { BadPathError } from "../lib/error";
import { deepFreeze } from "../lib/freeze";
import { validatePath } from "../lib/url";
import {
  OpenApiContentType,
  OpenApiOperation,
  OpenApiStatusCode,
} from "../types/OpenApiTypes";
import type { OpenApiSchema } from "./OpenApiSchema";

class OpenApiRouteBuilder {
  readonly type: OpenApiOperation;
  readonly route: OpenApiRoute;
  readonly contentType?: OpenApiContentType;
  readonly summary?: string;
  readonly description?: string;
  readonly responses?: Map<[OpenApiStatusCode, string], OpenApiSchema>;

  public constructor(
    type: OpenApiOperation,
    route: OpenApiRoute,
    summary?: string,
    description?: string,
    contentType?: OpenApiContentType,
    responses?: Map<[OpenApiStatusCode, string], OpenApiSchema>,
  ) {
    this.type = type;
    this.route = route;
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
    deepFreeze(this);
  }

  public addResponse(statusCode: OpenApiStatusCode, description: string) {
    return {
      addContentType: (contentType: OpenApiContentType) => {
        return {
          addSchema: (schema: OpenApiSchema) => {
            if (!this.responses) {
              const responseMap: Map<
                [OpenApiStatusCode, string],
                OpenApiSchema
              > = new Map();
              responseMap.set([statusCode, description], schema);
              return new OpenApiRouteBuilder(
                this.type,
                this.route,
                this.summary,
                this.description,
                contentType,
                responseMap,
              );
            } else {
              const newResponses = structuredClone(this.responses);
              newResponses.set([statusCode, description], schema);
              return new OpenApiRouteBuilder(
                this.type,
                this.route,
                this.summary,
                this.description,
                contentType,
                newResponses,
              );
            }
          },
        };
      },
    };
  }

  public return(): OpenApiRoute {
    const operationsCopy = structuredClone(this.route.operations);
    if (operationsCopy) {
      operationsCopy.set(this.type, this);
    }
    return new OpenApiRoute(
      this.route.uri,
      this.route.summary,
      this.description,
      operationsCopy,
    );
  }
}

export class OpenApiRoute {
  readonly uri: string;
  readonly summary?: string;
  readonly description?: string;
  readonly operations?: Map<OpenApiOperation, OpenApiRouteBuilder>;

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

  public addGetOperation(description?: string, summary?: string) {
    return new OpenApiRouteBuilder(
      OpenApiOperation.GET,
      this,
      summary,
      description,
    );
  }
}
