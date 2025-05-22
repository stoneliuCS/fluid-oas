import {
  withAuthorizationURL,
  withRefreshURL,
  withScopes,
  withTokenURL,
} from "../../common/common";
import { Base } from "./base";

const OAuthFlowBase = withScopes(
  withRefreshURL(withTokenURL(withAuthorizationURL(Base)))
);

class _OpenApiOAuthFlow extends OAuthFlowBase {}

export function OAuthFlow() {
  return new _OpenApiOAuthFlow();
}
export type OpenApiOAuthFlow = _OpenApiOAuthFlow;
