import { withDefault, withResponses } from "../../common/common";
import { Base } from "./base";
import type { OpenApiResponse } from "./OpenApiResponse";

const ResponsesBase = withResponses(withDefault(Base)<OpenApiResponse>());

class _OpenApiResponses extends ResponsesBase {}

export function Responses() {
  return new _OpenApiResponses();
}

export type OpenApiResponses = _OpenApiResponses;
