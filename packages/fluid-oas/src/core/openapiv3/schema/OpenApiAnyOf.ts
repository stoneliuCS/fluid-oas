import { withAnyOf } from "../common";
import type { OpenApiReferenceObject } from "../lib";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const AnyOfBase = withAnyOf(SchemaBase)<
  OpenApiSchema | OpenApiReferenceObject
>();

class _OpenApiAnyOf extends AnyOfBase<OpenApiSchema | OpenApiReferenceObject> {}

export interface OpenApiAnyOf
  extends SchemaInterface<OpenApiSchema | OpenApiReferenceObject> {
  addAnyOf(val: (OpenApiSchema | OpenApiReferenceObject)[]): this;
}

export const AnyOf = (
  ...vals: (OpenApiSchema | OpenApiReferenceObject)[]
): OpenApiAnyOf => {
  return new _OpenApiAnyOf().addAnyOf(vals);
};
