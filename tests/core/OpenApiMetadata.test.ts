import { expect, describe, it } from "bun:test";
import { emptyMetadata } from "../fixtures/OpenApiMetadata";
import type { OpenApiInfo } from "../../src/types/OpenApiBuilderTypes";

describe("New OpenApiMetadata test.", () => {
  it("Test that setting the version of OpenApiMetadata is accurate", () => {
    // Arrange and Act
    let metadata = emptyMetadata.addVersion("3.0.0");
    // Assert
    expect(metadata.getVersion()).toBe("3.0.0");
    metadata = emptyMetadata.addVersion("3.1.0");
    expect(metadata.getVersion()).toBe("3.1.0");
    metadata = emptyMetadata.addVersion("3.1.1");
    expect(metadata.getVersion()).toBe("3.1.1");
  });

  it("Test that setting the info of OpenApiMetadata is accurate", () => {
    // Arrange
    const infoObject: OpenApiInfo = { title: "Petstore", version: "1.0.0" };
    // Act
    let metadata = emptyMetadata.addVersion("3.0.0").addInfo(infoObject);
    // Assert
    expect(metadata.getVersion()).toBe("3.0.0");
    expect(metadata.getInfo()).toBe(infoObject);
    metadata = metadata.addVersion("3.1.0");
    expect(metadata.getVersion()).toBe("3.1.0");
    expect(metadata.getInfo()).toBe(infoObject);
    metadata = metadata.addVersion("3.1.1");
    expect(metadata.getVersion()).toBe("3.1.1");
    expect(metadata.getInfo()).toBe(infoObject);
  });
});
