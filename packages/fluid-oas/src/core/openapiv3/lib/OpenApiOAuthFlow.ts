import {
  withAuthorizationURL,
  withRefreshURL,
  withScopes,
  withTokenURL,
} from "../common";
import { Base, type BaseInterface } from "./base";

const OAuthFlowBase = withScopes(
  withRefreshURL(withTokenURL(withAuthorizationURL(Base)))
);

export interface OpenApiOAuthFlow extends BaseInterface {
  addAuthorizationUrl(url: string): this;
  addTokenUrl(url: string): this;
  addRefreshUrl(url: string): this;
  addScopes(mappings: Partial<{ [K in string]: string }>): this;
}

class _OpenApiOAuthFlow extends OAuthFlowBase implements OpenApiOAuthFlow {}

export function OAuthFlow(): OpenApiOAuthFlow {
  return new _OpenApiOAuthFlow();
}
