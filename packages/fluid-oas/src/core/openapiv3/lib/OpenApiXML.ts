import {
  withAttribute,
  withName,
  withNamespace,
  withPrefix,
  withWrapped,
} from "../common";
import { Base, type BaseInterface } from "./base";

const XMLBase = withWrapped(
  withAttribute(withPrefix(withNamespace(withName(Base))))
);

export interface OpenApiXML extends BaseInterface {
  addName(name: string): this;
  addNamespace(val: string): this;
  addPrefix(val: string): this;
  attribute(): this;
  wrapped(): this;
}

class _OpenApiXML extends XMLBase implements OpenApiXML {}

export function XML(): OpenApiXML {
  return new _OpenApiXML();
}
