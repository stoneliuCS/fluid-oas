import {
  Base,
  withAttribute,
  withName,
  withNamespace,
  withPrefix,
  withWrapped,
} from "./common";

const XMLBase = withWrapped(
  withAttribute(withPrefix(withNamespace(withName(Base)))),
);

class _OpenApiXML extends XMLBase {}
export const OpenApiXML = new _OpenApiXML();
export type OpenApiXML = typeof OpenApiXML;
