import { withName, withURL, withEmail } from "../../common/common";
import { Base } from "./base";

const ContactBase = withEmail(withURL(withName(Base)));

class _OpenApiContact extends ContactBase {}

export function Contact() {
  return new _OpenApiContact();
}

export type OpenApiContact = _OpenApiContact;
