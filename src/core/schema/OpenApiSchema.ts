import type {
  OpenApiSchemaType,
} from "../../types/OpenApiTypes";
import type { OpenApiDocumentation } from "../../corev2/OpenApiDocumentation";
import type { OpenApiExample } from "../OpenApiExample";
import type { OpenApiXML } from "../OpenApiXML";

export abstract class OpenApiSchema {
  protected readonly _type: OpenApiSchemaType;
  protected readonly _description?: string;
  protected readonly _xml?: OpenApiXML;
  protected readonly _docs?: OpenApiDocumentation;
  protected readonly _example?: OpenApiExample;
  protected readonly _nullable?: boolean;
  protected readonly _default?: unknown;

  protected constructor(
    type: OpenApiSchemaType,
    xml?: OpenApiXML,
    docs?: OpenApiDocumentation,
    example?: OpenApiExample,
    description?: string,
    nullable?: boolean,
    defaultVal?: unknown,
  ) {
    this._type = type;
    this._xml = xml;
    this._docs = docs;
    this._example = example;
    this._description = description;
    this._nullable = nullable;
    this._default = defaultVal;
  }
  public abstract extend(name: string, schema: OpenApiSchema): OpenApiSchema;
  public abstract xml(xml: OpenApiXML): OpenApiSchema;
  public abstract externalDocs(docs: OpenApiDocumentation): OpenApiSchema;
  public abstract example(example: OpenApiExample): OpenApiSchema;
  public abstract description(description: string): OpenApiSchema;
  public abstract nullable(): OpenApiSchema;
  public abstract default(defaultVal: unknown): OpenApiSchema;
  public abstract toJSON(): unknown;

  protected commonJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "type", { value: this._type });
    if (this._docs !== undefined) {
      Object.defineProperty(json, "docs", {
        value: this._docs.toJSON(),
      });
    }
    if (this._description !== undefined) {
      Object.defineProperty(json, "description", { value: this._description });
    }
    if (this._example !== undefined) {
      Object.defineProperty(json, "example", { value: this._example });
    }
    if (this._xml !== undefined) {
      Object.defineProperty(json, "xml", { value: this._xml.toJSON() });
    }
    if (this._nullable !== undefined) {
      Object.defineProperty(json, "nullable", { value: this._nullable });
    }
    if (this._default !== undefined) {
      Object.defineProperty(json, "default", { value: this._default });
    }
    return json;
  }
}
