import {
  withContent,
  withDescription,
  withHeaders,
  withLinks,
} from "../common";
import type { OpenApiMediaContentType } from "../types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiHeader } from "./OpenApiHeader";
import type { OpenApiLink } from "./OpenApiLink";
import type { OpenApiMediaType } from "./OpenApiMedia";
import type { OpenApiReferenceObject } from "./OpenApiReferenceObject";

const ResponseBase = withLinks(withContent(withHeaders(withDescription(Base))));

export interface OpenApiResponse extends BaseInterface {
  addDescription(description: string): this;
  addHeaders(
    mappings: Partial<{ [K in string]: OpenApiHeader | OpenApiReferenceObject }>
  ): this;
  addContents(
    mappings: Partial<{
      [K in OpenApiMediaContentType]: OpenApiMediaType;
    }>
  ): this;
  addLinks(
    mappings: Partial<{ [K in string]: OpenApiLink | OpenApiReferenceObject }>
  ): this;
}

class _OpenApiResponse extends ResponseBase implements OpenApiResponse {}

export const Response: {
  addDescription(description: string): OpenApiResponse;
} = {
  addDescription(description: string) {
    return new _OpenApiResponse().addDescription(description);
  },
};
