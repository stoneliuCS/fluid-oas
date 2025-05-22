import {
  withContent,
  withDescription,
  withRequired,
} from "../../common/common";
import { Base } from "./base";
import type { OpenApiMediaType } from "./OpenApiMedia";

const RequestBodyBase = withRequired(withContent(withDescription(Base)));

class _OpenApiRequestBody extends RequestBodyBase {}

export function RequestBody(name: string) {
  return {
    with: (media: OpenApiMediaType) => {
      return new _OpenApiRequestBody().content(name).with(media);
    },
  };
}

export type OpenApiRequestBody = _OpenApiRequestBody;
