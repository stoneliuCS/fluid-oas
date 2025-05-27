import { withDescription, withURL } from "../common";
import { Base, type BaseInterface } from "./base";

const DocumentationBase = withURL(withDescription(Base));

export interface OpenApiDocumentation extends BaseInterface {
  addUrl(url: string): this;
  addDescription(description: string): this;
}

class _OpenApiDocumentation
  extends DocumentationBase
  implements OpenApiDocumentation {}

export function Documentation(): OpenApiDocumentation {
  return new _OpenApiDocumentation();
}
