import type { OpenApiSchemaType } from "../types/OpenApiTypes";

export class OpenApiSchema {}
export class OpenApiComponent {
  // Use the generic type parameter and the conditional mapping type
  public static create(type: "string"): OpenApiSchemaPrimitive;
  public static create(type: "number"): OpenApiSchemaPrimitive;
  public static create(type: "boolean"): OpenApiSchemaPrimitive;
  public static create(type: "integer"): OpenApiSchemaPrimitive;
  public static create(type: "object"): OpenApiSchemaObject;
  public static create(type: "array"): OpenApiSchemaArray;
  public static create(type: OpenApiSchemaType) {
    switch (type) {
      case "string":
      case "number":
      case "boolean":
      case "object":
      case "array":
      case "integer":
    }
  }
}
