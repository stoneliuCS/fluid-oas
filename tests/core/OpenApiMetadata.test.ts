import { expect, describe, it } from "bun:test";
import { emptyMetadata } from "../fixtures/OpenApiMetadata";
import type { OpenApiInfo, OpenApiServer } from "../../src/types/OpenApiTypes";

describe("New OpenApiMetadata test.", () => {
  it("Test that setting the version of OpenApiMetadata is accurate", () => {
    // Arrange and Act
    let metadata = emptyMetadata.addVersion("3.0.0");
    // Assert
    expect(metadata.version).toBe("3.0.0");
    metadata = emptyMetadata.addVersion("3.1.0");
    expect(metadata.version).toBe("3.1.0");
    metadata = emptyMetadata.addVersion("3.1.1");
    expect(metadata.version).toBe("3.1.1");
  });

  it("Test that setting the info of OpenApiMetadata is accurate", () => {
    // Arrange
    const infoObject: OpenApiInfo = { title: "Petstore", version: "1.0.0" };
    // Act
    let metadata = emptyMetadata.addVersion("3.0.0").addInfo(infoObject);
    // Assert
    expect(metadata.version).toBe("3.0.0");
    expect(metadata.info).toBe(infoObject);
    metadata = metadata.addVersion("3.1.0");
    expect(metadata.version).toBe("3.1.0");
    expect(metadata.info).toBe(infoObject);
    metadata = metadata.addVersion("3.1.1");
    expect(metadata.version).toBe("3.1.1");
    expect(metadata.info).toBe(infoObject);
  });
});

describe("OpenAPIMetadata test for getters", () => {
  it("Test get version is immutable", () => {
    // Arrange
    let metadata = emptyMetadata.addVersion("3.0.0");
    // Act
    const actualVersion = metadata.version;
    // Assert
    expect(actualVersion).toBe("3.0.0");
  });

  it("Test getJsonDialect is immutable", () => {
    // Arrange
    let metadata = emptyMetadata.addJsonSchemaDialect("hello");
    // Act
    const actual = metadata.jsonSchemaDialect;
    // Assert
    expect(actual).toBe("hello");
  });

  it("Test get getServers underlying array is immutable and throws error when being modified.", () => {
    const server: OpenApiServer = {
      url: "https://blah.com",
      description: "test_url",
      variables: new Map(),
    };
    // Arrange
    let metadata = emptyMetadata.addServer(server);
    // Act
    const actual = metadata.servers;
    expect(actual).not.toBeUndefined();
    // Assert
    expect(actual!.length).toBe(1);
    // Attempt to modify the array
    expect(() => actual!.pop()).toThrowError(TypeError);
    expect(() => actual!.push(server)).toThrowError(TypeError);
  });
});
