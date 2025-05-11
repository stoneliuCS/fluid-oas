import {
  MixinGroup,
  type InputArgs,
  type MixinContext,
  type MixinFunctionArgs,
  type MixinSignature,
} from "./types";

export const templateBooleanFn: MixinSignature = (
  args: MixinFunctionArgs,
  ctx: MixinContext,
) => {
  const internalProperty = `_${args.propertyName}`;
  return `export function ${args.name}<TBase extends ${ctx.constructorName}>(Base: TBase) {
  return class extends Base {
    private ${internalProperty}?: ${args.type};
    ${args.propertyFn}() : this {
      const copy: this = Object.create(this);
      copy.${internalProperty} = true;
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

export const generateBooleanInput = () => {
  // Define the needed types:
  const input: InputArgs[] = [];

  const inputOne = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withAllowReserved",
      propertyFn: "allowReserved",
      propertyName: "allowReserved",
      serializedName: "allowReserved",
      type: "boolean",
    },
  };

  const inputTwo = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withDeprecated",
      propertyFn: "deprecated",
      propertyName: "deprecated",
      serializedName: "deprecated",
      type: "boolean",
    },
  };

  const inputThree = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withRequired",
      propertyFn: "required",
      propertyName: "required",
      serializedName: "required",
      type: "boolean",
    },
  };

  const inputFour = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withNullable",
      propertyFn: "nullable",
      propertyName: "nullable",
      serializedName: "nullable",
      type: "boolean",
    },
  };

  const inputFive = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withWrapped",
      propertyFn: "wrapped",
      propertyName: "wrapped",
      serializedName: "wrapped",
      type: "boolean",
    },
  };

  const inputSix = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withAttribute",
      propertyFn: "attribute",
      propertyName: "attribute",
      serializedName: "attribute",
      type: "boolean",
    },
  };

  const inputSeven = {
    type: MixinGroup.BOOLEAN,
    args: {
      name: "withExplode",
      propertyFn: "explode",
      propertyName: "explode",
      serializedName: "explode",
      type: "boolean",
    },
  };
  input.push(
    inputOne,
    inputTwo,
    inputThree,
    inputFour,
    inputFive,
    inputSix,
    inputSeven,
  );
  return {
    booleanInput: input,
    booleanPath: "./src/common/generatedBooleans.ts",
  };
};
