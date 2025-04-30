import { deepFreeze } from "../lib/freeze";
import type { OpenApiContentType, OpenApiParameterInType } from "../types/OpenApiTypes";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiSchema } from "./OpenApiSchema";

class OpenApiMediaBuilder {}

export class OpenApiParameter {

  private readonly name: string;
  private readonly in: OpenApiParameterInType;
  private readonly description?: string;
  private readonly required?: boolean;
  private readonly deprecated?: boolean;
  private readonly style?: string;
  private readonly explode?: string;
  private readonly allowReserved?: boolean;
  private readonly schema?: OpenApiSchema;
  private readonly example?: unknown;
  private readonly examples?: Map<string, OpenApiExample>;
  private readonly content?: Map<OpenApiContentType, OpenApiMediaBuilder>;

  public constructor(
    name: string,
    _in: OpenApiParameterInType,
    description?: string,
    required?: boolean,
    deprecated?: boolean,
    style?: string,
    explode?: string,
    allowReserved?: boolean,
    schema?: OpenApiSchema,
    example?: unknown,
    examples?: Map<string, OpenApiExample>,
    content?: Map<OpenApiContentType, OpenApiMediaBuilder>,
  ) {
    this.name = name;
    this.in = _in;
    this.description = description;
    this.required = required;
    this.deprecated = deprecated;
    this.style = style;
    this.explode = explode;
    this.allowReserved = allowReserved;
    this.schema = schema;
    this.example = example;
    this.examples = examples;
    this.content = content;
    deepFreeze(this);
  }



}
