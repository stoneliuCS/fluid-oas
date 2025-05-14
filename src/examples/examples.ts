import { OpenApiOAuthFlow } from "../core/common/OpenApiOAuthFlow.ts";
import { OpenApiOAuthFlows } from "../core/common/OpenApiOAuthFlows.ts";
import { OpenApiSecurityScheme } from "../core/common/OpenApiSecurityScheme.ts";
console.log(
  OpenApiSecurityScheme.type("apiKey")
    .bearerFormat("Bearer")
    .flows(
      OpenApiOAuthFlows.authorizationCode(
        OpenApiOAuthFlow.refreshUrl("url")
      ).password(OpenApiOAuthFlow.scopes("stone").with("liu"))
    )
    .toJSON()
);
