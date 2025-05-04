import type { OpenApiSchemaType } from "../types/OpenApiTypes";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";
import type { OpenApiXML } from "./OpenApiXML";
import { deepFreeze } from "../lib/freeze";

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

  public enum(...enumVal: (number | null)[]): OpenApiSchemaNumber {
    let schema: OpenApiSchemaNumber = this;
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
      );
    }
    return schema;
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

  public multipleOf(multiple: number) {
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

  public max(maximum: number) {
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

  public min(minimum: number) {
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
      Object.defineProperty(json, "pattern", { value: this._pattern });
    }
    if (this._enums !== undefined) {
      Object.defineProperty(json, "enum", { value: Array.from(this._enums) });
    }
    return json;
  }
}

class OpenApiSchemaObject extends OpenApiSchema {
  private readonly _properties?: Map<string, OpenApiSchema>;
  private readonly _requiredProperties?: Set<string>;
  private readonly _additionalProperties?: Map<string, OpenApiSchema>;
  private readonly _minProperties?: number;
  private readonly _maxProperties?: number;

  public constructor(
    _properties?: Map<string, OpenApiSchema>,
    _xml?: OpenApiXML,
    _docs?: OpenApiDocumentation,
    _example?: OpenApiExample,
    _description?: string,
    _nullable?: boolean,
    _defaultVal?: unknown,
    _requiredProperties?: Set<string>,
    _additionalProperties?: Map<string, OpenApiSchema>,
    _minProperties?: number,
    _maxProperties?: number,
  ) {
    super(
      "object",
      _xml,
      _docs,
      _example,
      _description,
      _nullable,
      _defaultVal,
    );
    this._properties = _properties;
    this._requiredProperties = _requiredProperties;
    this._additionalProperties = _additionalProperties;
    this._minProperties = _minProperties;
    this._maxProperties = _maxProperties;
    deepFreeze(this);
  }

  public max(maxProperties: number) {
    if (this._minProperties && maxProperties < this._minProperties) {
      throw new Error(
        `Given ${maxProperties} which is smaller than current min ${this._minProperties}`,
      );
    }
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      maxProperties,
    );
  }

  public min(minProperties: number) {
    if (this._maxProperties && minProperties > this._maxProperties) {
      throw new Error(
        `Given ${minProperties} which exceeds current max ${this._maxProperties}`,
      );
    }
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      minProperties,
      this._maxProperties,
    );
  }

  public additionalProperty(properties: { [key: string]: OpenApiSchema }) {
    let mappedSchemas: Map<string, OpenApiSchema>;
    if (this._additionalProperties) {
      mappedSchemas = new Map(this._additionalProperties);
    } else {
      mappedSchemas = new Map();
    }
    for (const key in properties) {
      if (properties[key]) {
        const openapiSchema = properties[key];
        mappedSchemas.set(key, openapiSchema);
      }
    }
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      mappedSchemas,
      this._minProperties,
      this._maxProperties,
    );
  }

  private stringifyProperties(properties: Map<string, OpenApiSchema>): unknown {
    const mapper: { [key: string]: unknown } = {};
    for (const key of properties.keys()) {
      const val = properties.get(key);
      if (val) {
        mapper[key] = val.toJSON();
      }
    }
    return mapper;
  }

  public toJSON(): unknown {
    const json = this.commonJSON();
    if (this._requiredProperties) {
      Object.defineProperty(json, "required", {
        value: Array.from(this._requiredProperties),
      });
    }
    if (this._additionalProperties) {
      Object.defineProperty(json, "additionalProperties", {
        value: Array.from(this._additionalProperties),
      });
    }
    if (this._properties) {
      Object.defineProperty(json, "properties", {
        value: this.stringifyProperties(this._properties),
      });
    }
    if (this._minProperties) {
      Object.defineProperty(json, "minProperties", {
        value: this._minProperties,
      });
    }
    if (this._maxProperties) {
      Object.defineProperty(json, "maxProperties", {
        value: this._maxProperties,
      });
    }
    return json;
  }

  public xml(xml: OpenApiXML): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this._properties,
      xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      this._maxProperties,
    );
  }
  public externalDocs(docs: OpenApiDocumentation): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      this._maxProperties,
    );
  }
  public example(example: OpenApiExample): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      this._maxProperties,
    );
  }
  public nullable(): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      this._maxProperties,
    );
  }
  public default(defaultVal: unknown): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      defaultVal,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      this._maxProperties,
    );
  }

  public required(...propertyName: string[]) {
    let schema: OpenApiSchemaObject = this;
    for (const name of propertyName) {
      let _requiredProperties: Set<string>;
      if (schema._requiredProperties) {
        _requiredProperties = new Set(schema._requiredProperties);
      } else {
        _requiredProperties = new Set();
      }
      _requiredProperties.add(name);
      schema = new OpenApiSchemaObject(
        schema._properties,
        schema._xml,
        schema._docs,
        schema._example,
        schema._description,
        schema._nullable,
        schema._default,
        _requiredProperties,
        schema._additionalProperties,
        schema._minProperties,
        schema._maxProperties,
      );
    }
    return schema;
  }

  public description(description: string): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      this._example,
      description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      this._maxProperties,
    );
  }

  public properties(properties: { [key: string]: OpenApiSchema }) {
    let mappedSchemas: Map<string, OpenApiSchema>;
    if (this._properties) {
      mappedSchemas = new Map(this._properties);
    } else {
      mappedSchemas = new Map();
    }
    for (const key in properties) {
      if (properties[key]) {
        const openapiSchema = properties[key];
        mappedSchemas.set(key, openapiSchema);
      }
    }
    return new OpenApiSchemaObject(
      mappedSchemas,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      this._additionalProperties,
      this._minProperties,
      this._maxProperties,
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
