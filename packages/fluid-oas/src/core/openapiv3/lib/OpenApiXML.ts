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
  addAttribute(attribute: boolean): this;
  addWrapped(wrapped: boolean): this;
}

class _OpenApiXML extends XMLBase implements OpenApiXML {}

export const XML: OpenApiXML = new _OpenApiXML();
