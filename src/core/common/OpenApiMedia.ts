import {
  withEncoding,
  withExample,
  withExamples,
  withSchema,
} from "../../common/common";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import { Base, type BaseInterface } from "./base";
import type { OpenApiEncoding } from "./OpenApiEncoding";
import type { OpenApiExample } from "./OpenApiExample";

const MediaTypeBase = withEncoding(withExamples(withExample(withSchema(Base))));

interface MediaType extends BaseInterface {
  addSchema(schema: OpenApiSchema): this;
  addExample(example: OpenApiExample): this;
  addExample(name: string, example: OpenApiExample): this;
  addEncoding(name: string, encoding: OpenApiEncoding): this;
}

class _OpenApiMediaType extends MediaTypeBase implements MediaType {}

export function MediaType(): MediaType {
  return new _OpenApiMediaType();
}
export type OpenApiMediaType = MediaType;
