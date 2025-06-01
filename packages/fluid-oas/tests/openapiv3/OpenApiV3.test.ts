// Core Integration Testing for the OpenAPI V3 Module
import { describe, expect, test } from "bun:test";
import {
  Info,
  OpenApiV3,
  Path,
  PathItem,
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
});
