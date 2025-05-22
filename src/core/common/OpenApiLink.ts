import {
  withDescription,
  withOperationId,
  withOperationRef,
  withParameters,
  withRequestBody,
  withServer,
} from "../../common/common";
import { Base } from "./base";

const LinkBase = withServer(
  withDescription(
    withRequestBody(withParameters(withOperationId(withOperationRef(Base))))
  )
);

class _OpenApiLink extends LinkBase {}

export const Link = () => new _OpenApiLink();
export type OpenApiLink = _OpenApiLink;
