import {
  CodeBlockWriter,
  FunctionDeclaration,
  FunctionDeclarationStructure,
  OptionalKind,
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
  // Generic
  generic: boolean;
  // Optional Comments
  comments?: string;
};

export abstract class FunctionBuilder {
  private signature: OptionalKind<FunctionDeclarationStructure>;
  protected readonly genericName = "T";
  protected fieldType?: string;
  protected serializedName?: string;
  protected generic?: string;

  // Function already has a signature
  public constructor(signature: MixinSignatureArgs) {
    this.signature = this.makeMixinFunctionSignature(signature);
  }

  private makeMixinFunctionSignature({
    fnName,
    serializedName,
    fieldType,
    generic,
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
            {
              tagName: "generic",
              kind: StructureKind.JSDocTag,
              text: `${generic}`,
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
      .write(`<${this.genericName} extends ${this.fieldType}>() => `)
      .block.bind(writer);
    return { withBody: functionBlock };
  }

  protected writeClassMethodBody(writer: CodeBlockWriter) {
    const methodBlock: (
      withParam: boolean
    ) => (cb: () => void) => CodeBlockWriter = param => {
      const type = this.generic === "true" ? "T" : this.fieldType;
      console.log(type);
      return writer
        .write(
          `${this.serializedName}(${param ? this.serializedName + " : " + type : ""})`
        )
        .block.bind(writer);
    };

    return {
      writeMethodBody: () => methodBlock(false),
      writerMethodBodyWithParam: () => methodBlock(true),
    };
  }

  protected writeSimpleJSONMethodBody(writer: CodeBlockWriter) {
    writer.write("toJSON()").block(() => {
      writer.writeLine("const json = super.toJSON();");
      writer.write(`if (this._${this.serializedName})`).block(() => {
        writer.writeLine(
          `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}, enumerable : true })`
        );
      });
    });
  }

  protected writeClassReturnBody(writer: CodeBlockWriter) {
    const block: (cb: () => void) => CodeBlockWriter = writer
      .write(`return class extends Base`)
      .block.bind(writer);

    return {
      writeBody: block,
    };
  }

  protected abstract buildFunction(writer: CodeBlockWriter): void;

  public write(template: TemplateBuilder) {
    const func = template.write().writeFunction(this.signature);
    this.populateTypeMaps(func);
    func.setBodyText(this.buildFunction.bind(this));
  }
}
