import { withDefault } from "../../common/common";
import { SchemaBase } from "../common/base";

const BooleanBase = withDefault(SchemaBase)<boolean>();

class _OpenApiBoolean extends BooleanBase {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "boolean", enumerable: true });
    return json;
  }
}

export const Boolean = new _OpenApiBoolean();
export type OpenApiBoolean = _OpenApiBoolean;
