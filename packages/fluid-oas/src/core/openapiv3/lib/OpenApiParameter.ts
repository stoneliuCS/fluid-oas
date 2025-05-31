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
} from "../common";
import type { OpenApiMediaContentType, OpenApiSchemaOrContent } from "../types";
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
  addRequired(required: boolean): this;
  addDeprecated(deprecated: boolean): this;
}

export interface SchemaParameter extends ParameterBase {
  addStyle(style: "form" | "simple"): this;
  addExplode(explode: boolean): this;
  addAllowReserved(allowReserved: boolean): this;
  addSchema(schema: OpenApiSchema): this;
  addExample(example: any): this;
  addExamples(mappings: { [K in string]: OpenApiExample }): this;
}

export interface ContentParameter extends ParameterBase {
  addContents(
    mappings: Partial<{
      [K in OpenApiMediaContentType]: OpenApiMediaType;
    }>
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

export const Parameter: {
  schema: SchemaParameter;
  header: ContentParameter;
} = {
  schema: new _OpenApiParameterSchema() as SchemaParameter,
  header: new _OpenApiParameterContent() as ContentParameter,
};

export type OpenApiParameter = SchemaParameter | ContentParameter;
