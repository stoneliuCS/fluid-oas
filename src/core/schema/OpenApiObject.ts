import { withDefault, withProperty } from "../../common/common";
import { SchemaBase } from "../common/base";

const ObjectBase = withProperty(withDefault(SchemaBase)<Object>());

class _OpenApiObject extends ObjectBase {
  toJSON(): unknown {
    const json = super.toJSON();
    globalThis.Object.defineProperty(json, "type", {
      value: "object",
      enumerable: true,
    });
    return json;
  }
}

export type OpenApiObject = _OpenApiObject;
export const Object = () => new _OpenApiObject();
