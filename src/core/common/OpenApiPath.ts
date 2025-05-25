import { withPath } from "../../common/common";
import { Base } from "./base";
import type { OpenApiPathItem } from "./OpenApiPathItem";

const PathBase = withPath(Base);

class _OpenApiPath extends PathBase {}

export function Path() {
  return new _OpenApiPath();
}

export type OpenApiPath = _OpenApiPath;
