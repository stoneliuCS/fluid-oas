import { expect, describe, test } from "bun:test";
import { isValidUri, validatePath } from "../../src/lib/url";

describe("Test valid uri function", () => {
  test("Check that valid uri true", () => {
    // Arrange
    const goodUrls = ["https://hello.com", "http://sketch.com"];

    // Act and Assert
    for (const url of goodUrls) {
      expect(isValidUri(url)).toBeTrue();
    }
  });

  test("Check that the uri function returns false for bad uris", () => {
    // Arrange
    const badUrls = ["ajsdlkjsadkjlm", "sadjsakjdl.com1k23h"];

    // Act and Assert
    for (const url of badUrls) {
      expect(isValidUri(url)).toBeFalse();
    }
  });
});

describe("ValidPath functionality tests.", () => {

  test("Check that empty paths are not valid and the error message is helpful.", () => {
    // Arrange
    const badPath = "";

    // Act
    const actual = validatePath(badPath);

    // Assert
    expect(actual).toBeFalse();
  });

  test("Check that the root path is valid", () => {
    // Arrange
    const rootPath = "/";

    // Act
    const actual = validatePath(rootPath);

    // Assert
    expect(actual).toBeTrue();
  });

  test("Check that a double slash path is invalid", () => {
    // Arrange
    const invalidPath = "//";

    // Act
    const actual = validatePath(invalidPath);

    // Assert
    expect(actual).toBeFalse();
  });

  test("Check that a normal path is fine", () => {
    // Arrange
    const invalidPath = "/api/v1/user";

    // Act
    const actual = validatePath(invalidPath);

    // Assert
    expect(actual).toBeTrue();
  });


  test("Check that query params of either can work.", () => {
    // Arrange
    const invalidPath = "/api/v1/user/:id/groups";

    // Act
    const actual = validatePath(invalidPath);

    // Assert
    expect(actual).toBeTrue();
  });


  test("Check that the ending root cannot have a /", () => {
    // Arrange
    const invalidPath = "/api/v1/user/:id/groups/";

    // Act
    const actual = validatePath(invalidPath);

    // Assert
    expect(actual).toBeFalse();
  });
});
