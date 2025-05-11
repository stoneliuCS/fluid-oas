import {
  FunctionDeclarationStructure,
  OptionalKind,
  StructureKind,
} from "ts-morph";
import { MainProject, TemplateBuilder } from "./TemplateBuilder";

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

export const makeMixinFunctionSignature = ({
  fnName,
  serializedName,
  fieldType,
  comments,
}: MixinSignatureArgs): OptionalKind<FunctionDeclarationStructure> => {
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
            text: fieldType,
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
};

const write = (template: TemplateBuilder) => {
  return {
    onThisPath: (path: string) => {
      return {
        withThisSignature: (
          signature: OptionalKind<FunctionDeclarationStructure>
        ) => {
          return template.write(path).writeFunction(signature);
        },
      };
    },
  };
};

export const CommonWriter =
  write(MainProject).onThisPath("common.ts").withThisSignature;
