import { withOneOf } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const OneOfBase = withOneOf(SchemaBase)<OpenApiSchema>();

class _OpenApiOneOf extends OneOfBase<OpenApiSchema> {}

export interface OpenApiOneOf extends SchemaInterface<OpenApiSchema> {
  addOneOf(val: OpenApiSchema[]): this;
}

export const OneOf = (...vals: OpenApiSchema[]): OpenApiOneOf => {
  return new _OpenApiOneOf().addOneOf(vals);
};
