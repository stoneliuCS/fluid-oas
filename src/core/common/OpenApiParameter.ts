import {
  withAllowReserved,
  withContent,
  withDeprecated,
  withDescription,
  withExample,
  withExamples,
  withExplode,
  withIn,
  withName,
  withRequired,
  withSchema,
  withStyle,
} from "../../common/common";
import type { OpenApiSchemaOrContent } from "../../common/types";
import { Base } from "./base";

const ParameterBase = withDeprecated(
  withRequired(
    withDescription(
      withIn(withName(Base))<"query" | "header" | "path" | "cookie">()
    )
  )
);

const ParameterSchemaBase = withExamples(
  withExample(
    withSchema(
      withAllowReserved(
        withExplode(withStyle(ParameterBase)<"form" | "simple">())
      )
    )
  )
);

const ParameterContentBase = withContent(ParameterBase);

class _OpenApiParameterSchema extends ParameterSchemaBase {}
class _OpenApiParameterContent extends ParameterContentBase {}

export function Parameter(type: "content"): _OpenApiParameterContent;
export function Parameter(type: "schema"): _OpenApiParameterSchema;
export function Parameter(type: OpenApiSchemaOrContent): OpenApiParameter {
  return type === "schema"
    ? new _OpenApiParameterSchema()
    : new _OpenApiParameterContent();
}

export type OpenApiParameter =
  | _OpenApiParameterSchema
  | _OpenApiParameterContent;
