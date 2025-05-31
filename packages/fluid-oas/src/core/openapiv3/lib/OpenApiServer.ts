import { withDescription, withURL, withVariables } from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiServerVariable } from "./OpenApiServerVariable";

const ServerBase = withVariables(withDescription(withURL(Base)));

export interface OpenApiServer extends BaseInterface {
  addUrl(url: string): this;
  addDescription(description: string): this;
  addVariables(
    mappings: Partial<{ [K in string]: OpenApiServerVariable }>
  ): this;
}

class _OpenApiServer extends ServerBase implements OpenApiServer {}

export const Server: {
  addUrl(url: string): OpenApiServer;
} = {
  addUrl(url: string) {
    return new _OpenApiServer().addUrl(url);
  },
};
