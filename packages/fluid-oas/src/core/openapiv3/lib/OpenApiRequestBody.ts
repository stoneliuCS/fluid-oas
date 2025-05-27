import {
  withContent,
  withDescription,
  withRequired,
} from "../common";
import type { OpenApiMediaContentType } from "../types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiMediaType } from "./OpenApiMedia";

const RequestBodyBase = withRequired(withContent(withDescription(Base)));

export interface OpenApiRequestBody extends BaseInterface {
  addDescription(description: string): this;
  addContent(name: OpenApiMediaContentType, val: OpenApiMediaType): this;
  required(): this;
}

class _OpenApiRequestBody
  extends RequestBodyBase
  implements OpenApiRequestBody {}

export function RequestBody(content: OpenApiMediaContentType) {
  return {
    with: (media: OpenApiMediaType): OpenApiRequestBody => {
      return new _OpenApiRequestBody().addContent(content, media);
    },
  };
}
