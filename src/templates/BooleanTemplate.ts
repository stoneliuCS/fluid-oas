import type { WriterFunction } from "ts-morph";
import { MainProject } from "./TemplateBuilder";

const booleanWriter = (name: string) => {
  const writerFn: WriterFunction = (writer) => {
    writer.write("return class extends Base").block(() => {
      writer.writeLine(`private _${name}? : boolean`);
      writer.write(`${name}()`).block(() => {
        writer.writeLine("const copy : this = Object.create(this);");
        writer.writeLine(`copy._${name} = true;`);
        writer.writeLine("return copy;");
      });

      writer.write("toJSON() : unknown").block(() => {
        writer.writeLine("const json = super.toJSON();");
        writer.write(`if (this._${name})`).block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${name}", { value: this._${name}, enumerable: true});`,
          );
        });
        writer.writeLine("return json;");
      });
    });
  };
  return writerFn;
};

export const withBooleanTemplate = (): void => {
  MainProject.write("common.ts")
    .writeFunction.name("withAllowReserved")
    .writeBody(booleanWriter("allowReserved"));

  MainProject.write("common.ts")
    .writeFunction.name("withDeprecated")
    .writeBody(booleanWriter("deprecated"));

  MainProject.write("common.ts")
    .writeFunction.name("withRequired")
    .writeBody(booleanWriter("required"));
};
