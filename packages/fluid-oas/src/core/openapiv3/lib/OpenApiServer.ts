import {
  withDescription,
  withURL,
  withVariables,
} from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiServerVariable } from "./OpenApiServerVariable";

const ServerBase = withVariables(withDescription(withURL(Base)));

export interface OpenApiServer extends BaseInterface {
  addUrl(url: string): this;
  addDescription(description: string): this;
  addVariable(variableName: string, val: OpenApiServerVariable): this;
}

class _OpenApiServer extends ServerBase implements OpenApiServer {}

export function Server(): OpenApiServer {
  return new _OpenApiServer();
}
