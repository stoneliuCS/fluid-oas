import {
    MixinGroup,
    type InputArgs,
  type MixinContext,
  type MixinFunctionArgs,
  type MixinSignature,
} from "./types";

export const templateArrayFn: MixinSignature = (
  args: MixinFunctionArgs,
  ctx: MixinContext,
) => {
  const internalProperty = `_${args.propertyName}`;
  return `export function ${args.name}<TBase extends ${ctx.constructorName}>(Base: TBase) {
  return class extends Base {
    private ${internalProperty}?: ${args.type}[];

    ${args.propertyFn}(${args.propertyFn}: ${args.type}) {
      const copy: this = Object.create(this);
      copy.${internalProperty} = this.${internalProperty} === undefined ? [${args.propertyFn}] : [...this.${internalProperty}, ${args.propertyFn}];
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this.${internalProperty}) {
        Object.defineProperty(json, "${args.serializedName}", {
          value: this.${internalProperty},
          enumerable: true,
        });
      }
      return json;
    }
  };
}`;
};

export const generateArrayInput = () => {
  // Define the needed types:
  const input: InputArgs[] = [];

  const inputOne = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withAllowReserved",
      propertyFn: "allowReserved",
      propertyName: "allowReserved",
      serializedName: "allowReserved",
      type : "boolean"
    },
  };

  input.push(
    inputOne,
  );
  return {
    arrayInput: input,
    arrayPath: "./src/common/generatedArrays.ts",
  };
};
