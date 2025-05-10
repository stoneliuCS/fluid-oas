import { Base, withDescription, withURL } from "./common";

class _OpenApiDocumentation extends Base {}

const OpenApiDocumentationImpl = withURL(
  withDescription(_OpenApiDocumentation),
);

export const OpenApiDocumentation = new OpenApiDocumentationImpl();
export type OpenApiDocumentation = typeof OpenApiDocumentation;
