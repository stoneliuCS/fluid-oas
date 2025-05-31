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

  /**
   * Add a prefix to all API endpoints defined after this.
   * @param prefix - The prefix to add to group related API endpoints.
   * @returns this
   */
  beginGroup(prefix: string): this;

  /**
   * Ends the current group of API endpoints.
   * @returns this
   */
  endGroup(): this;
}

class _OpenApiPath extends PathBase implements OpenApiPath {
  private _prefix: string = "";

  beginGroup(prefix: string): this {
    const copy: this = Object.create(this);
    copy._prefix = prefix;
    return copy;
  }

  endGroup() {
    const copy: this = Object.create(this);
    copy._prefix = "";
    return copy;
  }

  addEndpoints(mappings: { [K in string]: OpenApiPathItem }) {
    const mappingsImpl: { [K in string]: OpenApiPathItem } = {};
    for (const key in mappings) {
      const newKey = this._prefix + key;
      mappingsImpl[newKey] = mappings[key]!;
    }
    return super.addEndpoints(mappingsImpl);
  }
}

export const Path: OpenApiPath = new _OpenApiPath();
