import { expect, describe, it } from "bun:test";
import { emptyMetadata } from "../fixtures/OpenApiMetadata";

describe("New OpenApiMetadata test.", () => {
  it("Test that creating an OpenApiMetadata is empty and immutable.", () => {
    // Arrange
    let metadata1 = emptyMetadata;
    let metadata2 = emptyMetadata;

    // Act
    metadata1 = metadata1.addVersion("3.0.0");
    metadata2 = metadata2.addVersion("3.0.0");

    // Assert
    expect(emptyMetadata).not.toEqual(metadata1);
    expect(metadata1).toEqual(metadata2);

    // Act
    metadata1 = metadata1.addInfo({ title: "PetStore", version: "v1.0.0" });
    expect(metadata1).not.toEqual(metadata2);
  });
});
