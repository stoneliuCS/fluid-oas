import { CodeBlockWriter, FunctionDeclaration } from "ts-morph";

export abstract class FunctionBuilder {
  protected readonly function: FunctionDeclaration;
  protected readonly ctxMappings: Map<string, string>;

  // Function already has a signature
  public constructor(fn: FunctionDeclaration) {
    this.function = fn;
    this.ctxMappings = new Map();
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
          const tagName = doc.getTagName();
          const tagVal = annotation.split(" ").at(-1);
          if (!tagVal) {
            throw new Error("Tag value must hold a value.");
          }
          this.ctxMappings.set(tagName, tagVal);
        });
    });
  }

  protected writeClassReturnBody(writer: CodeBlockWriter) {
    const block: (cb: () => void) => CodeBlockWriter = writer
      .write(
        `return class extends ${this.function.getParameter("Base")?.getName()} => `
      )
      .block.bind(writer);
    return block;
  }

  protected abstract buildPrimitive(writer: CodeBlockWriter): void;

  public write(): FunctionDeclaration {
    return this.function.setBodyText((writer: CodeBlockWriter) => {
      this.buildPrimitive(writer);
    });
  }
}
