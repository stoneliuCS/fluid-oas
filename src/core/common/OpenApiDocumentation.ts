import { withDescription, withURL } from "../../common/common";
import { Base, type BaseInterface } from "./base";

const DocumentationBase = withURL(withDescription(Base));

interface Documentation extends BaseInterface {
  addUrl(url: string): this;
  addDescription(description: string): this;
}

class _OpenApiDocumentation
  extends DocumentationBase
  implements Documentation {}

export function Documentation(): Documentation {
  return new _OpenApiDocumentation();
}
export type OpenApiDocumentation = Documentation;
