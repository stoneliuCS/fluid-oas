import { describe, expect, test } from "bun:test";
import { Number, Integer } from "../../../src/core/openapiv3/schema";

describe("Number and Integer deserialization tests.", () => {
  test("Numbers and integers are immutable and they serialize to the proper types", () => {
    const number = Number;
    const integer = Integer;
    const number2 = number.addMinimum(1).addMaximum(3);
    const integer2 = integer.addDescription("Hello world!");
    expect(number).not.toEqual(number2);
    expect(integer).not.toEqual(integer2);
    expect(number.toJSON()).toEqual({ type: "number" });
    expect(integer.toJSON()).toEqual({ type: "integer" });
    expect(number2.toJSON()).toEqual({
      type: "number",
      minimum: 1,
      maximum: 3,
    });
    expect(integer2.toJSON()).toEqual({
      type: "integer",
      description: "Hello world!",
    });
  });

  test("Numbers and integers are backwards compatible", () => {
    const number = Number;
    const integer = Integer;
    const number2 = number
      .addNullable(true)
      .addExclusiveMin(true)
      .addExclusiveMax(true);
    const integer2 = integer
      .addNullable(true)
      .addExclusiveMin(true)
      .addExclusiveMax(true);
    expect(number2.toJSON()).toEqual({
      type: "number",
      exclusiveMinimum: true,
      exclusiveMaximum: true,
      nullable: true,
    });
    expect(integer2.toJSON()).toEqual({
      type: "integer",
      exclusiveMinimum: true,
      exclusiveMaximum: true,
      nullable: true,
    });
  });
});
