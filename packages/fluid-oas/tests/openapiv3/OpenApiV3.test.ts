// Core Integration Testing for the OpenAPI V3 Module
import { describe, expect, test } from "bun:test";
import {
  Component,
  Const,
  Info,
  MediaType,
  Object,
  OpenApiV3,
  Operation,
  Path,
  PathItem,
  Response,
  Responses,
} from "../../../fluid-oas/src/index.ts";
import * as tmp from "tmp";
import * as fs from "fs";

describe("OpenAPI Full Integration Testing", () => {
  const infoFixture = Info.addTitle("Sample Title").addVersion("1.0.0");
  test("OpenApi 3.1.1 Deserialization Test", () => {
    const tempFile = tmp.fileSync();
    const oasV3 = OpenApiV3.addOpenApiVersion("3.1.1").addInfo(infoFixture);
    oasV3.writeOASSync(tempFile.name);
    const actualContents = JSON.parse(
      fs.readFileSync(tempFile.name, {
        encoding: "utf-8",
      })
    );
    const expectedContents = {
      openapi: "3.1.1",
      info: { title: "Sample Title", version: "1.0.0" },
    };
    expect(actualContents).toEqual(expectedContents);
  });

  test("OpenApi 3.1.1 Deserialization Test", () => {
    const tempFile = tmp.fileSync();
    const oasV3 = OpenApiV3.addOpenApiVersion("3.1.0").addInfo(infoFixture);
    oasV3.writeOASSync(tempFile.name);
    const actualContents = JSON.parse(
      fs.readFileSync(tempFile.name, {
        encoding: "utf-8",
      })
    );
    const expectedContents = {
      openapi: "3.1.0",
      info: { title: "Sample Title", version: "1.0.0" },
    };
    expect(actualContents).toEqual(expectedContents);
  });

  test("OpenApi Path Item tests", () => {
    const tempFile = tmp.fileSync();
    const oasV3 = OpenApiV3.addOpenApiVersion("3.1.0")
      .addInfo(infoFixture)
      .addPaths(Path.addEndpoints({ "/api/v1/healthcheck": PathItem })); // Empty Path Item.
    oasV3.writeOASSync(tempFile.name);
    const actualContents = JSON.parse(
      fs.readFileSync(tempFile.name, {
        encoding: "utf-8",
      })
    );
    const expectedContents = {
      openapi: "3.1.0",
      info: { title: "Sample Title", version: "1.0.0" },
      paths: {
        "/api/v1/healthcheck": {},
      },
    };
    expect(actualContents).toEqual(expectedContents);
  });

  test("Test experimental feature, support named components", () => {
    const tempFile = tmp.fileSync();
    const healthCheckSchema = Object.addProperties({
      message: Const("OK"),
    })

      .addDescription("Pings the server to get the health of the server.")
      .addRequired(["message"]);
    OpenApiV3.addOpenApiVersion("3.1.0")
      .addInfo(infoFixture)
      .addPaths(
        Path.addEndpoints({
          "/api/v1/healthcheck": PathItem.addMethod({
            get: Operation.addResponses(
              Responses.addResponses({
                "200": Response.addDescription("Success!").addContents({
                  "application/json": MediaType.addSchema(healthCheckSchema),
                }),
              })
            ),
          }),
        })
      )
      .addComponents(
        Component.addSchemas({ HealthCheckSchema: healthCheckSchema })
      )
      .namedComponents()
      .writeOASSync(tempFile.name);
    const actualJSON = JSON.parse(
      fs.readFileSync(tempFile.name, { encoding: "utf-8" })
    );
    expect(actualJSON).toEqual({
      openapi: "3.1.0",
      info: { title: "Sample Title", version: "1.0.0" },
      components: {
        schemas: {
          HealthCheckSchema: {
            description: "Pings the server to get the health of the server.",
            properties: {
              message: {
                const: "OK",
              },
            },
            required: ["message"],
            type: "object",
          },
        },
      },
      paths: {
        "/api/v1/healthcheck": {
          get: {
            responses: {
              "200": {
                description: "Success!",
                content: {
                  "application/json": {
                    schema: "#/components/schemas/HealthCheckSchema",
                  },
                },
              },
            },
          },
        },
      },
    });
  });
});
