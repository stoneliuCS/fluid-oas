import { withUnionTypes } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const TypeArrayBase = withUnionTypes(
  SchemaBase<OpenApiSchema>
)<OpenApiSchema>();

/**
 * A special type of schema, used for multiple "types" as specified in the latest JSON Schema.
 */
export interface OpenApiUnion extends SchemaInterface<OpenApiSchema> {
  /**
   * Compose multiple OpenApi schema types.
   * @param val - A list of schema types to union over, creating a union schema.
   */
  ofTypes(...val: OpenApiSchema[]): this;
}

class _OpenApiUnion extends TypeArrayBase implements OpenApiUnion {}

export const Union: OpenApiUnion = new _OpenApiUnion();
