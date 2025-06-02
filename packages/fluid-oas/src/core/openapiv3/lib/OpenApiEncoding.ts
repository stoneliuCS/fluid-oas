import {
  withAllowReserved,
  withContentType,
  withExplode,
  withHeaders,
  withStyle,
} from "../common";
import type { OpenApiMediaContentType } from "../types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiHeader } from "./OpenApiHeader";
import type { OpenApiReferenceObject } from "./OpenApiReferenceObject";

const EncodingBase = withAllowReserved(
  withExplode(withStyle(withHeaders(withContentType(Base)))<string>())
);

export interface OpenApiEncoding extends BaseInterface {
  addHeaders(
    mappings: Partial<{
      [K in string]: OpenApiHeader | OpenApiReferenceObject;
    }>
  ): this;
  addContentType(val: OpenApiMediaContentType): this;
  addExplode(explode: boolean): this;
  addAllowReserved(allowReserved: boolean): this;
  addStyle(style: string): this;
}

class _OpenApiEncoding extends EncodingBase implements OpenApiEncoding {}

export const Encoding: OpenApiEncoding = new _OpenApiEncoding();
