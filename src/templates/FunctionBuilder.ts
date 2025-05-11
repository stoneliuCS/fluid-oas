import { CodeBlockWriter, FunctionDeclaration } from "ts-morph";

export abstract class FunctionBuilder {
  protected readonly function: FunctionDeclaration;
  protected readonly ctxMappings: Record<string, string>;

  // Function already has a signature
  public constructor(fn: FunctionDeclaration) {
    this.function = fn;
    this.ctxMappings = {};
    this.populateTypeMaps();
  }

  private populateTypeMaps() {
    // Invariant : There should be only one JSDoc per function.
    if (this.function.getJsDocs().length != 1) {
      throw new Error("Too many JSDocs, only 1 allowed.");
    }
    const jsDoc = this.function.getJsDocs()[0];
    jsDoc.getTags().forEach(doc => {
      doc
        .getText({
          includeJsDocComments: false,
          trimLeadingIndentation: true,
        })
        .split("*")
        .map(line => line.trim())
        .filter(line => line.length != 0)
        .forEach(annotation => {
          this.ctxMappings[doc.getTagName()] = annotation.split(" ").at(-1)!;
        });
    });
  }

  protected abstract buildPrimitive(writer: CodeBlockWriter): void;

  public write(): FunctionDeclaration {
    return this.function.setBodyText((writer: CodeBlockWriter) => {
      this.buildPrimitive(writer);
    });
  }
}
