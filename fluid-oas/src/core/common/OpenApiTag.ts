import {
  withDescription,
  withExternalDocs,
  withName,
} from "../../common/common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";

const TagBase = withExternalDocs(withName(withDescription(Base)));

export interface OpenApiTag extends BaseInterface {
  addDescription(description: string): this;
  addName(name: string): this;
  addExternalDocs(docs: OpenApiDocumentation): this;
}
class _OpenApiTag extends TagBase implements OpenApiTag {}

export function Tag(): OpenApiTag {
  return new _OpenApiTag();
}
