import {
  withAdditionalProperties,
  withRequiredEnumerable,
  withProperties,
  withDefault,
} from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ObjectBase = withAdditionalProperties(
  withRequiredEnumerable(
    withProperties(withDefault(SchemaBase)<OpenApiObject>())
  )<string>()
);

export interface OpenApiObject extends SchemaInterface {
  addDefault(val: OpenApiObject): this;
  addProperties(mappings: Partial<{ [K in string]: OpenApiSchema }>): this;
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

/**
 * Creates an OpenAPIObject representation with fluid methods to build schemas.
 */
export function Object(
  mappings: Partial<{ [K in string]: OpenApiSchema }>
): OpenApiObject {
  return new _OpenApiObject().addProperties(mappings);
}
