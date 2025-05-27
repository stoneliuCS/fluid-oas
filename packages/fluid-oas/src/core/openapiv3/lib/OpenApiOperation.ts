import {
  withCallbacks,
  withDeprecated,
  withDescription,
  withExternalDocs,
  withOperationId,
  withParametersArray,
  withRequestBody,
  withResponsesObject,
  withSecurityArray,
  withServersArray,
  withSummary,
  withTags,
} from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiCallback } from "./OpenApiCallback";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";
import type { OpenApiParameter } from "./OpenApiParameter";
import type { OpenApiRequestBody } from "./OpenApiRequestBody";
import type { OpenApiResponses } from "./OpenApiResponses";
import type { OpenApiSecurityRequirement } from "./OpenApiSecurityRequirement";
import type { OpenApiServer } from "./OpenApiServer";

const OperationBase = withCallbacks(
  withServersArray(
    withSecurityArray(
      withDeprecated(
        withResponsesObject(
          withRequestBody(
            withParametersArray(
              withOperationId(
                withExternalDocs(
                  withDescription(withSummary(withTags(Base)<string>()))
                )
              )
            )<OpenApiParameter>()
          )
        )
      )
    )()
  )()
);

export interface OpenApiOperation extends BaseInterface {
  addTags(tags: string[]): this;
  addSummary(summary: string): this;
  addDescription(description: string): this;
  addExternalDocs(externalDocs: OpenApiDocumentation): this;
  addOperationId(operationId: string): this;
  addParameters(parameters: OpenApiParameter[]): this;
  addRequestBody(body: OpenApiRequestBody): this;
  addResponses(responses: OpenApiResponses): this;
  deprecated(): this;
  addSecurity(security: OpenApiSecurityRequirement[]): this;
  addServers(servers: OpenApiServer[]): this;
  addCallback(name: string, callback: OpenApiCallback): this;
}

class _OpenApiOperation extends OperationBase implements OpenApiOperation {}

export function Operation(): OpenApiOperation {
  return new _OpenApiOperation();
}
