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

export function XML() {
  return new _OpenApiXML();
}
export type OpenApiXML = _OpenApiXML;
