import { withPath } from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiPathItem } from "./OpenApiPathItem";

const PathBase = withPath(Base);

export interface OpenApiPath extends BaseInterface {
  /**
   * Adds endpoints to the OpenAPI specification.
   * @param mappings - a mapping between API routes and PathItems
   * @returns this
   */
  addEndpoints(mappings: Partial<{ [K in string]: OpenApiPathItem }>): this;
}

class _OpenApiPath extends PathBase implements OpenApiPath {}

export const Path: OpenApiPath = new _OpenApiPath();
