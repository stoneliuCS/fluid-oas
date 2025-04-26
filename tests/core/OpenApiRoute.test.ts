import { expect, describe, test } from "bun:test";
import { OpenApiRoute } from "../../src/core/OpenApiRoute";
import { PropertyNotFound } from "../../src/lib/error";

describe("Test static creation of OpenApiRoute.", () => {
  test("Creating OpenApiRoute with a valid url.", () => {
    // Arrange
    const route: OpenApiRoute = OpenApiRoute.create("/");
    // Act
    const uri = route.getUri();
    // Assert
    expect(uri).toBe("/");

    // Assert that all other methods are not there by throwing errors
    expect(() => route.getServers()).toThrowError(PropertyNotFound);
    expect(() => route.getSummary()).toThrowError(PropertyNotFound);
    expect(() => route.getOperations()).toThrowError(PropertyNotFound);
    expect(() => route.getDescription()).toThrowError(PropertyNotFound);
    expect(() => route.getParameters()).toThrowError(PropertyNotFound);
  });

  test("Adding a summary to an OpenApiRoute", () => {
    const route: OpenApiRoute = OpenApiRoute.create("/");
    const routeWithSummary = route.addSummary("New Summary");
    // Route is immutable so its summary is not there.
    expect(() => route.getSummary()).toThrowError(PropertyNotFound);
    expect(routeWithSummary.getSummary()).toEqual("New Summary");
  });

  test("Adding a description to an OpenApiRoute", () => {
    const route: OpenApiRoute = OpenApiRoute.create("/");
    const routeWithDescription = route.addDescription("New Description");
    // Route is immutable so its description is not there.
    expect(() => route.getDescription()).toThrowError(PropertyNotFound);
    expect(routeWithDescription.getDescription()).toEqual("New Description");
  });

  test("Adding a operation to an OpenApiRoute", () => {
    const route: OpenApiRoute = OpenApiRoute.create("/");
  });

});
