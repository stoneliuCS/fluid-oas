import {
  withMultipleOf,
  withExclusiveMinimum,
  withExclusiveMaximum,
  withMaximum,
  withMinimum,
  withFormat,
  withExclusiveMinimumBoolean,
  withExclusiveMaximumBoolean,
} from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";

const NumberBase = withMultipleOf(
  withExclusiveMaximumBoolean(
    withExclusiveMinimumBoolean(
      withExclusiveMinimum(
        withExclusiveMaximum(withMaximum(withMinimum(SchemaBase<number>)))
      )
    )
  )
);

interface OpenApiBaseNumber extends SchemaInterface<Number> {
  /**
   * Adds a minimum to this number schema.
   * @param min - Minimum bound for this number.
   */
  addMinimum(min: number): this;
  /**
   * Adds a maximum to this number schema.
   * @param max - Maximum bound for this number.
   */
  addMaximum(max: number): this;
  /**
   * Adds an exclusive maximum to this number.
   *
   * As of OpenApi v3.1.* exclusiveMax is now a number not a boolean.
   * @param max - Maximum bound for this number.
   */
  addExclusiveMax(max: number): this;
  addExclusiveMax(max: boolean): this;
  /**
   * Adds an exclusive minimum to this number.
   *
   * As of OpenApi v3.1.* exclusiveMin is now a number not a boolean.
   * @param min - Minimum bound for this number.
   */
  addExclusiveMin(min: number): this;
  addExclusiveMin(min: boolean): this;
  /**
   * Adds a multiple to validate numbers against.
   * @param multipleOf - Constrain numbers to be multiples of the given value.
   */
  addMultiple(multipleOf: number): this;
}

/**
 * A Number representation of the JSON numberschema.
 */
export interface OpenApiNumber extends OpenApiBaseNumber {
  addFormat(val: "float" | "double"): this;
}

/**
 * A Integer representation of the JSON number schema.
 */
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
    Object.defineProperty(json, "type", { value: "integer", enumerable: true });
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
