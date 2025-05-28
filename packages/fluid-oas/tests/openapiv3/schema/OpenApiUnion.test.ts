import { describe, test } from "bun:test";
import "../../../src/core/openapiv3/schema";
import { Union, String, Number } from "../../../src/core/openapiv3/schema";

describe("Union types test", () => {
  test("Union types deserialization values", () => {
    const actual = Union(String().addMinLength(1), Number());
    console.log(actual.toJSON());
  });
});
