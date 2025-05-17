import {
  withAttribute,
  withName,
  withNamespace,
  withPrefix,
  withWrapped,
} from "../../common/common";
import { Base } from "./base";

const XMLBase = withWrapped(
  withAttribute(withPrefix(withNamespace(withName(Base))))
);

class _OpenApiXML extends XMLBase {}

export const XML = () => new _OpenApiXML();
export type XML = _OpenApiXML;
