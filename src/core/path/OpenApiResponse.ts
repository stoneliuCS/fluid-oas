import {
  Base,
  withContentMap,
  withDescription,
  withHeadersMap,
  withLinksMap,
} from "../common/common";

const ResponseBase = withLinksMap(
  withContentMap(withHeadersMap(withDescription(Base)))
);

class _OpenApiResponse extends ResponseBase {}

export const OpenApiResponse = () => new _OpenApiResponse();
export type OpenApiResponse = _OpenApiResponse;
