import {
  withDescription,
  withName,
  withType,
  withIn,
  withScheme,
  withBearerFormat,
  withFlows,
  withOpenIdConnectURL,
} from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiOAuthFlows } from "./OpenApiOAuthFlows";

const SecurityBase = withOpenIdConnectURL(
  withFlows(
    withBearerFormat(
      withScheme(
        withIn(withName(withDescription(withType(Base)())))<
          "query" | "header" | "cookie"
        >()
      )
    )
  )
);

export interface OpenApiSecurityScheme extends BaseInterface {
  addType(
    type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect"
  ): this;
  addDescription(description: string): this;
  addName(name: string): this;
  addIn(inSecurity: "query" | "header" | "cookie"): this;
  addScheme(scheme: string): this;
  addBearerFormat(bearerFormat: string): this;
  addFlows(flows: OpenApiOAuthFlows): this;
  addOpenIdConnectUrl(val: string): this;
}

class _OpenApiSecurityScheme
  extends SecurityBase
  implements OpenApiSecurityScheme {}

export const SecurityScheme: {
  addType(
    type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect"
  ): OpenApiSecurityScheme;
} = {
  addType(type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect") {
    return new _OpenApiSecurityScheme().addType(type);
  },
};
