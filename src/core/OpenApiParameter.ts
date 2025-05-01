import { deepFreeze } from "../lib/freeze";
import type {
  OpenApiContentType,
  OpenApiParameterInType,
} from "../types/OpenApiTypes";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiSchema } from "./OpenApiSchema";

class OpenApiMediaBuilder {}

export class OpenApiParameter {
  protected readonly name: string;
  protected readonly in: OpenApiParameterInType;
  protected readonly description?: string;
  protected readonly required?: boolean;
  protected readonly deprecated?: boolean;
  protected readonly style?: string;
  protected readonly explode?: string;
  protected readonly allowReserved?: boolean;
  protected readonly schema?: OpenApiSchema;
  protected readonly example?: unknown;
  protected readonly examples?: Map<string, OpenApiExample>;
  protected readonly content?: Map<OpenApiContentType, OpenApiMediaBuilder>;

  public static create(name: string) {
    return {
      addIn(_in: OpenApiParameterInType) {
        return new OpenApiParameter(name, _in);
      },
    };
  }

  protected constructor(
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

  public addDescription(description: string) {
    return new OpenApiParameter(
      this.name,
      this.in,
      description,
      this.required,
      this.deprecated,
      this.style,
      this.explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public addRequired(required: boolean) {
    return new OpenApiParameter(
      this.name,
      this.in,
      this.description,
      required,
      this.deprecated,
      this.style,
      this.explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }

  public addDeprecated(deprecated: boolean) {
    return new OpenApiParameter(
      this.name,
      this.in,
      this.description,
      this.required,
      deprecated,
      this.style,
      this.explode,
      this.allowReserved,
      this.schema,
      this.example,
      this.examples,
      this.content,
    );
  }
}
