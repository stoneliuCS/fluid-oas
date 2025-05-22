import { withItems, withMaxItems, withMinItems } from "../../common/common";
import { SchemaBase } from "../common/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ArrayBase = withItems(withMaxItems(withMinItems(SchemaBase)));

class _OpenApiArray extends ArrayBase {}

export function Array(item: OpenApiSchema) {
  return new _OpenApiArray().items(item);
}
export type OpenApiArray = _OpenApiArray;
