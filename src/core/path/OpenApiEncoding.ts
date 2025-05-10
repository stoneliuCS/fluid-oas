import { Base, withContentType, withHeadersMap } from "../common/common";

const EncodingBase = withHeadersMap(withContentType(Base)<string>());

class _OpenApiEncoding extends EncodingBase {}

export const OpenApiEncoding = new _OpenApiEncoding();
export type OpenApiEncoding = _OpenApiEncoding;
