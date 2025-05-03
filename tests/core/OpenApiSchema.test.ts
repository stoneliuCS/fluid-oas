import { describe, expect, test } from "bun:test";
import {
  OpenApiInteger,
  OpenApiNumber,
  OpenApiString,
} from "../../src/core/OpenApiSchema";

describe("OpenAPI schema String tests", () => {
  const openapiString = OpenApiString;

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

describe("OpenAPI Schema Number tests.", () => {
  const openapiInteger = OpenApiInteger;
  const openapiNumber = OpenApiNumber;

  test("Test add minimum", () => {
    const actualInteger = openapiInteger.addMinimum(2).toJSON();
    const actualNumber = openapiNumber.addMinimum(30).toJSON();
    expect(actualInteger).toMatchObject({ type: "integer", minimum: 2 });
    expect(actualNumber).toMatchObject({ type: "number", minimum: 30 });
  });

  test("Test add maximum", () => {
    const actualInteger = openapiInteger.addMaximum(2).toJSON();
    const actualNumber = openapiNumber.addMaximum(30).toJSON();
    expect(actualInteger).toMatchObject({ type: "integer", maximum: 2 });
    expect(actualNumber).toMatchObject({ type: "number", maximum: 30 });
  });

  test("Test add exclusiveMaximum", () => {
    const actualInteger = openapiInteger
      .addMaximum(2)
      .addExclusiveMaximum(true)
      .toJSON();
    const actualNumber = openapiNumber
      .addMaximum(30)
      .addExclusiveMaximum(true)
      .toJSON();
    expect(actualInteger).toMatchObject({
      type: "integer",
      maximum: 2,
      exclusiveMaximum: true,
    });
    expect(actualNumber).toMatchObject({
      type: "number",
      maximum: 30,
      exclusiveMaximum: true,
    });
  });

  test("Test add exclusiveMinimum", () => {
    const actualInteger = openapiInteger
      .addMinimum(2)
      .addExclusiveMinimum(true)
      .toJSON();
    const actualNumber = openapiNumber
      .addMinimum(30)
      .addExclusiveMinimum(true)
      .toJSON();
    expect(actualInteger).toMatchObject({
      type: "integer",
      minimum: 2,
      exclusiveMinimum: true,
    });
    expect(actualNumber).toMatchObject({
      type: "number",
      minimum: 30,
      exclusiveMinimum: true,
    });
  });

  test("Test add multipleOf", () => {
    const actualInteger = openapiInteger.addMultipleOf(10).toJSON();
    const actualNumber = openapiNumber.addMultipleOf(10).toJSON();
    expect(actualInteger).toMatchObject({
      type: "integer",
      multipleOf: 10,
    });
    expect(actualNumber).toMatchObject({
      type: "number",
      multipleOf: 10,
    });
  });
});
