// Property tests for pertaining the OpenAPI schemas.
import { describe, expect, test } from "bun:test";
import { createRandomOpenApiNumberSchemas } from "../../src/lib/generator";

// Property one: All OpenAPINumbers methods when called must have an equivalent json property mapping

describe("All OpenAPINumbers must have the equivalent JSON property mappings", () => {
  test("Generating random openapinumbers must all have the correct openapi json fields.", () => {
    const numbers = createRandomOpenApiNumberSchemas(100000);
    numbers.forEach((number) => {
      expect(number.toJSON()).toContainKeys([
        "default",
        "nullable",
        "multipleOf",
        "format",
        "minimum",
        "maximum",
        "description",
      ]);
    });
  });
});
