import { Base, withDescription, withExtensions, withURL } from "./common";

class _OpenApiDocumentation extends Base {}

const OpenApiDocumentationImpl = withURL(
  withExtensions(withDescription(_OpenApiDocumentation)),
);

export const OpenApiDocumentation = new OpenApiDocumentationImpl();
