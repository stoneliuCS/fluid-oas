import {
  FunctionDeclarationStructure,
  OptionalKind,
  Project,
  SourceFile,
} from "ts-morph";

export class TemplateBuilder {
  private readonly project: Project;
  private readonly workingDir = "./src/common/";
  private readonly typeDeclarationFilePath = "constructor.ts";
  public constructor(project: Project) {
    this.project = project;
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
  }

  /**
   * @param path - File name, do not give it a path.
   * @returns Functions
   */
  public write(path: string) {
    let augmentPath = this.workingDir + path;
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
    this.project.getSourceFiles().map(sf => {
      sf.fixMissingImports();
    });
    await this.project.save();
  }
}

export const MainProject = new TemplateBuilder(
  new Project({
    tsConfigFilePath: "./tsconfig.json",
    compilerOptions: {
      tsConfigFilePath: "./tsconfig.json",
    },
  })
);
