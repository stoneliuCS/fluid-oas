// Core Integration Testing for the OpenAPI V3 Module
import { describe, expect, test } from "bun:test";
import {
  Array,
  Component,
  Info,
  Integer,
  MediaType,
  Number,
  Object,
  OpenApiV3,
  Operation,
  Path,
  PathItem,
  Response,
  Responses,
  String,
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

  test("OpenAPIV3 Component Testing", () => {
    let openapiV3 = OpenApiV3.addOpenApiVersion("3.1.0").addInfo(infoFixture);
    const exampleSchema = Object.addProperties({
      field1: Number,
      field2: Integer,
      field3: String,
      field4: Array,
      field5: Object,
    });
    openapiV3 = openapiV3.addComponents(
      Component.addSchemas({
        schema1: exampleSchema,
      })
    );
    openapiV3 = openapiV3.addPaths(
      Path.addEndpoints({
        "/exampleEndpoint": PathItem.addMethod({
          get: Operation.addResponses(
            Responses({
              "200": Response.addDescription("Test Response").addContents({
                "application/json": MediaType.addSchema(exampleSchema),
              }),
            })
          ),
        }),
      })
    );
    // Async Writing
    const tempFile = tmp.fileSync();
    openapiV3.writeOASASync(tempFile.name);
    const actualContents = JSON.stringify(
      JSON.parse(
        fs.readFileSync(tempFile.name, {
          encoding: "utf-8",
        })
      ),
      undefined,
      2
    );
    console.log(actualContents);
  });
});
