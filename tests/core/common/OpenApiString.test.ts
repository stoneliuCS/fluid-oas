import { describe, test, expect, afterEach } from "bun:test";
import { OpenApiString } from "../../../src/core/schema/OpenApiString";

describe("OpenApiString tests.", () => {
  afterEach(() =>
    expect(OpenApiString.toJSON()).toMatchObject({ type: "string" }),
  );

  test("Test OpenApiString construction", () => {
    expect(OpenApiString.toJSON()).toMatchObject({ type: "string" });
  });

  test("Test OpenApi minimum test.", () => {
    const actual = OpenApiString.min(1).toJSON();
    expect(actual).toMatchObject({ type: "string", minLength: 1 });
  });
});
