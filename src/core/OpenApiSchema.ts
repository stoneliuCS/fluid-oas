import type { OpenApiSchemaType } from "../types/OpenApiTypes";

// Define corresponding return types for each schema type
class OpenApiSchemaPrimitive {}

class OpenApiSchemaObject {}

class OpenApiSchemaArray {}

// Create a mapping type that links input types to output types
type SchemaTypeMap<T extends OpenApiSchemaType> = T extends "string"
  ? OpenApiSchemaPrimitive
  : T extends "number"
    ? OpenApiSchemaPrimitive
    : T extends "boolean"
      ? OpenApiSchemaPrimitive
      : T extends "object"
        ? OpenApiSchemaObject
        : T extends "array"
          ? OpenApiSchemaArray
          : T extends "null"
            ? OpenApiSchemaPrimitive
            : never;

export class OpenApiSchema {
  // Use the generic type parameter and the conditional mapping type
  public static create<T extends OpenApiSchemaType>(type: T): SchemaTypeMap<T> {
    if (
      type === "string" ||
      type === "number" ||
      type === "boolean" ||
      type === "boolean" ||
      type === "null"
    ) {
      return new OpenApiSchemaPrimitive() as SchemaTypeMap<T>;
    }
    if (type === "object") {
      return new OpenApiSchemaObject() as SchemaTypeMap<T>;
    }
    if (type === "array") {
      return new OpenApiSchemaArray() as SchemaTypeMap<T>;
    }
    throw new Error("Not Found");
  }
}

const primitve = OpenApiSchema.create("null");
const array = OpenApiSchema.create("array");
