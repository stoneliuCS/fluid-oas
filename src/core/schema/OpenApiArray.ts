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

  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", {
      value: this._type,
      enumerable: true,
    });
    if (this._items) {
      Object.defineProperty(json, "items", {
        value: this._items.toJSON(),
        enumerable: true,
      });
    }
    if (this._uniqueItems) {
      Object.defineProperty(json, "uniqueItems", {
        value: this._uniqueItems,
        enumerable: true,
      });
    }
    return json;
  }

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
