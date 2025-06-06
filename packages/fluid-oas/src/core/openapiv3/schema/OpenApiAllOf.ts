import { withAllOf } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const AllOfBase = withAllOf(SchemaBase)<OpenApiSchema>();

class _OpenApiAllOf extends AllOfBase<OpenApiSchema> {}

export interface OpenApiAllOf extends SchemaInterface<OpenApiSchema> {
  addAllOf(val: OpenApiSchema[]): this;
}

export const AllOf = (...vals: OpenApiSchema[]): OpenApiAllOf => {
  return new _OpenApiAllOf().addAllOf(vals);
};
