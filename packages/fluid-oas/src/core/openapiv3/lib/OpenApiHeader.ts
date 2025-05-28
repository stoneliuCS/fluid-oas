import {
  withContent,
  withDeprecated,
  withDescription,
  withExample,
  withExamples,
  withExplode,
  withRequired,
  withSchema,
  withStyle,
} from "../common";
import type { OpenApiMediaContentType, OpenApiSchemaOrContent } from "../types";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import { Base, type BaseInterface } from "./base";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiMediaType } from "./OpenApiMedia";

const HeaderBase = withRequired(withDeprecated(withDescription(Base)));

interface HeaderBase extends BaseInterface {
  required(): this;
  deprecated(): this;
  addDescription(description: string): this;
}

const SchemaHeaderBase = withExamples(
  withExample(withSchema(withExplode(withStyle(HeaderBase)<"simple">())))
);

export interface SchemaHeader extends HeaderBase {
  addStyle(simple: "simple"): this;
  explode(): this;
  addSchema(schema: OpenApiSchema): this;
  addExample(example: OpenApiExample): this;
  addExamples(mappings: Partial<{ [K in string]: OpenApiExample }>): this;
}

export interface ContentHeader extends HeaderBase {
  addContents(
    mappings: Partial<{
      [K in OpenApiMediaContentType]: OpenApiMediaType;
    }>
  ): this;
}

const ContentHeaderBase = withContent(HeaderBase);

class _OpenApiHeaderSchema extends SchemaHeaderBase implements SchemaHeader {}

class _OpenApiHeaderContent
  extends ContentHeaderBase
  implements ContentHeader {}

export type OpenApiHeader = SchemaHeader | ContentHeader;

export function Header(type: "schema"): SchemaHeader;
export function Header(type: "content"): ContentHeader;
export function Header(type: OpenApiSchemaOrContent) {
  return type === "schema"
    ? new _OpenApiHeaderSchema()
    : new _OpenApiHeaderContent();
}
