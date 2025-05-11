import {
  SchemaBase,
  withDefault,
  withMaximum,
  withMinimum,
  withNullable,
} from "../common/common";
import type { OpenApiSchema } from "./OpenApiSchema";

const ArrayBase = withNullable(
  withMaximum(
    withMinimum(withDefault(SchemaBase)<OpenApiArrayType>())("minItems")
  )("maxItems")
);

class _OpenApiArray extends ArrayBase {
  private readonly _type: string = "array";
  private _items?: OpenApiSchema;
  private _uniqueItems?: boolean;

  public constructor(items: OpenApiSchema) {
    super();
    this._items = items;
  }

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

  unique() {
    const copy: this = Object.create(this);
    copy._uniqueItems = true;
    return copy;
  }
}

export const OpenApiArray = (items: OpenApiSchema) => new _OpenApiArray(items);
export type OpenApiArrayType = _OpenApiArray;
