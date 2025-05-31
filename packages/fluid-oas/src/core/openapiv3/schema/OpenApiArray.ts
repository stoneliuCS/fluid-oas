import {
  withAdditionalItems,
  withItems,
  withMaxItems,
  withMinItems,
  withPrefixItems,
} from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ArrayBase = withAdditionalItems(
  withPrefixItems(withItems(withMaxItems(withMinItems(SchemaBase<any[]>))))()
);

/**
 * Arrays are used for ordered elements. In JSON, each element in an array may be of a different type.
 */
export interface OpenApiArray extends SchemaInterface<any[]> {
  addAdditionalItems(val: OpenApiSchema | boolean): this;
  addPrefixItems(val: OpenApiSchema[]): this;
  addMinItems(minItems: number): this;
  addMaxItems(maxItems: number): this;
  addItems(itemTypes: OpenApiSchema): this;
}

class _OpenApiArray extends ArrayBase implements OpenApiArray {
  toJSON(): unknown {
    const json = super.toJSON();
    globalThis.Object.defineProperty(json, "type", {
      value: "array",
      enumerable: true,
    });
    return json;
  }
}

export const Array: OpenApiArray = new _OpenApiArray();

