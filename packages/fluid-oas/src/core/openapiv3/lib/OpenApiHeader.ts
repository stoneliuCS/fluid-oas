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
import type { OpenApiMediaContentType } from "../types";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import { Base, type BaseInterface } from "./base";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiMediaType } from "./OpenApiMedia";
import type { OpenApiReferenceObject } from "./OpenApiReferenceObject";

const HeaderBase = withRequired(withDeprecated(withDescription(Base)));

interface HeaderBase extends BaseInterface {
  addRequired(required: boolean): this;
  addDeprecated(deprecated: boolean): this;
  addDescription(description: string): this;
}

const SchemaHeaderBase = withExamples(
  withExample(withSchema(withExplode(withStyle(HeaderBase)<"simple">())))
);

export interface SchemaHeader extends HeaderBase {
  addStyle(simple: "simple"): this;
  addExplode(explode: boolean): this;
  addSchema(schema: OpenApiSchema | OpenApiReferenceObject): this;
  addExample(example: any): this;
  addExamples(
    mappings: Partial<{
      [K in string]: OpenApiExample | OpenApiReferenceObject;
    }>
  ): this;
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

export const Header: {
  schema: SchemaHeader;
  content: ContentHeader;
} = {
  schema: new _OpenApiHeaderSchema() as SchemaHeader,
  content: new _OpenApiHeaderContent() as ContentHeader,
};
