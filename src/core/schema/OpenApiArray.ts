import {
  SchemaBase,
  withDefault,
  withMaximum,
  withMinimum,
} from "../common/common";
import type { OpenApiSchema } from "./OpenApiSchema";

const ArrayBase = withMaximum(
  withMinimum(withDefault(SchemaBase)<OpenApiArrayType>())("minItems"),
)("maxItems");

class _OpenApiArray extends ArrayBase {
  private readonly _type: string = "array";
  private _items?: OpenApiSchema;
  private _uniqueItems?: boolean;

  items(items: OpenApiSchema) {
    const copy: this = Object.create(this);
    copy._items = items;
    return copy;
  }

  unique() {
    const copy: this = Object.create(this);
    copy._uniqueItems = true;
    return copy;
  }
}

export const OpenApiArray = new _OpenApiArray();
export type OpenApiArrayType = _OpenApiArray;
