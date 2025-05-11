import type { WriterFunction } from 'ts-morph';
import { MainProject } from './TemplateBuilder';

const stringWriter = (name: string) => {
  const writerFn: WriterFunction = writer => {
    writer.write('return class extends Base').block(() => {
      writer.writeLine(`private _${name}? : string`);
      writer.write(`${name}(${name} : string)`).block(() => {
        writer.writeLine('const copy : this = Object.create(this);');
        writer.writeLine(`copy._${name} = ${name};`);
        writer.writeLine('return copy;');
      });

      writer.write('toJSON() : unknown').block(() => {
        writer.writeLine('const json = super.toJSON();');
        writer.write(`if (this._${name})`).block(() => {
          writer.writeLine(
            `Object.defineProperty(json, "${name}", { value: this._${name}, enumerable: true});`
          );
        });
        writer.writeLine('return json;');
      });
    });
  };
  return writerFn;
};

export const withStringTemplate = (): void => {
  MainProject.write('common.ts')
    .writeFunction('withDescription')
    .writeBody(stringWriter('description'));

  MainProject.write('common.ts')
    .writeFunction('withSummary')
    .writeBody(stringWriter('summary'));
};
