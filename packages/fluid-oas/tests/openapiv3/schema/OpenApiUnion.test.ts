import { describe, expect, test } from "bun:test";
import "../../../src/core/openapiv3/schema";
import {
  Union,
  String,
  Number,
  Object,
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
    const actual = Union(Object({}), null);
    expect(actual.toJSON()).toEqual({
      properties: {},
      type: ["object", "null"],
    });
  });
});
