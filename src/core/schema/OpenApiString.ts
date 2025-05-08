import { deepFreeze } from "../../lib/freeze";
import type { OpenApiDocumentation } from "../../corev2/OpenApiDocumentation";
import type { OpenApiExample } from "../OpenApiExample";
import type { OpenApiXML } from "../OpenApiXML";
import { OpenApiSchema } from "./OpenApiSchema";

class OpenApiSchemaString extends OpenApiSchema {
  private readonly _min?: number;
  private readonly _max?: number;
  private readonly _format?: string;
  private readonly _pattern?: RegExp;
  private readonly _enums?: Set<string | null>;

  public constructor(
    xml?: OpenApiXML,
    docs?: OpenApiDocumentation,
    example?: OpenApiExample,
    description?: string,
    nullable?: boolean,
    defaultVal?: unknown,
    minLength?: number,
    maxLength?: number,
    format?: string,
    pattern?: RegExp,
    enums?: Set<string | null>,
  ) {
    super("string", xml, docs, example, description, nullable, defaultVal);
    this._min = minLength;
    this._max = maxLength;
    this._format = format;
    this._pattern = pattern;
    this._enums = enums;
    deepFreeze(this);
  }

  public default(defaultVal: string): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      defaultVal,
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._enums,
    );
  }

  public enum(...enumVal: (string | null)[]) {
    let schema: OpenApiSchemaString = this;
    for (const _enum of enumVal) {
      let enums: Set<string | null>;
      if (schema._enums) {
        enums = new Set(schema._enums);
        enums.add(_enum);
      } else {
        enums = new Set();
        enums.add(_enum);
      }
      schema = new OpenApiSchemaString(
        schema._xml,
        schema._docs,
        schema._example,
        schema._description,
        schema._nullable,
        schema._default,
        schema._min,
        schema._max,
        schema._format,
        schema._pattern,
        enums,
      );
    }
    return schema;
  }

  public nullable(): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      this._example,
      this._description,
      true,
      this._default,
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._enums,
    );
  }

  public pattern(pattern: RegExp) {
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._format,
      pattern,
      this._enums,
    );
  }

  public format(format: string) {
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      format,
      this._pattern,
      this._enums,
    );
  }

  public max(max: number) {
    if (this._min && max < this._min) {
      throw new Error(
        `Maximum length: ${max} is smaller than min length: ${this._min}`,
      );
    } else if (!Number.isInteger(max) || max < 0) {
      throw new Error(
        `${max} is not positive integer greater than or equal to zero.`,
      );
    }
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      max,
      this._format,
      this._pattern,
      this._enums,
    );
  }
  public min(min: number) {
    if (this._max && this._max < min) {
      throw new Error(
        `Minimum length: ${min} is greater than max length: ${this._max}`,
      );
    } else if (!Number.isInteger(min) || min < 0) {
      throw new Error(
        `${min} is not positive integer greater than or equal to zero.`,
      );
    }
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      min,
      this._max,
      this._format,
      this._pattern,
      this._enums,
    );
  }

  public xml(xml: OpenApiXML): OpenApiSchemaString {
    return new OpenApiSchemaString(
      xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._enums,
    );
  }

  public externalDocs(docs: OpenApiDocumentation): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this._xml,
      docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._enums,
    );
  }
  public example(example: OpenApiExample): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._enums,
    );
  }
  public description(description: string): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this._xml,
      this._docs,
      this._example,
      description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._enums,
    );
  }

  public toJSON(): unknown {
    const json = this.commonJSON();
    if (this._min !== undefined) {
      Object.defineProperty(json, "minLength", {
        value: this._min,
      });
    }
    if (this._max !== undefined) {
      Object.defineProperty(json, "maxLength", { value: this._max });
    }
    if (this._format !== undefined) {
      Object.defineProperty(json, "format", { value: this._format });
    }
    if (this._pattern !== undefined) {
      Object.defineProperty(json, "pattern", { value: this._pattern.source });
    }
    if (this._enums !== undefined) {
      Object.defineProperty(json, "enum", { value: Array.from(this._enums) });
    }
    return json;
  }
}

export const OpenApiString = new OpenApiSchemaString();
