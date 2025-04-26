import { expect, describe } from "bun:test";
import { OpenApiMetadata } from "../../src/core/OpenApiMetadata";
import { OpenApiInfo } from "../../src/core/OpenApiInfo";

describe("Construction of an OpenApi Metadata", () => {

  // Arrange
  const info = OpenApiInfo.create("Generic API", "1.0.0")
    .addDescription("Sample Description.")
    .addSummary("Sample Summary.")
    .addTermsOfService("Sample Terms of Service.")

    .addContact()
    .addEmail("janedoe@gmail.com")
    .addUrl("www.janedoe.com")
    .addName("Jane Doe")
    .endContact()

    .addLicense("Sample License")
    .addIdentifier("Sample Identifier")
    .addUrl("Sample Url")
    .endLicense();

  const metadata = OpenApiMetadata.create("3.0.0", info);

  // Act
  const actualJSON = metadata.toJSON();
  console.log(actualJSON);

  // Assert
  expect(actualJSON).toContainKeys(["openapi", "info"]);
});
