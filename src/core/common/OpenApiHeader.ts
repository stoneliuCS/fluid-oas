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
} from "../../common/common";
import type { OpenApiSchemaOrContent } from "../../common/types";
import { Base } from "./base";

const HeaderBase = withRequired(withDeprecated(withDescription(Base)));

const SchemaHeaderBase = withExamples(
  withExample(withSchema(withExplode(withStyle(HeaderBase)<"simple">())))
);

const ContentHeaderBase = withContent(HeaderBase);

class _OpenApiHeaderSchema extends SchemaHeaderBase {}

class _OpenApiHeaderContent extends ContentHeaderBase {}

export type OpenApiHeader = _OpenApiHeaderSchema | _OpenApiHeaderContent;

export function Header(type: "schema"): _OpenApiHeaderSchema;
export function Header(type: "content"): _OpenApiHeaderContent;
export function Header(type: OpenApiSchemaOrContent) {
  return type === "schema"
    ? new _OpenApiHeaderSchema()
    : new _OpenApiHeaderContent();
}
