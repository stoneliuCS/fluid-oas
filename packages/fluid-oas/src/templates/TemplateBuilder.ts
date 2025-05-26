import {
  FunctionDeclarationStructure,
  OptionalKind,
  Project,
  SourceFile,
} from "ts-morph";

export class TemplateBuilder {
  private readonly project: Project;
  private readonly workingDir: string;
  private readonly typeDeclarationFilePath = "types.ts";
  private readonly outputFile: string;
  public constructor(project: Project, outputFile: string, workingDir: string) {
    this.project = project;
    this.outputFile = outputFile;
    this.workingDir = workingDir;
    this.createTypeConstructor();
  }

  private createTypeConstructor() {
    const sourceFile = this.project.createSourceFile(
      this.workingDir + "/" + this.typeDeclarationFilePath,
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
    sourceFile.addTypeAlias({
      name: "OpenApiHTTPMethod",
      isExported: true,
      type: write =>
        write.write(
          `"get" | "put" | "patch" | "post" | "delete" | "options" | "head" | "trace"`
        ),
    });
    sourceFile.addTypeAlias({
      name: "OpenApiMediaContentType",
      isExported: true,
      type: write =>
        write.write(
          `
            "application/json" |
            "application/xml" |
            "application/x-www-form-urlencoded" |
            "multipart/form-data" |
            "text/plain; charset=utf-8" |
            "text/html" |
            "application/pdf" |
            "image/png" 
          `
        ),
    });
    sourceFile.addTypeAlias({
      name: "OpenApiHTTPStatusCode",
      isExported: true,
      type: write =>
        write.write(`"100" | "101" | "102" | "103"
  | "200" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208" | "226"
  | "300" | "301" | "302" | "303" | "304" | "305" | "307" | "308"
  | "400" | "401" | "402" | "403" | "404" | "405" | "406" | "407" | "408" | "409" 
  | "410" | "411" | "412" | "413" | "414" | "415" | "416" | "417" | "418" | "421"
  | "422" | "423" | "424" | "425" | "426" | "428" | "429" | "431" | "451"
  | "500" | "501" | "502" | "503" | "504" | "505" | "506" | "507" | "508" | "510" | "511";`),
    });
  }

  public write() {
    let augmentPath = this.workingDir + "/" + this.outputFile;
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
  "common.ts",
  "./src/common"
);
