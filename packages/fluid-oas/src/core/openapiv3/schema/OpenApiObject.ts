import {
  withAdditionalProperties,
  withRequiredEnumerable,
  withProperties,
  withUnevaluatedProperties,
  withMinProperties,
  withMaxProperties,
  withPatternProperties,
} from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ObjectBase = withMaxProperties(
  withMinProperties(
    withPatternProperties(
      withUnevaluatedProperties(
        withAdditionalProperties(
          withRequiredEnumerable(
            withProperties(SchemaBase<object>)
          )<string>()
        )
      )
    )
  )
);

export interface OpenApiObject extends SchemaInterface<object> {
  /**
   * Adds a maximum limit to the number of properties for this OpenApiObject.
   * @param val - The maximum properties this object can hold.
   */
  addMaxProperties(val: number): this;
  /**
   * Adds a minimum limit to the number of properties for this OpenApiObject.
   * @param val - The minimum properties this object can hold.
   */
  addMinProperties(val: number): this;
  /**
   * Adds pattern properties to this object, where each key is a regular expression
   * and each value is a schema.
   * @param mappings - RegExp as strings to schema mappings.
   */
  addPatternProperties(
    mappings: Partial<{ [K in string]: OpenApiSchema }>
  ): this;
  addUnevaluatedProperties(unevaluatedProperties: boolean): this;
  addProperties(mappings: Partial<{ [K in string]: OpenApiSchema }>): this;
  addRequired(val: string[]): this;
  addAdditionalProperties(additionalProperties: OpenApiSchema | boolean): this;
}

class _OpenApiObject extends ObjectBase implements OpenApiObject {
  toJSON(): unknown {
    const json = super.toJSON();
    globalThis.Object.defineProperty(json, "type", {
      value: "object",
      enumerable: true,
    });
    return json;
  }
}

export const Object: OpenApiObject = new _OpenApiObject();
