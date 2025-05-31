import { withContent, withDescription, withRequired } from "../common";
import type { OpenApiMediaContentType } from "../types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiMediaType } from "./OpenApiMedia";

const RequestBodyBase = withRequired(withContent(withDescription(Base)));

export interface OpenApiRequestBody extends BaseInterface {
  addDescription(description: string): this;
  addContents(
    mappings: Partial<{
      [K in OpenApiMediaContentType]: OpenApiMediaType;
    }>
  ): this;
  addRequired(required: boolean): this;
}

class _OpenApiRequestBody
  extends RequestBodyBase
  implements OpenApiRequestBody {}

export const RequestBody: {
  addContents(
    mappings: Partial<{ [K in OpenApiMediaContentType]: OpenApiMediaType }>
  ): OpenApiRequestBody;
} = {
  addContents(
    mappings: Partial<{
      [K in OpenApiMediaContentType]: OpenApiMediaType;
    }>
  ) {
    return new _OpenApiRequestBody().addContents(mappings);
  },
};
