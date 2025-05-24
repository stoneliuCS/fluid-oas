import { withIdentifier, withName, withURL } from "../../common/common";
import { Base } from "./base";

const LicenseBase = withURL(withIdentifier(withName(Base)));

class _OpenApiLicense extends LicenseBase {}

export function License(name: string) {
  return new _OpenApiLicense().name(name);
}

export type OpenApiLicense = _OpenApiLicense;
