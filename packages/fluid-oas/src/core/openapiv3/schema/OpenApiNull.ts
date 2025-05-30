import { SchemaBase, type SchemaInterface } from "../lib/base";

const NullBase = SchemaBase<null>;

export interface OpenApiNull extends SchemaInterface<null> {}

class _OpenApiNull extends NullBase implements OpenApiNull {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "null", enumerable: true });
    return json;
  }
}

export function Null(): OpenApiNull {
  return new _OpenApiNull();
}
