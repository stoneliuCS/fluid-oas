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

  test("Nullable openapi types", () => {
    const nullableObjectSchema = object.nullable().nullable(); // All object schemas are idempotent.
    expect(nullableObjectSchema.toJSON()).toMatchObject({
      type: "object",
      nullable: true,
    });
  });

  test("parity among property vs properties", () => {
    const schema1 = OpenApiObject.property(
      "name",
      OpenApiString.min(1).description("Display name of the user."),
    )
      .property(
        "username",
        OpenApiString.min(1).description("The username of the user."),
      )
      .property(
        "id",
        OpenApiString.format("uuid")
          .example("5e91507e-5630-4efd-9fd4-799178870b10")
          .description("Unique identifier for the user."),
      )
      .property(
        "mode",
        OpenApiString.enum("BASIC", "ADVANCED", null).description(
          "Mode for the user.",
        ),
      )
      .property(
        "profilePhoto",
        OpenApiString.nullable().description(
          "A URL to the users profile photo.",
        ),
      )
      .property(
        "bio",
        OpenApiString.nullable().description("A bio for the users profile."),
      )
      .property(
        "birthday",
        OpenApiString.nullable()
          .format("date")
          .description("Birthday of the user."),
      )
      .property(
        "timezone",
        OpenApiString.nullable().description("Timezone for the user."),
      )
      .property(
        "postCount",
        OpenApiInteger.nullable().description("Number of posts for this user."),
      )
      .required("username", "mode");

    const schema2 = OpenApiObject.properties({
      name: OpenApiString.min(1).description("Display name of the user."),
      username: OpenApiString.min(1).description("The username of the user."),
      id: OpenApiString.format("uuid")
        .example("5e91507e-5630-4efd-9fd4-799178870b10")
        .description("Unique identifier for the user."),
      mode: OpenApiString.enum("BASIC", "ADVANCED", null).description(
        "Mode for the user.",
      ),
      profilePhoto: OpenApiString.nullable().description(
        "A URL to the users profile photo.",
      ),
      bio: OpenApiString.nullable().description("A bio for the users profile."),
      birthday: OpenApiString.nullable()
        .format("date")
        .description("Birthday of the user."),
      timezone: OpenApiString.nullable().description("Timezone for the user."),
      postCount: OpenApiInteger.nullable().description(
        "Number of posts for this user.",
      ),
    }).required("username", "mode");

    expect(schema1.toJSON()).toEqual(schema2.toJSON());
    expect(schema1).toEqual(schema2);
  });

  test("object properties test", () => {
    const schema = OpenApiObject.properties({
      name: OpenApiString.min(1).description("Display name of the user."),
      username: OpenApiString.min(1).description("The username of the user."),
      id: OpenApiString.format("uuid")
        .example("5e91507e-5630-4efd-9fd4-799178870b10")
        .description("Unique identifier for the user."),
      mode: OpenApiString.enum("BASIC", "ADVANCED", null).description(
        "Mode for the user.",
      ),
      profilePhoto: OpenApiString.nullable().description(
        "A URL to the users profile photo.",
      ),
      bio: OpenApiString.nullable().description("A bio for the users profile."),
      birthday: OpenApiString.nullable()
        .format("date")
        .description("Birthday of the user."),
      timezone: OpenApiString.nullable().description("Timezone for the user."),
      postCount: OpenApiInteger.nullable().description(
        "Number of posts for this user.",
      ),
    }).required("username", "mode");
    expect(schema.toJSON()).toMatchObject({
      type: "object",
      required: ["username", "mode"],
      properties: {
        name: {
          type: "string",
          description: "Display name of the user.",
          minLength: 1,
        },
        username: {
          type: "string",
          description: "The username of the user.",
          minLength: 1,
        },
        id: {
          type: "string",
          description: "Unique identifier for the user.",
          example: "5e91507e-5630-4efd-9fd4-799178870b10",
          format: "uuid",
        },
        mode: {
          type: "string",
          description: "Mode for the user.",
          enum: ["BASIC", "ADVANCED", null],
        },
        profilePhoto: {
          type: "string",
          description: "A URL to the users profile photo.",
          nullable: true,
        },
        bio: {
          type: "string",
          description: "A bio for the users profile.",
          nullable: true,
        },
        birthday: {
          type: "string",
          description: "Birthday of the user.",
          nullable: true,
          format: "date",
        },
        timezone: {
          type: "string",
          description: "Timezone for the user.",
          nullable: true,
        },
        postCount: {
          type: "integer",
          description: "Number of posts for this user.",
          nullable: true,
        },
      },
    });
  });

  test("max is smaller than min or min is greater than max", () => {
    expect(() => object.min(2).max(0)).toThrowError();
    expect(() => object.max(30).min(31)).toThrowError();
  });

  test("test max properties", () => {
    const actual = object.max(2);
    expect(actual.toJSON()).toMatchObject({
      type: "object",
      maxProperties: 2,
    });
    expect(() => object.max(-2)).toThrowError();
  });

  test("test min properties", () => {
    const actual = object.min(2);
    expect(actual.toJSON()).toMatchObject({
      type: "object",
      minProperties: 2,
    });
    expect(() => object.min(-2)).toThrowError();
  });

  test("test adding nullable", () => {
    const actual = object.nullable();
    expect(actual.toJSON()).toMatchObject({
      type: "object",
      nullable: true,
    });
  });

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
