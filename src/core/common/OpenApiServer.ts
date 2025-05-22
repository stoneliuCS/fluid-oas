import { withDescription, withURL, withVariables } from "../../common/common";
import { Base } from "./base";

const ServerBase = withVariables(withDescription(withURL(Base)));

class _OpenApiServer extends ServerBase {}

export function Server() {
  return new _OpenApiServer();
}
export type OpenApiServer = _OpenApiServer;
