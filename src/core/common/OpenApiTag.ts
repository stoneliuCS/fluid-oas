import {
  withDescription,
  withExternalDocs,
  withName,
} from "../../common/common";
import { Base } from "./base";

const TagBase = withExternalDocs(withName(withDescription(Base)));
class _OpenApiTag extends TagBase {}

export const tag = () => new _OpenApiTag();
export type Tag = _OpenApiTag;
