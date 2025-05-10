import {
  Base,
  withAttribute,
  withExtensions,
  withName,
  withNamespace,
  withPrefix,
  withWrapped,
} from "./common";

class _OpenApiXML extends Base {}

const OpenApiXMLImpl = withExtensions(
  withWrapped(withAttribute(withPrefix(withNamespace(withName(_OpenApiXML))))),
);
