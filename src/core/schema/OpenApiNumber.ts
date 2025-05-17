import {
  withDefault,
  withExclusiveMaximum,
  withExclusiveMinimum,
  withFormat,
  withMaximum,
  withMinimum,
  withMultipleOf,
} from "../../common/common";
import { SchemaBase } from "../common/base";

const NumberBase = withDefault(
  withMultipleOf(
    withExclusiveMinimum(
      withExclusiveMaximum(withMaximum(withMinimum(SchemaBase)))
    )
  )
)<number>();
const _NumberBaseImpl = withFormat(NumberBase)<"float" | "double">();

const _IntegerBaseImpl = withFormat(NumberBase)<"int32" | "int64">();

class _OpenApiNumber extends _NumberBaseImpl {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "number", enumerable: true });
    return json;
  }
}

class _OpenApiInteger extends _IntegerBaseImpl {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "number", enumerable: true });
    return json;
  }
}

export const Number = () => new _OpenApiNumber();
export type Number = _OpenApiNumber;
export const Integer = () => new _OpenApiInteger();
export type Integer = _OpenApiInteger;
