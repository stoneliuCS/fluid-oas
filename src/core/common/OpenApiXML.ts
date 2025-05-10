import {
  Base,
  withAttribute,
  withName,
  withNamespace,
  withPrefix,
  withWrapped,
} from "./common";

class _OpenApiXML extends Base {}

const OpenApiXMLImpl = withWrapped(
  withAttribute(withPrefix(withNamespace(withName(_OpenApiXML)))),
);
export const OpenApiXML = new OpenApiXMLImpl();
export type OpenApiXML = typeof OpenApiXML;
