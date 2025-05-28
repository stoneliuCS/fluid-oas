import { withUnionTypes } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const TypeArrayBase = withUnionTypes(SchemaBase)<OpenApiSchema | null>();

export interface OpenApiUnion extends SchemaInterface {
  ofTypes(val: (OpenApiSchema | null)[]): this;
}

class _OpenApiUnion extends TypeArrayBase implements OpenApiUnion {
  toJSON() {
    const json = Object.create(super.toJSON() as Object);
    if (this._type !== undefined) {
      let types: (string | null)[] = [];
      this._type.forEach(val => {
        if (val) {
          const typeInfo = val.toJSON() as { type: string };
          types.push(typeInfo.type);
        } else {
          types.push(val);
        }
      });
      Object.defineProperty(json, "type", {
        value: types,
        enumerable: true,
      });
    }
    return json;
  }
}

/**
 * UNSTABLE API, currently only supports very simple types.
 * @param val - OpenApiSchema[]
 * @returns OpenApiUnion
 */
export function Union(...val: (OpenApiSchema | null)[]): OpenApiUnion {
  return new _OpenApiUnion().ofTypes(val);
}
