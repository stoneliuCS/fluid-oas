import { withName, withURL, withEmail } from "../../common/common";
import { Base, type BaseInterface } from "./base";

const ContactBase = withEmail(withURL(withName(Base)));

interface Contract extends BaseInterface {
  addEmail(email: string): this;
  addUrl(url: string): this;
  addName(name: string): this;
}

class _OpenApiContact extends ContactBase implements Contract {}

export function Contact(): Contract {
  return new _OpenApiContact();
}

export type OpenApiContact = Contract;
