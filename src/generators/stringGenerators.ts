import {
  MixinGroup,
  type InputArgs,
  type MixinContext,
  type MixinFunctionArgs,
  type MixinSignature,
} from "./types";

export const templateStringFn: MixinSignature = (
  args: MixinFunctionArgs,
  ctx: MixinContext,
) => {
  const internalProperty = `_${args.propertyName}`;
  return `export function ${args.name}<TBase extends ${ctx.constructorName}>(Base: TBase) {
  return class extends Base {
    private ${internalProperty}?: ${args.type};

    ${args.propertyFn}(${args.propertyFn}: ${args.type}) : this {
      const copy: this = Object.create(this);
      copy.${internalProperty} = ${args.propertyFn};
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

export const generateStringInput = () => {
  // Define the needed types:
  const input: InputArgs[] = [];

  const inputOne = {
    type: MixinGroup.STRING,
    args: {
      name: "withDescription",
      propertyFn: "description",
      propertyName: "description",
      serializedName: "description",
      type : "string"
    },
  };

  const inputTwo = {
    type: MixinGroup.STRING,
    args: {
      name: "withSummary",
      propertyFn: "summary",
      serializedName: "summary",
      propertyName: "summary",
      type : "string"
    },
  };

  const inputThree = {
    type: MixinGroup.STRING,
    args: {
      name: "withName",
      propertyFn: "name",
      serializedName: "name",
      propertyName: "name",
      type : "string"
    },
  };

  const inputFour = {
    type: MixinGroup.STRING,
    args: {
      name: "withURL",
      propertyFn: "url",
      serializedName: "url",
      propertyName: "url",
      type : "string"
    },
  };

  const inputFive = {
    type: MixinGroup.STRING,
    args: {
      name: "withNamespace",
      propertyFn: "namespace",
      serializedName: "namespace",
      propertyName: "namespace",
      type : "string"
    },
  };

  const inputSix = {
    type: MixinGroup.STRING,
    args: {
      name: "withOperationId",
      propertyFn: "operationId",
      serializedName: "operationId",
      propertyName: "operationId",
      type : "string"
    },
  };
  input.push(inputOne, inputTwo, inputThree, inputFour, inputFive, inputSix);

  return { stringInput: input, stringPath: "./src/common/generatedStrings.ts" };
};
