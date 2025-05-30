import {
  withAllowReserved,
  withContentType,
  withExplode,
  withHeaders,
  withStyle,
} from "../common";
import { Base, type BaseInterface } from "./base";

const EncodingBase = withAllowReserved(
  withExplode(withStyle(withHeaders(withContentType(Base)))<string>())
);

export interface OpenApiEncoding extends BaseInterface {
  addExplode(explode : boolean): this;
  addAllowReserved(allowReserved : boolean): this;
  addStyle(style: string): this;
}

class _OpenApiEncoding extends EncodingBase implements OpenApiEncoding {}

export function Encoding(): OpenApiEncoding {
  return new _OpenApiEncoding();
}
