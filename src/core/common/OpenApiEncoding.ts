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

export interface OpenApiEncoding extends BaseInterface {
  explode(): this;
  allowReserved(): this;
  addStyle(style: string): this;
}

class _OpenApiEncoding extends EncodingBase implements OpenApiEncoding {}

export function Encoding(): OpenApiEncoding {
  return new _OpenApiEncoding();
}
