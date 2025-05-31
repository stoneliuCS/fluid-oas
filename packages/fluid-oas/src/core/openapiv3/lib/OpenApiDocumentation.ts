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

// External Documentation Object.
export const Documentation: { addUrl(url: string): OpenApiDocumentation } = {
  addUrl(url: string): OpenApiDocumentation {
    return new _OpenApiDocumentation().addUrl(url);
  },
};
