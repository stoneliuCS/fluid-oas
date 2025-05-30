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
)();

export interface OpenApiArray extends SchemaInterface<OpenApiArray> {
  addAdditionalItems(val: (OpenApiSchema | boolean)[]): this;
  addPrefixItems(val: OpenApiSchema[]): this;
  addMinItems(minItems: number): this;
  addMaxItems(maxItems: number): this;
  addItemTypes(itemTypes: OpenApiSchema): this;
}

class _OpenApiArray extends ArrayBase implements OpenApiArray {}

export function Array(itemtypes: OpenApiSchema): OpenApiArray {
  return new _OpenApiArray().addItemTypes(itemtypes);
}
