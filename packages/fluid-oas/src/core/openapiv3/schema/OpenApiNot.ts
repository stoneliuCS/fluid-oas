import { withNot } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const NotBase = withNot(SchemaBase);

class _OpenApiNot extends NotBase<OpenApiSchema> {}

export interface OpenApiNot extends SchemaInterface<OpenApiSchema> {
  addNot(val: OpenApiSchema): this;
}

export const Not = (val: OpenApiSchema): OpenApiNot => {
  return new _OpenApiNot().addNot(val);
};
