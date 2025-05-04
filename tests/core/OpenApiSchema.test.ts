import { describe, expect, test } from "bun:test";
import {
  OpenApiInteger,
  OpenApiNumber,
  OpenApiObject,
  OpenApiString,
} from "../../src/core/OpenApiSchema";

describe("OpenAPI schema String tests", () => {
  const openapiString = OpenApiString;

  test("Test instantiating an openapi string schema", () => {
    const actualJSON = openapiString.toJSON();
    expect(actualJSON).toMatchObject({ type: "string" });
  });

  test("Test add description to openapi string schema", () => {
    const actual = openapiString.description("Test").toJSON();
    expect(actual).toMatchObject({ type: "string", description: "Test" });
  });

  test("Test adding example", () => {
    const actual = openapiString.example("Some String").toJSON();
    expect(actual).toMatchObject({ type: "string", example: "Some String" });
  });

  test("Test adding format", () => {
    const actual = openapiString.format("uuid").toJSON();
    expect(actual).toMatchObject({ type: "string", format: "uuid" });
  });

  test("Test add minLength", () => {
    const actual = openapiString.min(0).toJSON();
    expect(actual).toMatchObject({ type: "string", minLength: 0 });
  });

  test("Test add maxLength", () => {
    const actual = openapiString.max(0).toJSON();
    expect(actual).toMatchObject({ type: "string", maxLength: 0 });
  });

  test("Test adding pattern", () => {
    const actual = openapiString.pattern(/hello/).toJSON();
    expect(actual).toMatchObject({ type: "string", pattern: "hello" });
  });

  test("Test that min length and max length cannot have contridicting values", () => {
    expect(() => openapiString.min(30).max(20)).toThrowError();

    expect(() => openapiString.max(20).min(3000)).toThrowError();
  });

  test("Test min length or max length not a positive integer", () => {
    expect(() => openapiString.min(0.2)).toThrowError();
    expect(() => openapiString.min(-0.5)).toThrowError();
    expect(() => openapiString.min(-1)).toThrowError();
    expect(() => openapiString.max(0.1)).toThrowError();
  });
});

describe("OpenAPI Schema Number tests.", () => {
  const openapiInteger = OpenApiInteger;
  const openapiNumber = OpenApiNumber;

  test("Test add minimum", () => {
    const actualInteger = openapiInteger.min(2).toJSON();
    const actualNumber = openapiNumber.min(30).toJSON();
    expect(actualInteger).toMatchObject({ type: "integer", minimum: 2 });
    expect(actualNumber).toMatchObject({ type: "number", minimum: 30 });
  });

  test("Test add maximum", () => {
    const actualInteger = openapiInteger.max(2).toJSON();
    const actualNumber = openapiNumber.max(30).toJSON();
    expect(actualInteger).toMatchObject({ type: "integer", maximum: 2 });
    expect(actualNumber).toMatchObject({ type: "number", maximum: 30 });
  });

  test("Test add exclusiveMaximum", () => {
    const actualInteger = openapiInteger.max(2).exclusiveMax().toJSON();
    const actualNumber = openapiNumber.max(30).exclusiveMax().toJSON();
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
    const actualInteger = openapiInteger.min(2).exclusiveMin().toJSON();
    const actualNumber = openapiNumber.min(30).exclusiveMin().toJSON();
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
    const actualInteger = openapiInteger.multipleOf(10).toJSON();
    const actualNumber = openapiNumber.multipleOf(10).toJSON();
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

describe("OpenApi Object tests", () => {
  const object = OpenApiObject;
  test("test adding additional properties", () => {
    const actualTrue = object.additionalProperty(true);
    const actualFalse = object.additionalProperty(false);
    const actualStringSchema = object.additionalProperty(OpenApiString);
    const actualObjectSchema = object.additionalProperty(
      OpenApiObject.properties({ id: OpenApiString }),
    );
    expect(actualTrue.toJSON()).toMatchObject({
      type: "object",
      additionalProperties: true,
    });

    expect(actualFalse.toJSON()).toMatchObject({
      type: "object",
      additionalProperties: false,
    });

    expect(actualStringSchema.toJSON()).toMatchObject({
      type: "object",
      additionalProperties: {
        type: "string",
      },
    });

    expect(actualObjectSchema.toJSON()).toMatchObject({
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        },
      },
    });
  });
});
