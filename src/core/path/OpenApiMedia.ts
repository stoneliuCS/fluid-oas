import {
  Base,
  withEncodings,
  withExample,
  withExamples,
  withSchema,
} from "../common/common";

const MediaBase = withEncodings(withExamples(withExample(withSchema(Base))));

class _OpenApiMedia extends MediaBase {}

export const OpenApiMedia = new _OpenApiMedia();
export type OpenApiMedia = _OpenApiMedia;
