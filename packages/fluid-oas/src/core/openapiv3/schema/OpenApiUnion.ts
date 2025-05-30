import { withUnionTypes } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const TypeArrayBase = withUnionTypes(SchemaBase)<OpenApiSchema | null>();

export interface OpenApiUnion extends SchemaInterface {
  ofTypes(val: (OpenApiSchema | null)[]): this;
}

class _OpenApiUnion extends TypeArrayBase implements OpenApiUnion {}

/**
 * Creates a multiple type OpenApiSchema.
 *
 * This preserves the properties from each schema, which could be subject to change since
 * the official JSON schema is a little ambigious about this
 *
 * Only viable on 3.1.* schema.
 *
 * @param val - OpenApiSchema[]
 * @returns OpenApiUnion
 */
export function Union(...val: (OpenApiSchema | null)[]): OpenApiUnion {
  return new _OpenApiUnion().ofTypes(val);
}
