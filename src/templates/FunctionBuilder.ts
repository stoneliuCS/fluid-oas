import {
  CodeBlockWriter,
  FunctionDeclaration,
  FunctionDeclarationStructure,
  OptionalKind,
  Project,
  StructureKind,
} from "ts-morph";
import { TemplateBuilder } from "./TemplateBuilder";

type MixinSignatureArgs = {
  // Name of the function
  fnName: string;
  // Type of the field
  fieldType: string;
  // Serialized Name
  serializedName: string;
  // Optional Comments
  comments?: string;
};

/**
 * An Abstract Interface for creating Function definitions using the TypeScript compiler.
 */
export abstract class FunctionBuilder {
  private signature: OptionalKind<FunctionDeclarationStructure>;
  public static readonly genericName = "T";
  protected fieldType?: string;
  protected serializedName?: string;
  protected currentProject?: Project;

  // Function already has a signature
  public constructor(signature: MixinSignatureArgs) {
    this.signature = this.makeMixinFunctionSignature(signature);
  }

  private makeMixinFunctionSignature({
    fnName,
    serializedName,
    fieldType,
    comments,
  }: MixinSignatureArgs): OptionalKind<FunctionDeclarationStructure> {
    return {
      name: fnName,
      isExported: true,
      typeParameters: ["TBase extends GConstructor"],
      parameters: [{ name: "Base", type: "TBase" }],
      docs: [
        {
          description: comments,
          tags: [
            {
              tagName: "fieldType",
              kind: StructureKind.JSDocTag,
              text: fieldType.replace(/ /g, ""),
            },
            {
              tagName: "serializedName",
              kind: StructureKind.JSDocTag,
              text: serializedName,
            },
          ],
        },
      ],
    };
  }

  private populateTypeMaps(func: FunctionDeclaration) {
    // Invariant : There should be only one JSDoc per function.
    if (func.getJsDocs().length != 1) {
      throw new Error("Too many JSDocs, only 1 allowed.");
    }
    const jsDoc = func.getJsDocs()[0];
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
          this[tagName] = tagVal;
        });
    });
  }

  protected withGenericBody(writer: CodeBlockWriter) {
    const functionBlock: (cb: () => void) => CodeBlockWriter = writer
      .write(
        `return <${FunctionBuilder.genericName} ${this.fieldType === FunctionBuilder.genericName ? "" : "extends " + this.fieldType}>() => `
      )
      .block.bind(writer);
    return { withBody: functionBlock };
  }

  protected writeClassReturnBody(writer: CodeBlockWriter) {
    const block: (cb: () => void) => CodeBlockWriter = writer
      .write(`return class extends Base`)
      .block.bind(writer);

    return {
      writeBody: block,
    };
  }

  private buildFunction(writer: CodeBlockWriter): void {
    if (!this.fieldType || !this.serializedName) {
      throw new Error("Not enough information to perform build.");
    }
    this.buildAbstractBody(writer)(() => {
      this.buildField(writer);
      this.buildBuilderMethod(writer);
      this.buildJSONMethod(writer);
    });
  }

  protected abstract buildAbstractBody(
    writer: CodeBlockWriter
  ): (cb: () => void) => CodeBlockWriter;
  protected abstract buildField(writer: CodeBlockWriter): void;
  protected abstract buildBuilderMethod(writer: CodeBlockWriter): void;
  protected buildJSONMethod(writer: CodeBlockWriter): void {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer
        .write(`if (this._${this.serializedName} !== undefined)`)
        .block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}, enumerable : true })`
          );
        });
      writer.writeLine("return json;");
    });
  }

  public write(template: TemplateBuilder) {
    let func = template.write().writeFunction(this.signature);
    this.populateTypeMaps(func);
    this.currentProject = func.getProject();
    func = func.setBodyText(this.buildFunction.bind(this));
  }
}
