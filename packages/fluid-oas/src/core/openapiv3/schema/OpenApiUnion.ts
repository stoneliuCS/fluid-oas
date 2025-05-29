import { withUnionTypes } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const TypeArrayBase = withUnionTypes(SchemaBase)<OpenApiSchema | null>();

export interface OpenApiUnion extends SchemaInterface {
  ofTypes(val: (OpenApiSchema | null)[]): this;
}

class _OpenApiUnion extends TypeArrayBase implements OpenApiUnion {}

/**
 * Merges specifications into one..
 * @param val - OpenApiSchema[]
 * @returns OpenApiUnion
 */
export function Union(...val: (OpenApiSchema | null)[]): OpenApiUnion {
  return new _OpenApiUnion().ofTypes(val);
}
