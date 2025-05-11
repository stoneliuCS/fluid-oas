import type { WriterFunction } from "ts-morph";
import { MainProject, TemplateBuilder } from "./TemplateBuilder";

const templateBuilder = new TemplateBuilder(MainProject);

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

templateBuilder
  .write("common.ts")
  .writeFunction.name("withAllowReserved")
  .writeBody(booleanWriter("allowReserved"));

templateBuilder
  .write("common.ts")
  .writeFunction.name("withDeprecated")
  .writeBody(booleanWriter("deprecated"));

templateBuilder
  .write("common.ts")
  .writeFunction.name("withRequired")
  .writeBody(booleanWriter("required"));

templateBuilder.saveSync();
