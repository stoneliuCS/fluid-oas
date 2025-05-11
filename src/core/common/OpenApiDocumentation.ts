import { Base, withDescription, withURL } from "./common";

const DocumentationBase = withURL(withDescription(Base));

class _OpenApiDocumentation extends DocumentationBase {}

export const OpenApiDocumentation = () => new _OpenApiDocumentation();
export type OpenApiDocumentation = _OpenApiDocumentation;
