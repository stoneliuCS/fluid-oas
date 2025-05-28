import { withDefault, withResponses } from "../common";
import type { OpenApiHTTPStatusCode } from "../types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiResponse } from "./OpenApiResponse";

const ResponsesBase = withResponses(withDefault(Base)<OpenApiResponse>());

export interface OpenApiResponses extends BaseInterface {
  addDefault(response: OpenApiResponse): this;
  addResponses(
    mappings: Partial<{
      [K in OpenApiHTTPStatusCode]: OpenApiResponse;
    }>
  ): this;
}

class _OpenApiResponses extends ResponsesBase implements OpenApiResponses {}

export function Responses(): OpenApiResponses {
  return new _OpenApiResponses();
}
