import { deepFreeze } from "../../lib/freeze";
import type { OpenApiSchemaType } from "../../types/OpenApiTypes";
import type { OpenApiDocumentation } from "../OpenApiDocumentation";
import type { OpenApiExample } from "../OpenApiExample";
import type { OpenApiXML } from "../OpenApiXML";
import { OpenApiSchema } from "./OpenApiSchema";

type OpenApiSchemaNumberFormat = "float" | "double" | "int32" | "int64";

type OpenApiSchemaNumberReturn<T extends "number" | "integer"> =
  T extends "integer"
    ? OpenApiSchemaNumber<"integer">
    : T extends "number"
      ? OpenApiSchemaNumber<"number">
      : never;

class OpenApiSchemaNumber<
  T extends "integer" | "number",
> extends OpenApiSchema {
  private readonly _min?: number;
  private readonly _max?: number;
  private readonly _exMin?: boolean;
  private readonly _exMax?: boolean;
  private readonly _format?: OpenApiSchemaNumberFormat;
  private readonly _mult?: number;
  private readonly _enums?: Set<number | null>;

  public constructor(
    type: OpenApiSchemaType,
    xml?: OpenApiXML,
    docs?: OpenApiDocumentation,
    example?: OpenApiExample,
    description?: string,
    nullable?: boolean,
    defaultVal?: unknown,
    minimum?: number,
    maximum?: number,
    exclusiveMinimum?: boolean,
    exclusiveMaximum?: boolean,
    format?: OpenApiSchemaNumberFormat,
    multipleOf?: number,
    enums?: Set<number | null>,
  ) {
    super(type, xml, docs, example, description, nullable, defaultVal);
    this._min = minimum;
    this._max = maximum;
    this._exMin = exclusiveMinimum;
    this._exMax = exclusiveMaximum;
    this._format = format;
    this._mult = multipleOf;
    this._enums = enums;
    deepFreeze(this);
  }

  public default(defaultVal: number): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      defaultVal,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public enum(...enumVal: (number | null)[]): OpenApiSchemaNumberReturn<T> {
    let schema: OpenApiSchemaNumber<T> = this;
    for (const _enum of enumVal) {
      let enums: Set<number | null>;
      if (schema._enums) {
        enums = new Set(schema._enums);
        enums.add(_enum);
      } else {
        enums = new Set();
        enums.add(_enum);
      }
      return new OpenApiSchemaNumber(
        schema._type,
        schema._xml,
        schema._docs,
        schema._example,
        schema._description,
        schema._nullable,
        schema._default,
        schema._min,
        schema._max,
        schema._exMin,
        schema._exMax,
        schema._format,
        schema._mult,
        enums,
      ) as OpenApiSchemaNumberReturn<T>;
    }
    return schema as OpenApiSchemaNumberReturn<T>;
  }

  public nullable(): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      true,
      this._default,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public multipleOf(multiple: number): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      multiple,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public format(
    format: T extends "number"
      ? "float" | "double"
      : T extends "integer"
        ? "int32" | "int64"
        : never,
  ): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public exclusiveMax(): OpenApiSchemaNumberReturn<T> {
    if (!this._max) {
      throw new Error(
        `Cannot add an exclusive maximum as a maximum has not been added yet.`,
      );
    }
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._exMin,
      true,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public exclusiveMin(): OpenApiSchemaNumberReturn<T> {
    if (!this._min) {
      throw new Error(
        `Cannot add an exclusive minimum as a minimum has not been added yet.`,
      );
    }
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      true,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public max(maximum: number): OpenApiSchemaNumberReturn<T> {
    if (this._min && this._min > maximum) {
      throw new Error(
        `${maximum} is smaller than the current minimum ${this._min}`,
      );
    }
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      maximum,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public min(minimum: number): OpenApiSchemaNumberReturn<T> {
    if (this._max && this._max < minimum) {
      throw new Error(
        `${minimum} is larger than the current maximum ${this._max}`,
      );
    }
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      minimum,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }

  public xml(xml: OpenApiXML): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber(
      this._type,
      xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }
  public externalDocs(
    docs: OpenApiDocumentation,
  ): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }
  public example(example: OpenApiExample): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber(
      this._type,
      this._xml,
      this._docs,
      example,
      this._description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }
  public description(description: string): OpenApiSchemaNumberReturn<T> {
    return new OpenApiSchemaNumber<T>(
      this._type,
      this._xml,
      this._docs,
      this._example,
      description,
      this._nullable,
      this._default,
      this._min,
      this._max,
      this._exMin,
      this._exMax,
      this._format,
      this._mult,
      this._enums,
    ) as OpenApiSchemaNumberReturn<T>;
  }
  public toJSON(): unknown {
    const json = this.commonJSON();
    Object.defineProperty(json, "type", { value: this._type });
    if (this._min !== undefined) {
      Object.defineProperty(json, "minimum", { value: this._min });
    }
    if (this._max !== undefined) {
      Object.defineProperty(json, "maximum", { value: this._max });
    }
    if (this._exMin !== undefined) {
      Object.defineProperty(json, "exclusiveMinimum", {
        value: this._exMin,
      });
    }
    if (this._exMax !== undefined) {
      Object.defineProperty(json, "exclusiveMaximum", {
        value: this._exMax,
      });
    }
    if (this._format !== undefined) {
      Object.defineProperty(json, "format", { value: this._format });
    }
    if (this._mult !== undefined) {
      Object.defineProperty(json, "multipleOf", { value: this._mult });
    }
    if (this._enums !== undefined) {
      Object.defineProperty(json, "enum", { value: Array.from(this._enums) });
    }
    return json;
  }
}

class OpenApiSchemaBoolean extends OpenApiSchema {
  public constructor(
    xml?: OpenApiXML,
    docs?: OpenApiDocumentation,
    example?: OpenApiExample,
    description?: string,
    nullable?: boolean,
    defaultVal?: unknown,
  ) {
    super("boolean", xml, docs, example, description, nullable, defaultVal);
    deepFreeze(this);
  }

  public default(defaultVal: boolean): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      defaultVal,
    );
  }

  public xml(xml: OpenApiXML): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
    );
  }
  public externalDocs(docs: OpenApiDocumentation): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this._xml,
      docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
    );
  }
  public example(example: OpenApiExample): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this._xml,
      this._docs,
      example,
      this._description,
      this._nullable,
      this._default,
    );
  }
  public description(description: string): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this._xml,
      this._docs,
      this._example,
      description,
      this._nullable,
      this._default,
    );
  }
  public nullable(): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this._xml,
      this._docs,
      this._example,
      this._description,
      true,
      this._default,
    );
  }
  public toJSON(): unknown {
    return this.commonJSON();
  }
}

export const OpenApiNumber = new OpenApiSchemaNumber<"number">("number");
export const OpenApiInteger = new OpenApiSchemaNumber<"integer">("integer");
