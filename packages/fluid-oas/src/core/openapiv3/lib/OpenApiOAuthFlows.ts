import {
  withAuthorizationCode,
  withClientCredentials,
  withImplicit,
  withPassword,
} from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiOAuthFlow } from "./OpenApiOAuthFlow";

const OAuthFlowsBase = withAuthorizationCode(
  withClientCredentials(withPassword(withImplicit(Base)))
);

export interface OpenApiOAuthFlows extends BaseInterface {
  addImplicit(implicit: OpenApiOAuthFlow): this;
  addPassword(password: OpenApiOAuthFlow): this;
  addClientCredentials(credentials: OpenApiOAuthFlow): this;
  addAuthorizationCode(authCode: OpenApiOAuthFlow): this;
}

class _OpenApiOAuthFlows extends OAuthFlowsBase implements OpenApiOAuthFlows {}

export const OAuthFlows: OpenApiOAuthFlows = new _OpenApiOAuthFlows();
