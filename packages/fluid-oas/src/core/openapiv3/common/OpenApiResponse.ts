import {
  withContent,
  withDescription,
  withHeaders,
  withLinks,
} from "../../../common/common";
import type { OpenApiMediaContentType } from "../../../common/types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiHeader } from "./OpenApiHeader";
import type { OpenApiLink } from "./OpenApiLink";
import type { OpenApiMediaType } from "./OpenApiMedia";

const ResponseBase = withLinks(withContent(withHeaders(withDescription(Base))));

export interface OpenApiResponse extends BaseInterface {
  addDescription(description: string): this;
  addHeader(name: string, val: OpenApiHeader): this;
  addContent(name: OpenApiMediaContentType, val: OpenApiMediaType): this;
  addLink(name: string, val: OpenApiLink): this;
}

class _OpenApiResponse extends ResponseBase implements OpenApiResponse {}

export function Response(description: string): OpenApiResponse {
  return new _OpenApiResponse().addDescription(description);
}
