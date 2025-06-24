import { withAllOf } from "../common";
import type { OpenApiReferenceObject } from "../lib";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const AllOfBase = withAllOf(SchemaBase)<
  OpenApiSchema | OpenApiReferenceObject
>();

class _OpenApiAllOf extends AllOfBase<OpenApiSchema | OpenApiReferenceObject> {}

export interface OpenApiAllOf
  extends SchemaInterface<OpenApiSchema | OpenApiReferenceObject> {
  addAllOf(val: (OpenApiSchema | OpenApiReferenceObject)[]): this;
}

export const AllOf = (
  ...vals: (OpenApiSchema | OpenApiReferenceObject)[]
): OpenApiAllOf => {
  return new _OpenApiAllOf().addAllOf(vals);
};
