// Configuration to generate TypeScript Code for intellisense.
import { generateBooleanInput, templateBooleanFn } from "./booleanGenerators";
import * as fs from "fs";
import { MixinGroup, type InputArgs, type MixinContext } from "./types";
import { generateStringInput, templateStringFn } from "./stringGenerators";

const runGenerator = (args: InputArgs[], path: string) => {
  const constructorName = "GConstructor";
  const constructorType = `type ${constructorName}<T = { toJSON(): unknown }> = new (...args: any[]) => T;`;
  const ctx: MixinContext = {
    constructorName: constructorName,
  };
  const source: string[] = [
    "// Generated Code. Do not Modify.",
    constructorType,
  ];

  // TODO replace with interface
  args.forEach((input) => {
    switch (input.type) {
      case MixinGroup.BOOLEAN:
        source.push(templateBooleanFn(input.args, ctx));
        break;
      case MixinGroup.STRING:
        source.push(templateStringFn(input.args, ctx));
        break;
    }
  });

  const sourceCode = source.join("\n\n");

  fs.writeFileSync(path, sourceCode);
};

function main() {
  const { booleanInput, booleanPath } = generateBooleanInput();
  const { stringInput, stringPath } = generateStringInput();
  runGenerator(booleanInput, booleanPath);
  runGenerator(stringInput, stringPath);
}

main();
