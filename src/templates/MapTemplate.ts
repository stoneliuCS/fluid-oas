import type { WriterFunction } from 'ts-morph';
import { MainProject } from './TemplateBuilder';

const mapWriter = (name: string, type: string, stepName: string) => {
  const writerFn: WriterFunction = writer => {
    writer.write('return class extends Base').block(() => {
      writer.writeLine(`private _${name}? : Map<string,${type}>;`);
      writer.write(`${name}(name : string)`).block(() => {
        writer.write('return').block(() => {
          writer.write(`${stepName}: (${stepName} : ${type}) =>`).block(() => {
            writer.writeLine('const copy: this = Object.create(this);');
            writer.writeLine(`copy._${name} = new Map<string, ${type}>`);
            writer.writeLine(`copy._${name}.set(name, ${stepName})`);
            writer.writeLine(`return copy`);
          });
        });
      });

      writer.write('toJSON() : unknown').block(() => {
        writer.writeLine('const json = super.toJSON();');
        writer.write(`if (this._${name})`).block(() => {
          writer.write(
            `Object.defineProperty(json, "${name}", { value: mapMap(this._${name}, (val) => val.toJSON()), enumerable: true});`
          );
        });
        writer.writeLine('return json;');
      });
    });
  };
  return writerFn;
};

export const withMapTemplate = (): void => {
  MainProject.write('common.ts')
    .writeFunction('withContentMap')
    .writeBody(mapWriter('content', 'OpenApiMedia', 'media'));
};
