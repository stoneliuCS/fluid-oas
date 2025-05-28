import { withPath } from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiPathItem } from "./OpenApiPathItem";

const PathBase = withPath(Base);

export interface OpenApiPath extends BaseInterface {
  addEndpoints(mappings: Partial<{ [K in string]: OpenApiPathItem }>): this;
  beginGroup(prefix: string): this;
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

export function Path(): OpenApiPath {
  return new _OpenApiPath();
}
