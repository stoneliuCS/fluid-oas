import {
  withDescription,
  withOperationId,
  withOperationRef,
  withParameters,
  withRequestBodyPrimitive,
  withServer,
} from "../../common/common";
import { Base } from "./base";

const LinkBase = withServer(
  withDescription(
    withRequestBodyPrimitive(
      withParameters(withOperationId(withOperationRef(Base)))
    )
  )
);

class _OpenApiLink extends LinkBase {}

export function Link() {
  return new _OpenApiLink();
}
export type OpenApiLink = _OpenApiLink;
