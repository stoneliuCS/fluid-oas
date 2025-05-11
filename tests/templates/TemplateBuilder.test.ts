import { describe, test } from "bun:test";
import { TemplateBuilder } from "../../src/templates/TemplateBuilder";
import { Project } from "ts-morph";

describe("Template Builder Tests", () => {
  const testProject = new Project();
  test("Writing to Builder", () => {
    const templateBuilder = new TemplateBuilder(testProject);
  });
});
