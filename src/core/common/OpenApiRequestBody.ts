import {
  withContent,
  withDescription,
  withRequired,
} from "../../common/common";
import type { OpenApiMediaContentType } from "../../common/types";
import { Base } from "./base";
import type { OpenApiMediaType } from "./OpenApiMedia";

const RequestBodyBase = withRequired(withContent(withDescription(Base)));

class _OpenApiRequestBody extends RequestBodyBase {}

export function RequestBody(content: OpenApiMediaContentType) {
  return {
    with: (media: OpenApiMediaType) => {
      return new _OpenApiRequestBody().content(content).with(media);
    },
  };
}

export type OpenApiRequestBody = _OpenApiRequestBody;
