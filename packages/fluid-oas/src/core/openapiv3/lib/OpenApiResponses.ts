import { withDefault, withResponses } from "../common";
import type { OpenApiHTTPStatusCode } from "../types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiReferenceObject } from "./OpenApiReferenceObject";
import type { OpenApiResponse } from "./OpenApiResponse";

const ResponsesBase = withResponses(
  withDefault(Base)<OpenApiResponse | OpenApiReferenceObject>()
);

export interface OpenApiResponses extends BaseInterface {
  addDefault(response: OpenApiResponse | OpenApiReferenceObject): this;
  addResponses(
    mappings: Partial<{
      [K in OpenApiHTTPStatusCode]: OpenApiResponse | OpenApiReferenceObject;
    }>
  ): this;
}

class _OpenApiResponses extends ResponsesBase implements OpenApiResponses {}

export const Responses: (
  responses: Partial<{
    [K in OpenApiHTTPStatusCode]: OpenApiResponse | OpenApiReferenceObject;
  }>
) => OpenApiResponses = (
  responses: Partial<{
    [K in OpenApiHTTPStatusCode]: OpenApiResponse | OpenApiReferenceObject;
  }>
) => new _OpenApiResponses().addResponses(responses);
