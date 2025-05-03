import type { OpenApiSchemaType } from "../types/OpenApiTypes";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";
import type { OpenApiXML } from "./OpenApiXML";

abstract class OpenApiSchema {
  protected readonly _type: OpenApiSchemaType;
  protected readonly _description?: string;
  protected readonly _xml?: OpenApiXML;
  protected readonly _docs?: OpenApiDocumentation;
  protected readonly _example?: OpenApiExample;
  protected readonly _nullable?: boolean;
  protected readonly _default?: unknown;

  public static create(type: "array"): OpenApiSchemaArray;
  public static create(type: "object"): OpenApiSchemaObject;
  public static create(type: "string"): OpenApiSchemaString;
  public static create(type: "boolean"): OpenApiSchemaBoolean;
  public static create(type: "integer" | "number"): OpenApiSchemaNumber;
  public static create(type: "any"): OpenApiSchemaAny;
  public static create(type: "allOf"): OpenApiSchemaAllOf;
  public static create(type: "oneOf"): OpenApiSchemaOneOf;
  public static create(type: "anyOf"): OpenApiSchemaAnyOf;
  public static create(type: "not"): OpenApiSchemaNot;
  public static create(type: OpenApiSchemaType): OpenApiSchema {
    switch (type) {
      case "string":
        return new OpenApiSchemaString();
      case "number":
        return new OpenApiSchemaNumber("number");
      case "boolean":
        return new OpenApiSchemaBoolean();
      case "integer":
        return new OpenApiSchemaNumber("integer");
      case "object":
        return new OpenApiSchemaObject();
      case "array":
        return new OpenApiSchemaArray();
      case "any":
        return new OpenApiSchemaAny();
      default:
        throw new Error(`Unknown type : ${type} given.`);
    }
  }

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

type OpenApiSchemaNumberFormat = "float" | "double" | "int32" | "int64";

class OpenApiSchemaNumber extends OpenApiSchema {
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
  }

  public default(defaultVal: number): OpenApiSchema {
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
    );
  }

  public enum(enumVal: number): OpenApiSchemaNumber {
    let enums: Set<number | null>;
    if (this._enums) {
      enums = new Set(this._enums);
      enums.add(enumVal);
    } else {
      enums = new Set();
      enums.add(enumVal);
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
      this._exMax,
      this._format,
      this._mult,
      enums,
    );
  }

  public nullable(): OpenApiSchemaNumber {
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
    );
  }

  public addMultipleOf(multiple: number) {
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
    );
  }

  public format(format: OpenApiSchemaNumberFormat) {
    if (
      (this._type === "integer" && format === "float") ||
      (this._type === "integer" && format === "double") ||
      (this._type === "number" && format === "int32") ||
      (this._type === "number" && format === "int64")
    ) {
      throw new Error(`Cannot assign ${format} if the type is ${this._type}`);
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
      this._exMax,
      format,
      this._mult,
      this._enums,
    );
  }

  public exclusiveMax() {
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
    );
  }

  public exclusiveMin() {
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
    );
  }

  public maximum(maximum: number) {
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
    );
  }

  public addMinimum(minimum: number) {
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
    );
  }

  public xml(xml: OpenApiXML): OpenApiSchemaNumber {
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
    );
  }
  public externalDocs(docs: OpenApiDocumentation): OpenApiSchemaNumber {
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
    );
  }
  public example(example: OpenApiExample): OpenApiSchemaNumber {
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
    );
  }
  public description(description: string): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
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
    );
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
  }

  public default(defaultVal: string): OpenApiSchema {
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

  public enum(enumVal: string | null) {
    let enums: Set<string | null>;
    if (this._enums) {
      enums = new Set(this._enums);
      enums.add(enumVal);
    } else {
      enums = new Set();
      enums.add(enumVal);
    }
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
      this._pattern,
      enums,
    );
  }

  public nullable(): OpenApiSchema {
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
      Object.defineProperty(json, "pattern", { value: this._pattern });
    }
    if (this._enums !== undefined) {
      Object.defineProperty(json, "enum", { value: Array.from(this._enums) });
    }
    return json;
  }
}

class OpenApiSchemaObject extends OpenApiSchema {
  private readonly properties?: Map<string, OpenApiSchema>;
  private readonly requiredProperties?: Set<string>;
  private readonly additionalProperties?: Map<string, OpenApiSchema>;
  private readonly minProperties?: number;
  private readonly maxProperties?: number;

  public constructor(
    properties?: Map<string, OpenApiSchema>,
    xml?: OpenApiXML,
    docs?: OpenApiDocumentation,
    example?: OpenApiExample,
    description?: string,
    requiredProperties?: Set<string>,
    additionalProperties?: Map<string, OpenApiSchema>,
    minProperties?: number,
    maxProperties?: number,
  ) {
    super("object", xml, docs, example, description);
    this.properties = properties;
    this.requiredProperties = requiredProperties;
    this.additionalProperties = additionalProperties;
    this.minProperties = minProperties;
    this.maxProperties = maxProperties;
  }

  public additionalProperty(
    propertyName: string,
    propertyValue: OpenApiSchema,
  ) {
    let additionalProperties: Map<string, OpenApiSchema>;
    if (!this.additionalProperties) {
      additionalProperties = new Map();
      additionalProperties.set(propertyName, propertyValue);
    } else {
      additionalProperties = new Map(this.additionalProperties);
      additionalProperties.set(propertyName, propertyValue);
    }
    return new OpenApiSchemaObject(
      this.properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this.requiredProperties,
      this.additionalProperties,
      this.minProperties,
      this.maxProperties,
    );
  }

  public toJSON(): unknown {
    throw new Error("Method not implemented.");
  }

  public requiredProperty(propertyName: string) {
    let requiredProperties: Set<string>;
    if (this.requiredProperties) {
      requiredProperties = new Set(this.requiredProperties);
    } else {
      requiredProperties = new Set();
    }
    requiredProperties.add(propertyName);
    return new OpenApiSchemaObject(
      this.properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      requiredProperties,
      this.additionalProperties,
      this.minProperties,
      this.maxProperties,
    );
  }

  public description(description: string): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this.properties,
      this._xml,
      this._docs,
      this._example,
      description,
      this.requiredProperties,
      this.additionalProperties,
      this.minProperties,
      this.maxProperties,
    );
  }

  public property(propertyName: string, propertyValue: OpenApiSchema) {
    let properties: Map<string, OpenApiSchema>;
    if (!this.properties) {
      properties = new Map();
      properties.set(propertyName, propertyValue);
    } else {
      properties = new Map(this.properties);
      properties.set(propertyName, propertyValue);
    }
    return new OpenApiSchemaObject(
      properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this.requiredProperties,
      this.additionalProperties,
      this.minProperties,
      this.maxProperties,
    );
  }
}

class OpenApiSchemaArray extends OpenApiSchema {}
class OpenApiSchemaNot extends OpenApiSchema {}
class OpenApiSchemaAnyOf extends OpenApiSchema {}
class OpenApiSchemaAllOf extends OpenApiSchema {}
class OpenApiSchemaOneOf extends OpenApiSchema {}
class OpenApiSchemaAny extends OpenApiSchema {}

export const OpenApiString = OpenApiSchema.create("string");
export const OpenApiInteger = OpenApiSchema.create("integer");
export const OpenApiNumber = OpenApiSchema.create("number");
export const OpenApiBoolean = OpenApiSchema.create("boolean");
export const OpenApiObject = OpenApiSchema.create("object");
