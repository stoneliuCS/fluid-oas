import {
  withAdditionalItems,
  withItems,
  withMaxItems,
  withMinItems,
  withPrefixItems,
} from "../common";
import type { OpenApiReferenceObject } from "../lib";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ArrayBase = withAdditionalItems(
  withPrefixItems(withItems(withMaxItems(withMinItems(SchemaBase<any[]>))))()
);

/**
 * Arrays are used for ordered elements. In JSON, each element in an array may be of a different type.
 */
export interface OpenApiArray extends SchemaInterface<any[]> {
  addAdditionalItems(val: OpenApiSchema | OpenApiReferenceObject): this;
  addPrefixItems(val: (OpenApiSchema | OpenApiReferenceObject)[]): this;
  addMinItems(minItems: number): this;
  addMaxItems(maxItems: number): this;
  addItems(itemTypes: OpenApiSchema | OpenApiReferenceObject): this;
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
