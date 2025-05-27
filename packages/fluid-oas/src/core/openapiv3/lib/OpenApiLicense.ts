import { withIdentifier, withName, withURL } from "../common";
import { Base, type BaseInterface } from "./base";

const LicenseBase = withURL(withIdentifier(withName(Base)));

export interface OpenApiLicense extends BaseInterface {
  addName(name: string): this;
  addIdentifier(id: string): this;
  addUrl(url: string): this;
}

class _OpenApiLicense extends LicenseBase implements OpenApiLicense {}

export function License(name: string): OpenApiLicense {
  return new _OpenApiLicense().addName(name);
}
