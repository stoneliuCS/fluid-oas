import { withDefault, withResponses } from "../../../common/common";
import type { OpenApiHTTPStatusCode } from "../../../common/types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiResponse } from "./OpenApiResponse";

const ResponsesBase = withResponses(withDefault(Base)<OpenApiResponse>());

export interface OpenApiResponses extends BaseInterface {
  addDefault(response: OpenApiResponse): this;
  addResponse(
    statusCode: OpenApiHTTPStatusCode,
    response: OpenApiResponse
  ): this;
}

class _OpenApiResponses extends ResponsesBase implements OpenApiResponses {}

export function Responses(): OpenApiResponses {
  return new _OpenApiResponses();
}
