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
} from "../../common/common";
import { Base } from "./base";

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
            )()
          )
        )
      )
    )()
  )()
);

class _OpenApiOperation extends OperationBase {}

export function Operation() {
  return new _OpenApiOperation();
}

export type OpenApiOperation = _OpenApiOperation;
