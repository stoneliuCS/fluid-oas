import type { OpenApiSchema } from "../schema/OpenApiSchema";

export interface OpenApiSpecificationProperty<T> {
  toJSON(): unknown;
  extend(name: string, schema: OpenApiSchema): T;
}
