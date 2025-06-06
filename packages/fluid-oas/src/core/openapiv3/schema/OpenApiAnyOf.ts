import { withAnyOf } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const AnyOfBase = withAnyOf(SchemaBase)<OpenApiSchema>();

class _OpenApiAnyOf extends AnyOfBase<OpenApiSchema> {}

export interface OpenApiAnyOf extends SchemaInterface<OpenApiSchema> {
  addAnyOf(val: OpenApiSchema[]): this;
}

export const AnyOf = (...vals: OpenApiSchema[]): OpenApiAnyOf => {
  return new _OpenApiAnyOf().addAnyOf(vals);
};
