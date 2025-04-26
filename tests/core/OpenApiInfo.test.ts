import { describe, expect, test } from "bun:test";
import { OpenApiInfo } from "../../src/core/OpenApiInfo";

describe("Tests that build the OpenApiInfo Object.", () => {
  const info: OpenApiInfo = OpenApiInfo.create("Sample Info Object", "1.0.0");

  test("Constructor for OpenApiInfo", () => {
    let json = info.getJSON();
    expect(json).toMatchObject({
      title: "Sample Info Object",
      version: "1.0.0",
    });
  });

  test("Adding a summary to an info object", () => {
    const actual = info.addSummary("New Summary");
    let json = actual.getJSON();
    expect(json).toMatchObject({
      title: "Sample Info Object",
      version: "1.0.0",
      summary: "New Summary",
    });
  });

  test("Adding description to an info object", () => {
    const actual = info.addDescription("New Description");
    let json = actual.getJSON();
    expect(json).toMatchObject({
      title: "Sample Info Object",
      version: "1.0.0",
      description: "New Description",
    });
  });

  test("Adding termsOfService to an info object", () => {
    const actual = info.addTermsOfService("New Service");
    let json = actual.getJSON();
    expect(json).toMatchObject({
      title: "Sample Info Object",
      version: "1.0.0",
      termsOfService: "New Service",
    });
  });

  test("Incrementally building a license.", () => {
    const actual = info
      .addLicense("New License")
      .addIdentifier("Some identifier")
      .addUrl("Some url")
      .endLicense();
    let json = actual.getJSON();
    expect(json).toMatchObject({
      title: "Sample Info Object",
      version: "1.0.0",
      license: {
        name: "New License",
        identifier: "Some identifier",
        url: "Some url",
      },
    });
  });

  test("Incrementally building a contact", () => {
    const actual = info
      .addContact()
      .addEmail("My email")
      .addUrl("Some url")
      .addName("Some name")
      .endContact();
    let json = actual.getJSON();
    expect(json).toMatchObject({
      title: "Sample Info Object",
      version: "1.0.0",
      contact: {
        name: "Some name",
        url: "Some url",
        email: "My email",
      },
    });
  });
});
