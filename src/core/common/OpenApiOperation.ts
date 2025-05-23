import {
  withDescription,
  withExternalDocs,
  withOperationId,
  withParametersArray,
  withRequestBody,
  withResponses,
  withSummary,
  withTags,
} from "../../common/common";
import { Base } from "./base";

const OperationBase = withResponses(
  withRequestBody(
    withParametersArray(
      withOperationId(
        withExternalDocs(withDescription(withSummary(withTags(Base)())))
      )
    )()
  )
);
