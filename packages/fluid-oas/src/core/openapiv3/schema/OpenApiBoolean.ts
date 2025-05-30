import { SchemaBase, type SchemaInterface } from "../lib/base";

const BooleanBase = SchemaBase<boolean>;

export interface OpenApiBoolean extends SchemaInterface<boolean> {}

class _OpenApiBoolean extends BooleanBase implements OpenApiBoolean {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "boolean", enumerable: true });
    return json;
  }
}

export function Boolean(): OpenApiBoolean {
  return new _OpenApiBoolean();
}
