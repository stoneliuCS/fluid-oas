import { describe, beforeAll } from "bun:test";
import { OpenApiBuilder } from "../../src/core/OpenApiBuilder";

let apiBuilder: OpenApiBuilder;

beforeAll(() => {
  apiBuilder = new OpenApiBuilder({
    info: { title: "TestBuilder", version: "1.0.0" },
    openApiVersion: "3.1",
  });
});

describe("Add Metadata tests for OpenAPIBuilder class.", () => {
});
