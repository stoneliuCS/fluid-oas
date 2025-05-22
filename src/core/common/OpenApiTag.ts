import {
  withDescription,
  withExternalDocs,
  withName,
} from "../../common/common";
import { Base } from "./base";

const TagBase = withExternalDocs(withName(withDescription(Base)));
class _OpenApiTag extends TagBase {}

export function Tag() {
  return new _OpenApiTag();
}
export type OpenApiTag = _OpenApiTag;
