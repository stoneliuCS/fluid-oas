import { withElse, withIf, withThen } from "../common";
import type { OpenApiReferenceObject } from "../lib";
import { SchemaBase, type SchemaInterface } from "../lib/base";
import type { OpenApiSchema } from "./OpenApiSchema";

const IfThenElseBase = withThen(withElse(withIf(SchemaBase<OpenApiSchema>)));

export interface OpenApiIfThenElse extends SchemaInterface<OpenApiSchema> {
  addIf(schema: OpenApiSchema | OpenApiReferenceObject): this;
  addThen(schema: OpenApiSchema | OpenApiReferenceObject): this;
  addElse(schema: OpenApiSchema | OpenApiReferenceObject): this;
}

class _OpenApiIfThenElse extends IfThenElseBase implements OpenApiIfThenElse {}

export const If = (
  schema: OpenApiSchema | OpenApiReferenceObject
): OpenApiIfThenElse => new _OpenApiIfThenElse().addIf(schema);
