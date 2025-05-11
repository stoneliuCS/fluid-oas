import { Project, SourceFile, type WriterFunction } from "ts-morph";

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
    );
    sourceFile.addTypeAlias({
      name: "GConstructor",
      isExported: true,
      typeParameters: ["T = { toJSON(): unknown }"],
      type: (write) => write.write("new (...args: any[]) => T"),
    });
  }

  private writeFunction(sourceFile: SourceFile) {
    return {
      name: (name: string) => {
        const fn = sourceFile.addFunction({
          name: name,
          isExported: true,
          typeParameters: ["TBase extends GConstructor"],
          parameters: [{ name: "Base", type: "TBase" }],
        });
        return {
          writeBody: (textOrWriterFunction: string | WriterFunction) =>
            fn.setBodyText(textOrWriterFunction),
        };
      },
    };
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
      sourceFile = this.project.createSourceFile(augmentPath, "");

      sourceFile.addImportDeclaration({
        moduleSpecifier: "./" + this.typeDeclarationFilePath,
        namedImports: ["GConstructor"],
        isTypeOnly: true,
      });
    } else {
      maybeSourceFile
        .getImportDeclaration((importDeclaration) =>
          importDeclaration.getNamedImports().every((val) => {
            val.getText() === "GConstructor";
          }),
        )
        ?.remove();
      sourceFile = this.project.createSourceFile(
        augmentPath,
        maybeSourceFile.getText(),
        { overwrite: true },
      );
    }
    return {
      writeFunction: this.writeFunction(sourceFile),
    };
  }

  public getText(path: string) {
    return this.project.getSourceFile(path)?.getText();
  }

  public saveSync() {
    this.project.getSourceFiles().map((sf) => sf.formatText());
    return this.project.saveSync();
  }
}

export const MainProject = new TemplateBuilder(
  new Project({
    compilerOptions: {
      tsConfigFilePath: "../../tsconfig.json",
    },
  }),
);
