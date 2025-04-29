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
    switch (type) {
      case "string":
        return new OpenApiSchemaPrimitive() as SchemaTypeMap<T>;
      case "number":
        return new OpenApiSchemaPrimitive() as SchemaTypeMap<T>;
      case "boolean":
        return new OpenApiSchemaPrimitive() as SchemaTypeMap<T>;
      case "integer":
        return new OpenApiSchemaPrimitive() as SchemaTypeMap<T>;
      case "object":
        return new OpenApiSchemaObject() as SchemaTypeMap<T>;
      case "array":
        return new OpenApiSchemaArray() as SchemaTypeMap<T>;
      case "null":
        return new OpenApiSchemaArray() as SchemaTypeMap<T>;
    }
  }
}

const primitve = OpenApiSchema.create("null");
const array = OpenApiSchema.create("array");
