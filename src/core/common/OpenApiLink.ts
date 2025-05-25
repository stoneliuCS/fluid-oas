import {
  withDescription,
  withOperationId,
  withOperationRef,
  withParametersPrimitive,
  withRequestBodyPrimitive,
  withServer,
} from "../../common/common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiServer } from "./OpenApiServer";

const LinkBase = withServer(
  withDescription(
    withRequestBodyPrimitive(
      withParametersPrimitive(withOperationId(withOperationRef(Base)))
    )
  )
);

interface Link extends BaseInterface {
  addServer(server: OpenApiServer): this;
  addDescription(description: string): this;
  addRequestBodyLiteral(literalRequestBody: string): this;
  addParameterLiteral(name: string, parameter: string): this;
  addOperationId(id: string): this;
  addOperationRef(ref: string): this;
}

class _OpenApiLink extends LinkBase implements Link {}

export function Link(): Link {
  return new _OpenApiLink();
}
export type OpenApiLink = Link;
