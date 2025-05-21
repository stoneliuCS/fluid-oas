import {
  FunctionDeclarationStructure,
  OptionalKind,
  Project,
  SourceFile,
} from "ts-morph";

export class TemplateBuilder {
  private readonly project: Project;
  private readonly workingDir = "./src/common/";
  private readonly typeDeclarationFilePath = "types.ts";
  private readonly outputFile: string;
  public constructor(project: Project, outputFile: string) {
    this.project = project;
    this.outputFile = outputFile;
    this.createTypeConstructor();
  }

  private createTypeConstructor() {
    const sourceFile = this.project.createSourceFile(
      this.workingDir + this.typeDeclarationFilePath,
      "",
      { overwrite: true }
    );
    sourceFile.addTypeAlias({
      name: "GConstructor",
      isExported: true,
      typeParameters: ["T = { toJSON(): unknown }"],
      type: write => write.write("new (...args: any[]) => T"),
    });
    sourceFile.addTypeAlias({
      name: "OpenApiExtensionString",
      isExported: true,
      type: write => write.write("`x-${string}`"),
    });
    sourceFile.addTypeAlias({
      name: "OpenApiSchemaOrContent",
      isExported: true,
      type: write => write.write(`"schema" | "content"`),
    });
  }

  public write() {
    let augmentPath = this.workingDir + this.outputFile;
    const maybeSourceFile = this.project.getSourceFile(augmentPath);
    let sourceFile: SourceFile;
    if (!maybeSourceFile) {
      sourceFile = this.project.createSourceFile(augmentPath, "", {
        overwrite: true,
      });
      sourceFile.addImportDeclaration({
        moduleSpecifier: "./" + this.typeDeclarationFilePath,
        namedImports: ["GConstructor"],
        isTypeOnly: true,
      });
    } else {
      sourceFile = this.project.createSourceFile(
        augmentPath,
        maybeSourceFile.getText(),
        { overwrite: true }
      );
    }
    return {
      writeFunction: (struct: OptionalKind<FunctionDeclarationStructure>) =>
        sourceFile.addFunction(struct),
    };
  }

  public getText(path: string) {
    return this.project.getSourceFile(path)?.getText();
  }

  public async save() {
    for (const sourceFile of this.project.getSourceFiles()) {
      sourceFile.fixMissingImports();
    }
    await this.project.save();
  }
}

export const MainProject = new TemplateBuilder(
  new Project({
    tsConfigFilePath: "./tsconfig.json",
    compilerOptions: {
      tsConfigFilePath: "./tsconfig.json",
    },
  }),
  "common.ts"
);
