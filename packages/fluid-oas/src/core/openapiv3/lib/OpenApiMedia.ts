import { withEncoding, withExample, withExamples, withSchema } from "../common";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import { Base, type BaseInterface } from "./base";
import type { OpenApiEncoding } from "./OpenApiEncoding";
import type { OpenApiExample } from "./OpenApiExample";

const MediaTypeBase = withEncoding(withExamples(withExample(withSchema(Base))));

export interface OpenApiMediaType extends BaseInterface {
  addSchema(schema: OpenApiSchema): this;
  addExample(example: any): this;
  addExamples(mappings: Partial<{ [K in string]: OpenApiExample }>): this;
  addEncodings(mappings: Partial<{ [K in string]: OpenApiEncoding }>): this;
}

class _OpenApiMediaType extends MediaTypeBase implements OpenApiMediaType {}

export const MediaType: OpenApiMediaType = new _OpenApiMediaType();
