import { describe, test, expect, afterEach } from "bun:test";
import { OpenApiDocumentation } from "../../../src/core/common/OpenApiDocumentation";

describe("OpenApiDocumentation Construction Tests", () => {
  afterEach(() => {
    // Ensure that the OpenApiDocumentation never gets mutated.
    expect(OpenApiDocumentation().toJSON()).toEqual({});
  });
  test("Create new OpenApiDocumentation", () => {
    expect(OpenApiDocumentation()).toEqual(OpenApiDocumentation());
    expect(OpenApiDocumentation().toJSON()).toEqual(
      OpenApiDocumentation().toJSON(),
    );
  });

  test("OpenApiDocumentation with description", () => {
    const actual = OpenApiDocumentation().description("Test description");
    // Original did not get mutated.
    expect(actual.toJSON()).toMatchObject({ description: "Test description" });
  });

  test("OpenApiDocumentation with URL", () => {
    const actual = OpenApiDocumentation().url("https://someurl.com");
    // Original did not get mutated.
    expect(actual.toJSON()).toMatchObject({ url: "https://someurl.com" });
  });

  test("All together", () => {
    const actual = OpenApiDocumentation()
      .url("https://someurl.com")
      .description("Some url");
    expect(actual.toJSON()).toMatchObject({
      description: "Some url",
      url: "https://someurl.com",
    });
  });
});
