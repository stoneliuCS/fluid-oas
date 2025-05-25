import {
  withAdditionalProperties,
  withDefault,
  withProperty,
  withRequiredEnumerable,
} from "../../common/common";
import { SchemaBase, type SchemaInterface } from "../common/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ObjectBase = withAdditionalProperties(
  withRequiredEnumerable(
    withProperty(withDefault(SchemaBase)<OpenApiObject>())
  )<string>()
);

export interface OpenApiObject extends SchemaInterface {
  addDefault(val: OpenApiObject): this;
  addProperty(propertyName: string, val: OpenApiSchema): this;
  addRequired(val: string[]): this;
  additionalProperties(): this;
}

class _OpenApiObject extends ObjectBase implements OpenApiObject {
  toJSON(): unknown {
    const json = super.toJSON();
    globalThis.Object.defineProperty(json, "type", {
      value: "object",
      enumerable: true,
    });
    return json;
  }
}

export function Object(): OpenApiObject {
  return new _OpenApiObject();
}
