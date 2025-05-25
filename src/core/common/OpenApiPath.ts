import { withPath } from "../../common/common";
import { Base } from "./base";
import type { OpenApiPathItem } from "./OpenApiPathItem";

const PathBase = withPath(Base);

class _OpenApiPath extends PathBase {
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

export function Path() {
  return new _OpenApiPath();
}

export type OpenApiPath = _OpenApiPath;
