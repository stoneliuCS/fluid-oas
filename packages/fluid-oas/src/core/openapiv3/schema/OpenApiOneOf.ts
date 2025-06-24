import { withOneOf } from "../common";
import type { OpenApiReferenceObject } from "../lib";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const OneOfBase = withOneOf(SchemaBase)<
  OpenApiSchema | OpenApiReferenceObject
>();

class _OpenApiOneOf extends OneOfBase<OpenApiSchema | OpenApiReferenceObject> {}

export interface OpenApiOneOf extends SchemaInterface<OpenApiSchema> {
  addOneOf(val: (OpenApiSchema | OpenApiReferenceObject)[]): this;
}

export const OneOf = (
  ...vals: (OpenApiSchema | OpenApiReferenceObject)[]
): OpenApiOneOf => {
  return new _OpenApiOneOf().addOneOf(vals);
};
