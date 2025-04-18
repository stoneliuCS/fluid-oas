import { describe, beforeAll } from "bun:test";
import { OpenApiBuilder } from "../../src/core/OpenApiBuilder";
import { MetadataVisitor, RouteVisitor } from "../../src/core/OpenApiOperator";

let apiBuilder: OpenApiBuilder;

beforeAll(() => {
  apiBuilder = new OpenApiBuilder();
});

describe("Add Metadata tests for OpenAPIBuilder class.", () => {
  const metadata = new MetadataVisitor();
  const healthcheck = new RouteVisitor();
  metadata.with("title", "val").with("title", "val");
  healthcheck.with("apiRoute", "").with("type", "POST");
  apiBuilder.accept(metadata);
});
