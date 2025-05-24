import { withPath } from "../../common/common";
import { Base } from "./base";

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

  endpoint(endpoint: string) {
    const combinedEndpoint = this._prefix + endpoint;
    return super.endpoint(combinedEndpoint);
  }
}

export function Path() {
  return new _OpenApiPath();
}

export type OpenApiPath = _OpenApiPath;
