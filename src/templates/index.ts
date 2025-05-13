import { CodeBlockWriter } from "ts-morph";
import { ArrayTemplateBuilder } from "./ArrayTemplate";
import { FunctionBuilder } from "./FunctionBuilder";
import { FunctionTemplateBuilder } from "./FunctionTemplate";
import { MapTemplateBuilder } from "./MapTemplate";
import { PrimitiveTemplateBuilder } from "./PrimitiveTemplate";
import { MainProject } from "./TemplateBuilder";

const buildStringFunctions = (): FunctionBuilder[] => {
  const withRegExpClass = class extends PrimitiveTemplateBuilder {
    protected buildJSONMethod(writer: CodeBlockWriter): void {
      writer.write("toJSON()").block(() => {
        writer.writeLine("const json = super.toJSON();");
        writer.write(`if (this._${this.serializedName})`).block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.source, enumerable : true })`
          );
        });
      });
    }
  };
  return [
    new withRegExpClass({
      fnName: "withPattern",
      fieldType: "RegExp",
      serializedName: "pattern",
    }),
  ];
};

const buildArrayFunctions = (): FunctionBuilder[] => {
  const withParametersClass = class extends ArrayTemplateBuilder {
    protected buildJSONMethod(writer: CodeBlockWriter): void {
      writer.write("toJSON()").block(() => {
        writer.writeLine("const json = super.toJSON();");
        writer.write(`if (this._${this.serializedName})`).block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${this.serializedName}", { value : this._${this.serializedName}.map(val => val.toJSON()), enumerable : true })`
          );
        });
      });
    }
  };
  const withParameters = new withParametersClass({
    fnName: "withParameters",
    fieldType: "OpenApiSchema",
    serializedName: "parameters",
  });
  return [withParameters];
};

async function main() {
  // Generic Function Generators
  const functions: FunctionBuilder[] = [
    new PrimitiveTemplateBuilder({
      fnName: "withDescription",
      fieldType: "string",
      serializedName: "description",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withSummary",
      fieldType: "string",
      serializedName: "summary",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withAllowReserved",
      fieldType: "boolean",
      serializedName: "allowReserved",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withDeprecated",
      fieldType: "boolean",
      serializedName: "deprecated",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withRequired",
      fieldType: "boolean",
      serializedName: "required",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withNullable",
      fieldType: "boolean",
      serializedName: "nullable",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMaximum",
      fieldType: "number",
      serializedName: "maximum",
    }),
    new PrimitiveTemplateBuilder({
      fnName: "withMinimum",
      fieldType: "number",
      serializedName: "minimum",
    }),
    new FunctionTemplateBuilder({
      fnName: "withValue",
      fieldType: "string | unknown",
      serializedName: "value",
      generic: true,
    }),
    new FunctionTemplateBuilder({
      fnName: "withFormat",
      fieldType: "string",
      serializedName: "format",
      generic: true,
    }),
    new FunctionTemplateBuilder({
      fnName: "withDefault",
      fieldType: FunctionBuilder.genericName,
      serializedName: "default",
      generic: true,
    }),
    new MapTemplateBuilder({
      fnName: "withMapping",
      fieldType: "OpenApiSchema",
      serializedName: "mapping",
    }),
  ];

  const total = functions
    .concat(buildStringFunctions())
    .concat(buildArrayFunctions());

  total.forEach(func => func.write(MainProject));

  await MainProject.save();
}

main();
