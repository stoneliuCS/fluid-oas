import { withIdentifier, withName, withURL } from "../../common/common";
import { Base, type BaseInterface } from "./base";

const LicenseBase = withURL(withIdentifier(withName(Base)));

interface License extends BaseInterface {
  addName(name: string): this;
  addIdentifier(id: string): this;
  addUrl(url: string): this;
}

class _OpenApiLicense extends LicenseBase implements License {}

export function License(name: string): License {
  return new _OpenApiLicense().addName(name);
}

export type OpenApiLicense = _OpenApiLicense;
