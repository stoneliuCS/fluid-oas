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

export const OAuthFlow: {
  addAuthorizationUrl(authorizationUrl: string): {
    addTokenUrl(tokenUrl: string): {
      addScopes(mappings: Partial<{ [x: string]: string }>): OpenApiOAuthFlow;
    };
  };
} = {
  addAuthorizationUrl(authorizationUrl: string) {
    return {
      addTokenUrl(tokenUrl: string) {
        return {
          addScopes(mappings: Partial<{ [K in string]: string }>) {
            return new _OpenApiOAuthFlow()
              .addAuthorizationUrl(authorizationUrl)
              .addTokenUrl(tokenUrl)
              .addScopes(mappings);
          },
        };
      },
    };
  },
};
