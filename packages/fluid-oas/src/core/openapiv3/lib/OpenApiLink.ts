import {
  withDescription,
  withOperationId,
  withOperationRef,
  withParametersPrimitive,
  withRequestBodyPrimitive,
  withServer,
} from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiServer } from "./OpenApiServer";

const LinkBase = withServer(
  withDescription(
    withRequestBodyPrimitive(
      withParametersPrimitive(withOperationId(withOperationRef(Base)))
    )
  )
);

export interface OpenApiLink extends BaseInterface {
  addServer(server: OpenApiServer): this;
  addDescription(description: string): this;
  addRequestBodyLiteral(literalRequestBody: string): this;
  addParametersLiteral(mappings: Partial<{ [K in string]: string }>): this;
  addOperationId(id: string): this;
  addOperationRef(ref: string): this;
}

class _OpenApiLink extends LinkBase implements OpenApiLink {}

export const Link: OpenApiLink = new _OpenApiLink();
