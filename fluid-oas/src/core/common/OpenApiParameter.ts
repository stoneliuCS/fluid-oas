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
import type {
  OpenApiMediaContentType,
  OpenApiSchemaOrContent,
} from "../../common/types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiMediaType } from "./OpenApiMedia";

const ParameterBase = withDeprecated(
  withRequired(
    withDescription(
      withIn(withName(Base))<"query" | "header" | "path" | "cookie">()
    )
  )
);

interface ParameterBase extends BaseInterface {
  addName(name: string): this;
  addIn(inParameter: "query" | "header" | "path" | "cookie"): this;
  addDescription(description: string): this;
  required(): this;
  deprecated(): this;
}

interface SchemaParameter extends ParameterBase {
  addStyle(style: "form" | "simple"): this;
  explode(): this;
  allowReserved(): this;
  addSchema(schema: OpenApiSchema): this;
  addExample(example: OpenApiExample): this;
  addExample(name: string, example: OpenApiExample): this;
}

interface ContentParameter extends ParameterBase {
  addContent(
    contentType: OpenApiMediaContentType,
    mediaType: OpenApiMediaType
  ): this;
}

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

class _OpenApiParameterSchema
  extends ParameterSchemaBase
  implements SchemaParameter {}
class _OpenApiParameterContent
  extends ParameterContentBase
  implements ContentParameter {}

export function Parameter(type: "content"): ContentParameter;
export function Parameter(type: "schema"): SchemaParameter;
export function Parameter(type: OpenApiSchemaOrContent): OpenApiParameter {
  return type === "schema"
    ? new _OpenApiParameterSchema()
    : new _OpenApiParameterContent();
}

export type OpenApiParameter = SchemaParameter | ContentParameter;
