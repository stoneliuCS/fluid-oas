import {
  Base,
  withContent,
  withDescription,
  withRequired,
} from "../common/common";

const RequestBase = withRequired(withContent(withDescription(Base)));

class _OpenApiRequest extends RequestBase {}

export const OpenApiRequest = new _OpenApiRequest();
export type OpenApiRequest = _OpenApiRequest;
