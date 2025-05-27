import { withPath } from "../../../common/common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiPathItem } from "./OpenApiPathItem";

const PathBase = withPath(Base);

export interface OpenApiPath extends BaseInterface {
  addEndpoint(endpoint: string, pathItem: OpenApiPathItem): this;
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

  addEndpoint(endpoint: string, pathItem: OpenApiPathItem) {
    const combinedEndpoint = this._prefix + endpoint;
    return super.addEndpoint(combinedEndpoint, pathItem);
  }
}

export function Path(): OpenApiPath {
  return new _OpenApiPath();
}
