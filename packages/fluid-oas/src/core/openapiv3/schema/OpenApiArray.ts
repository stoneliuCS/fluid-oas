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
  withPrefixItems(
    withItems(withMaxItems(withMinItems(SchemaBase<OpenApiArray>)))
  )()
);

/**
 * Arrays are used for ordered elements. In JSON, each element in an array may be of a different type.
 */
export interface OpenApiArray extends SchemaInterface<OpenApiArray> {
  addAdditionalItems(val: OpenApiSchema | boolean): this;
  addPrefixItems(val: OpenApiSchema[]): this;
  addMinItems(minItems: number): this;
  addMaxItems(maxItems: number): this;
  addItems(itemTypes: OpenApiSchema): this;
}

class _OpenApiArray extends ArrayBase implements OpenApiArray {}

export const Array: OpenApiArray = new _OpenApiArray();
