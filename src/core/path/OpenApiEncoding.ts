import {
  Base,
  withAllowReserved,
  withContentType,
  withExplode,
  withHeadersMap,
  withStyle,
} from "../common/common";

const EncodingBase = withAllowReserved(
  withExplode(
    withStyle(withHeadersMap(withContentType(Base)<string>()))<string>(),
  ),
);

class _OpenApiEncoding extends EncodingBase {}

export const OpenApiEncoding = () => new _OpenApiEncoding();
export type OpenApiEncoding = _OpenApiEncoding;
