import {
  withAdditionalProperties,
  withDefault,
  withProperty,
  withRequiredEnumerable,
} from "../../common/common";
import { SchemaBase } from "../common/base";

const ObjectBase = withAdditionalProperties(
  withRequiredEnumerable(
    withProperty(withDefault(SchemaBase)<Object>())
  )<string>()
);

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
export function Object() {
  return new _OpenApiObject();
}
