import {
  Base,
  withContentMap,
  withDescription,
  withRequired,
} from '../common/common';

const RequestBase = withRequired(withContentMap(withDescription(Base)));

class _OpenApiRequest extends RequestBase {}

export const OpenApiRequest = () => new _OpenApiRequest();
export type OpenApiRequest = _OpenApiRequest;
