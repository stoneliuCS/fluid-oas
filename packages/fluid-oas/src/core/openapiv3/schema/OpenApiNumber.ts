import {
  withEnum,
  withDefault,
  withMultipleOf,
  withExclusiveMinimum,
  withExclusiveMaximum,
  withMaximum,
  withMinimum,
  withFormat,
} from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";

const NumberBase = withEnum(
  withDefault(
    withMultipleOf(
      withExclusiveMinimum(
        withExclusiveMaximum(withMaximum(withMinimum(SchemaBase)))
      )
    )
  )<number>()
)<number>();

interface OpenApiBaseNumber extends SchemaInterface {
  addMinimum(min: number): this;
  addMaximum(max: number): this;
  exclusiveMax(max: number): this;
  exclusiveMin(min: number): this;
  addMultiple(val: number): this;
  addDefault(val: number): this;
  addEnums(val: number[]): this;
}

export interface OpenApiNumber extends OpenApiBaseNumber {
  addFormat(val: "float" | "double"): this;
}

export interface OpenApiInteger extends OpenApiBaseNumber {
  addFormat(val: "int32" | "int64"): this;
}

const _NumberBaseImpl = withFormat(NumberBase)<"float" | "double">();

const _IntegerBaseImpl = withFormat(NumberBase)<"int32" | "int64">();

class _OpenApiNumber extends _NumberBaseImpl implements OpenApiNumber {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "number", enumerable: true });
    return json;
  }
}

class _OpenApiInteger extends _IntegerBaseImpl implements OpenApiInteger {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "number", enumerable: true });
    return json;
  }
}

/**
 * Create an OpenAPINumber builder.
 */
export function Number(): OpenApiNumber {
  return new _OpenApiNumber();
}
export function Integer(): OpenApiInteger {
  return new _OpenApiInteger();
}
