import {
  withAllowReserved,
  withContentType,
  withExplode,
  withHeaders,
  withStyle,
} from "../../common/common";
import { Base, type BaseInterface } from "./base";

const EncodingBase = withAllowReserved(
  withExplode(withStyle(withHeaders(withContentType(Base)))<string>())
);

interface Encoding extends BaseInterface {
  explode(): this;
  allowReserved(): this;
  addStyle(style: string): this;
}

class _OpenApiEncoding extends EncodingBase implements Encoding {}

export function Encoding(): Encoding {
  return new _OpenApiEncoding();
}
export type OpenApiEncoding = Encoding;
