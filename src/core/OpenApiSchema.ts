import type { OpenApiSchemaType } from "../types/OpenApiTypes";

// Define corresponding return types for each schema type
class OpenApiSchemaPrimitive {}

class OpenApiSchemaObject {}

class OpenApiSchemaArray {}

export class OpenApiSchema {
  // Use the generic type parameter and the conditional mapping type

  public static create(type : "string") : OpenApiSchemaPrimitive
  public static create(type : "number") : OpenApiSchemaPrimitive
  public static create(type : "boolean") : OpenApiSchemaPrimitive
  public static create(type : "null") : OpenApiSchemaPrimitive
  public static create(type : "integer") : OpenApiSchemaPrimitive 
  public static create(type : "object") : OpenApiSchemaObject 
  public static create(type : "array") : OpenApiSchemaArray 
  public static create(type: OpenApiSchemaType) {
    if (
      type === "string" ||
      type === "number" ||
      type === "boolean" ||
      type === "null"
    ) {
      return new OpenApiSchemaPrimitive();
    }
    if (type === "object") {
      return new OpenApiSchemaObject();
    }
    if (type === "array") {
      return new OpenApiSchemaArray();
    }
    throw new Error("Not Found");
  }
}

const primitve = OpenApiSchema.create("null");
const array = OpenApiSchema.create("array");
