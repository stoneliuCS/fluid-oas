import {
  Base,
  withEncodings,
  withExample,
  withExamplesMap,
  withSchema,
} from '../common/common';

const MediaBase = withEncodings(withExamplesMap(withExample(withSchema(Base))));

class _OpenApiMedia extends MediaBase {}

export const OpenApiMedia = () => new _OpenApiMedia();
export type OpenApiMedia = _OpenApiMedia;
