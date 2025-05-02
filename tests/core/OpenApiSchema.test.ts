import { describe, expect, test } from "bun:test";
import { OpenApiSchema } from "../../src/core/OpenApiSchema";

describe("OpenAPI schema string tests", () => {
  const openapiString = OpenApiSchema.create("string");

  test("Test instantiating an openapi string schema", () => {
    const actualJSON = openapiString.toJSON();
    expect(actualJSON).toMatchObject({ type: "string" });
  });

  test("Test add description to openapi string schema", () => {
    const actual = openapiString.addDescription("Test").toJSON();
    expect(actual).toMatchObject({ type: "string", description: "Test" });
  });

  test("Test adding example", () => {
    const actual = openapiString.addExample("Some String").toJSON();
    expect(actual).toMatchObject({ type: "string", example: "Some String" });
  });

  test("Test adding format", () => {
    const actual = openapiString.addFormat("uuid").toJSON();
    expect(actual).toMatchObject({ type: "string", format: "uuid" });
  });

  test("Test add minLength", () => {
    const actual = openapiString.addMinLength(0).toJSON();
    expect(actual).toMatchObject({ type: "string", minLength: 0 });
  });

  test("Test add maxLength", () => {
    const actual = openapiString.addMaxLength(0).toJSON();
    expect(actual).toMatchObject({ type: "string", maxLength: 0 });
  });

  test("Test adding pattern", () => {
    const actual = openapiString.addPattern(/hello/);
    expect(actual).toMatchObject({ type: "string", pattern: /hello/ });
  });

  test("Test that min length and max length cannot have contridicting values", () => {
    expect(() =>
      openapiString.addMinLength(30).addMaxLength(20),
    ).toThrowError();

    expect(() =>
      openapiString.addMaxLength(20).addMinLength(3000),
    ).toThrowError();
  });

  test("Test min length or max length not a positive integer", () => {
    expect(() => openapiString.addMinLength(0.2)).toThrowError();
    expect(() => openapiString.addMinLength(-0.5)).toThrowError();
    expect(() => openapiString.addMaxLength(-1)).toThrowError();
    expect(() => openapiString.addMaxLength(0.1)).toThrowError();
  });
});
