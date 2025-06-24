import { withNot } from "../common";
import type { OpenApiReferenceObject } from "../lib";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const NotBase = withNot(SchemaBase);

class _OpenApiNot extends NotBase<OpenApiSchema | OpenApiReferenceObject> {}

export interface OpenApiNot
  extends SchemaInterface<OpenApiSchema | OpenApiReferenceObject> {
  addNot(val: OpenApiSchema | OpenApiReferenceObject): this;
}

export const Not = (
  val: OpenApiSchema | OpenApiReferenceObject
): OpenApiNot => {
  return new _OpenApiNot().addNot(val);
};
