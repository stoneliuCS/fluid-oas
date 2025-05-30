import { describe, expect, test } from "bun:test";
import "../../../src/core/openapiv3/schema";
import {
  Union,
  String,
  Number,
  Object,
  Null,
} from "../../../src/core/openapiv3/schema";

describe("Union types test", () => {
  test("Union types deserialization values", () => {
    const actual = Union(String().addMinLength(1), Number());
    expect(actual.toJSON()).toEqual({
      type: ["string", "number"],
      minLength: 1,
    });
  });

  test("Nullable values", () => {
    let actual = Union(Object({}), Null());
    expect(actual.toJSON()).toEqual({
      properties: {},
      type: ["object", "null"],
    });
    actual = Union(Object(), String(), Null());
    expect(actual.toJSON()).toEqual({
      type: ["object", "string", "null"],
    });
  });

  test("Preserve properties", () => {
    let actual = Union(Object({}), Null());
    expect(actual.toJSON()).toEqual({
      properties: {},
      type: ["object", "null"],
    });
    actual = Union(
      Object({ firstName: String(), lastName: String() }),
      String(),
      Number(),
      Null()
    );
    expect(actual.toJSON()).toEqual({
      type: ["object", "string", "number", "null"],
      properties: {
        firstName: String(),
        lastName: String(),
      },
    }); // This is okay, since JSON.stringify will recursively call toJSON methods
  });
});
