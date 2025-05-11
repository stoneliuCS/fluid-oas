import { describe, test } from "bun:test";
import { TemplateBuilder } from "../../src/templates/TemplateBuilder";

describe("Template Builder Tests", () => {
  test("Writing to Builder", () => {
    const templateBuilder = new TemplateBuilder();
    templateBuilder
      .write("common.ts")
      .writeFunction.name("withAllowReserved")
      .writeBody((writer) => {});
  });
});
