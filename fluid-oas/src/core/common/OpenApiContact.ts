import { withName, withURL, withEmail } from "../../common/common";
import { Base, type BaseInterface } from "./base";

const ContactBase = withEmail(withURL(withName(Base)));

export interface OpenApiContact extends BaseInterface {
  addEmail(email: string): this;
  addUrl(url: string): this;
  addName(name: string): this;
}

class _OpenApiContact extends ContactBase implements OpenApiContact {}

export function Contact(): OpenApiContact {
  return new _OpenApiContact();
}
