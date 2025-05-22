import {
  withContent,
  withDescription,
  withHeaders,
  withLinks,
} from "../../common/common";
import { Base } from "./base";

const ResponseBase = withLinks(withContent(withHeaders(withDescription(Base))));

class _OpenApiResponse extends ResponseBase {}

export function Response(description: string) {
  return new _OpenApiResponse().description(description);
}
export type OpenApiResponse = _OpenApiResponse;
