import { withUnionTypes } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const TypeArrayBase = withUnionTypes(
  SchemaBase<OpenApiSchema>
)<OpenApiSchema>();

type omitValues =
  | "addEnums"
  | "addDefault"
  | "addReadOnly"
  | "addWriteOnly"
  | "addNullable";

/**
 * A special type of schema, used for multiple "types" as specified in the latest JSON Schema.
 */
export interface OpenApiUnion
  extends Omit<SchemaInterface<OpenApiSchema>, omitValues> {
  /**
   * Compose multiple OpenApi schema types.
   * @param val - A list of schema types to union over, creating a union schema.
   */
  ofTypes(...val: OpenApiSchema[]): this;
}

class _OpenApiUnion extends TypeArrayBase implements OpenApiUnion {}

/**
 * A special utility schema to capture multple types into one.
 *
 * WARNING: If multiple schemas have the same field type, one may overwrite another.
 * In addition, do not provide multiple of the same schema types, doing so will result
 * in those schema types overwriting each other.
 */
export const Union = (...val: OpenApiSchema[]): OpenApiUnion => {
  if (val.length === 0) {
    throw new Error("Schemas cannot be empty.");
  }
  return new _OpenApiUnion().ofTypes(...val);
};
