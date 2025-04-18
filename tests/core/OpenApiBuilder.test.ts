import { describe, beforeAll, it, expect } from "bun:test";
import { OpenApiBuilder } from "../../src/core/OpenApiBuilder";
import { MetadataVisitor } from "../../src/core/OpenApiOperator";

describe("Metadata tests for OpenAPIBuilder class.", () => {
  let apiBuilder: OpenApiBuilder;

  beforeAll(() => {
    apiBuilder = new OpenApiBuilder();
  });
  it("OpenApiBuilder immutability tests with metadata visitor", () => {
    const metadata = new MetadataVisitor()
      .with("info", {
        title: "beginningMetadata",
        version: "1.0.0",
        summary: "Hello",
        description: "Best Api",
        license: {
          name: "Stone Liu",
          identifier: "Something",
        },
      })
      .with("openApiVersion", "3.1");
    const newBuilder = apiBuilder.accept(metadata);
    expect(apiBuilder.metadata).toBeUndefined();
    expect(newBuilder.metadata).not.toBeUndefined();
  });
});
