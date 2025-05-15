import {
  withDescription,
  withName,
  withType,
  withIn,
  withScheme,
  withBearerFormat,
  withFlows,
  withOpenIdConnectURL,
} from "../../common/common";
import { Base } from "./base";

const SecurityBase = withOpenIdConnectURL(
  withFlows(
    withBearerFormat(
      withScheme(withIn(withName(withDescription(withType(Base)())))())
    )
  )
);

class _OpenApiSecurityScheme extends SecurityBase {}

export const securityscheme = () => new _OpenApiSecurityScheme();
export type SecurityScheme = _OpenApiSecurityScheme;
