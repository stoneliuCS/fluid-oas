import { describe, expect, test } from "bun:test";
import { TemplateBuilder } from "../../src/templates/TemplateBuilder";
import * as tmp from "tmp";
import * as fs from "fs";
import { Project } from "ts-morph";

describe("Template Builder Tests, Essentially Macro Tests", () => {
  const tempWorkingDir = "foo/bar/baz";
  test("Test on a starter Builder Test", () => {
    const tempFile = tmp.tmpNameSync();
    const project = new Project({
      tsConfigFilePath: "./tsconfig.json",
      compilerOptions: {
        tsConfigFilePath: "./tsconfig.json",
      },
    });
    const template = new TemplateBuilder(project, tempFile, tempWorkingDir);
    expect(template.getText("/somefile/")).toBeUndefined();
  });

  test("Test function declarations", () => {
    const project = new Project({
      tsConfigFilePath: "./tsconfig.json",
      compilerOptions: {
        tsConfigFilePath: "./tsconfig.json",
      },
    });
    const template = new TemplateBuilder(
      project,
      "new_common.ts",
      tempWorkingDir
    );
    template.write().writeFunction({ name: "foo" });
    const foo = template.getText(`${tempWorkingDir}/new_common.ts`);
    expect(foo).not.toBeUndefined();
  });

  test("Test that template builder saves properly", async () => {
    tmp.dir(() => {
      tmp.setGracefulCleanup();
    });
    const project = new Project({
      tsConfigFilePath: "./tsconfig.json",
      compilerOptions: {
        tsConfigFilePath: "./tsconfig.json",
      },
    });
    const template = new TemplateBuilder(project, "new_common.ts", tmp.tmpdir);
    template.write().writeFunction({ name: "foo" });
    await template.save();
    expect(fs.existsSync(tmp.tmpdir)).toBeTrue();
    const newCommonFile = `${tmp.tmpdir}/new_common.ts`;
    expect(fs.existsSync(newCommonFile)).toBeTrue();
    expect(fs.readFileSync(newCommonFile, "utf-8")).toEqual(
      template.getText(newCommonFile)!
    );
  });
});
