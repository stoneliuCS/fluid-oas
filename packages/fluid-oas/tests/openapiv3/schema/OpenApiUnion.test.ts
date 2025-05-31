import { describe, expect, test } from "bun:test";
import "../../../src/core/openapiv3/schema";
import {
  Union,
  String,
  Number,
  Object,
  Null,
} from "../../../src/core/openapiv3/schema";
import { Const } from "../../../src/core/openapiv3/schema/OpenApiConst";
import { Enum } from "../../../src/core/openapiv3/schema/OpenApiEnum";

describe("Union types test", () => {
  test("Union types deserialization values", () => {
    const actual = Union(String.addMinLength(1), Number);
    expect(actual.toJSON()).toEqual({
      type: ["string", "number"],
      minLength: 1,
    });
  });

  test("Nullable values", () => {
    let actual = Union(Object.addProperties({}), Null);
    expect(actual.toJSON()).toEqual({
      properties: {},
      type: ["object", "null"],
    });
    actual = Union(Object, String, Null);
    expect(actual.toJSON()).toEqual({
      type: ["object", "string", "null"],
    });
  });

  test("Preserve properties", () => {
    let actual = Union(Object.addProperties({}), Null);
    expect(actual.toJSON()).toEqual({
      properties: {},
      type: ["object", "null"],
    });
    actual = Union(
      Object.addProperties({ firstName: String, lastName: String }),
      String,
      Number,
      Null
    );
    expect(actual.toJSON()).toEqual({
      type: ["object", "string", "number", "null"],
      properties: {
        firstName: String,
        lastName: String,
      },
    }); // This is okay, since JSON.stringify will recursively call toJSON methods
  });

  test("Constants", () => {
    const obj = Object.addProperties({
      country: Const("United States"),
    });
    const actual = Union(obj);
    expect(actual.toJSON()).toEqual({
      type: ["object"],
      properties: {
        country: Const("United States"),
      },
    });
  });

  test("Enumerables with variable types", () => {
    const actual = Union(
      Object.addProperties({ values: Enum("red", "green", "blue", null) })
    );
    expect(actual.toJSON()).toEqual({
      type: ["object"],
      properties: {
        values: Enum("red", "green", "blue", null),
      },
    });
  });
});
