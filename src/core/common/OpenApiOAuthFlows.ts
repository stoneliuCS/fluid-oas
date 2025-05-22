import {
  withAuthorizationCode,
  withClientCredentials,
  withImplicit,
  withPassword,
} from "../../common/common";
import { Base } from "./base";

const OAuthFlowsBase = withAuthorizationCode(
  withClientCredentials(withPassword(withImplicit(Base)))
);
class _OpenApiOAuthFlows extends OAuthFlowsBase {}

export function OAuthFlows() {
  return new _OpenApiOAuthFlows();
}
export type OpenApiOAuthFlows = _OpenApiOAuthFlows;
