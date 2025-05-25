import { withDefault } from "../../common/common";
import { SchemaBase, type SchemaInterface } from "../common/base";

const BooleanBase = withDefault(SchemaBase)<boolean>();

export interface OpenApiBoolean extends SchemaInterface {
  addDefault(val: boolean): this;
}

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
