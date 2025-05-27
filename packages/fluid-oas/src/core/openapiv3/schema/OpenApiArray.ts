import { withItems, withMaxItems, withMinItems } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ArrayBase = withItems(withMaxItems(withMinItems(SchemaBase)));

export interface OpenApiArray extends SchemaInterface {
  addMinItems(minItems: number): this;
  addMaxItems(maxItems: number): this;
  addItemTypes(itemTypes: OpenApiSchema): this;
}

class _OpenApiArray extends ArrayBase implements OpenApiArray {}

export function Array(itemtypes: OpenApiSchema): OpenApiArray {
  return new _OpenApiArray().addItemTypes(itemtypes);
}
