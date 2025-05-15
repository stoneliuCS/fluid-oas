import { withDescription, withURL } from "../../common/common";
import { Base } from "./base";

const DocumentationBase = withURL(withDescription(Base));
class _OpenApiDocumentation extends DocumentationBase {}

export const documentation = () => new _OpenApiDocumentation();
export type Documentation = _OpenApiDocumentation;
