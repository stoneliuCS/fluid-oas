export type MixinFunctionArgs = {
  name: string; // Name of the exported function.
  propertyFn: string; // Name of the internal property function
  propertyName: string; // Name of the property in the class
  serializedName: string; // Serialized output JSON
  type : string // Type
};

export enum MixinGroup {
  BOOLEAN,
  STRING,
  ARRAY,
}

export type MixinContext = {
  constructorName: string;
};

export type InputArgs = {
  type: MixinGroup;
  args: MixinFunctionArgs;
};

export type MixinSignature = (
  args: MixinFunctionArgs,
  ctx: MixinContext,
) => string;
