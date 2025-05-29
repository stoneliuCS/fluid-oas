import {
  withAdditionalProperties,
  withRequiredEnumerable,
  withProperties,
  withDefault,
  withUnevaluatedProperties,
  withPropertyNames,
  withMinProperties,
  withMaxProperties,
} from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const ObjectBase = withMaxProperties(
  withMinProperties(
    withPropertyNames(
      withUnevaluatedProperties(
        withAdditionalProperties(
          withRequiredEnumerable(
            withProperties(withDefault(SchemaBase)<OpenApiObject>())
          )<string>()
        )
      )
    )
  )
);

export interface OpenApiObject extends SchemaInterface {
  addMaxProperties(val: number): this;
  addMinProperties(val: number): this;
  addPropertyNames(mappings: Partial<{ [K in string]: string }>): this;
  addUnevaluatedProperties(): this;
  addDefault(val: OpenApiObject): this;
  addProperties(mappings: Partial<{ [K in string]: OpenApiSchema }>): this;
  addRequired(val: string[]): this;
  additionalProperties(additionalProperties: boolean | OpenApiSchema): this;
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
 * Convienence function to create a OpenApi Object.
 * @param mappings - Properties of the object.
 */
export function Object(
  mappings?: Partial<{ [K in string]: OpenApiSchema }>
): OpenApiObject {
  if (mappings) {
    return new _OpenApiObject().addProperties(mappings);
  } else {
    return new _OpenApiObject();
  }
}
