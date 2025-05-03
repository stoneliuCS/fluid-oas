import type { OpenApiSchemaType } from "../types/OpenApiTypes";
import type { OpenApiDiscriminator } from "./OpenApiDiscriminator";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";
import type { OpenApiXML } from "./OpenApiXML";

abstract class OpenApiSchema {
  protected readonly type: OpenApiSchemaType;
  protected readonly description?: string;
  protected readonly xml?: OpenApiXML;
  protected readonly docs?: OpenApiDocumentation;
  protected readonly example?: OpenApiExample;
  protected readonly nullable?: boolean;
  protected readonly default?: unknown;

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
    this.type = type;
    this.xml = xml;
    this.docs = docs;
    this.example = example;
    this.description = description;
    this.nullable = nullable;
    this.default = defaultVal;
  }

  public abstract addXML(xml: OpenApiXML): OpenApiSchema;
  public abstract addExternalDocs(docs: OpenApiDocumentation): OpenApiSchema;
  public abstract addExample(example: OpenApiExample): OpenApiSchema;
  public abstract addDescription(description: string): OpenApiSchema;
  public abstract addNullable(nullable: boolean): OpenApiSchema;
  public abstract addDefault(defaultVal: unknown): OpenApiSchema;
  public abstract toJSON(): unknown;

  protected commonJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "type", { value: this.type });
    if (this.docs !== undefined) {
      Object.defineProperty(json, "docs", {
        value: this.docs.toJSON(),
      });
    }
    if (this.description !== undefined) {
      Object.defineProperty(json, "description", { value: this.description });
    }
    if (this.example !== undefined) {
      Object.defineProperty(json, "example", { value: this.example });
    }
    if (this.xml !== undefined) {
      Object.defineProperty(json, "xml", { value: this.xml.toJSON() });
    }
    if (this.nullable !== undefined) {
      Object.defineProperty(json, "nullable", { value: this.nullable });
    }
    if (this.default !== undefined) {
      Object.defineProperty(json, "default", { value: this.default });
    }
    return json;
  }
}

type OpenApiSchemaNumberFormat = "float" | "double" | "int32" | "int64";

class OpenApiSchemaNumber extends OpenApiSchema {
  private readonly minimum?: number;
  private readonly maximum?: number;
  private readonly exclusiveMinimum?: boolean;
  private readonly exclusiveMaximum?: boolean;
  private readonly format?: OpenApiSchemaNumberFormat;
  private readonly multipleOf?: number;
  private readonly enums?: Set<number | null>;

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
    this.minimum = minimum;
    this.maximum = maximum;
    this.exclusiveMinimum = exclusiveMinimum;
    this.exclusiveMaximum = exclusiveMaximum;
    this.format = format;
    this.multipleOf = multipleOf;
    this.enums = enums;
  }

  public addDefault(defaultVal: number): OpenApiSchema {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      defaultVal,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }

  public addEnum(enumVal: number): OpenApiSchemaNumber {
    let enums: Set<number | null>;
    if (this.enums) {
      enums = new Set(this.enums);
      enums.add(enumVal);
    } else {
      enums = new Set();
      enums.add(enumVal);
    }
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      enums,
    );
  }

  public addNullable(bool: boolean): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      bool,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }

  public addMultipleOf(multiple: number) {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      multiple,
      this.enums,
    );
  }

  public addFormat(format: OpenApiSchemaNumberFormat) {
    if (
      (this.type === "integer" && format === "float") ||
      (this.type === "integer" && format === "double") ||
      (this.type === "number" && format === "int32") ||
      (this.type === "number" && format === "int64")
    ) {
      throw new Error(`Cannot assign ${format} if the type is ${this.type}`);
    }
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      format,
      this.multipleOf,
      this.enums,
    );
  }

  public addExclusiveMaximum(exclusiveMaximum: boolean) {
    if (!this.maximum) {
      throw new Error(
        `Cannot add an exclusive maximum as a maximum has not been added yet.`,
      );
    }
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }

  public addExclusiveMinimum(exclusiveMinimum: boolean) {
    if (!this.minimum) {
      throw new Error(
        `Cannot add an exclusive minimum as a minimum has not been added yet.`,
      );
    }
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }

  public addMaximum(maximum: number) {
    if (this.minimum && this.minimum > maximum) {
      throw new Error(
        `${maximum} is smaller than the current minimum ${this.minimum}`,
      );
    }
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }

  public addMinimum(minimum: number) {
    if (this.maximum && this.maximum < minimum) {
      throw new Error(
        `${minimum} is larger than the current maximum ${this.maximum}`,
      );
    }
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }

  public addXML(xml: OpenApiXML): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }
  public addExternalDocs(docs: OpenApiDocumentation): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }
  public addExample(example: OpenApiExample): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      example,
      this.description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }
  public addDescription(description: string): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.docs,
      this.example,
      description,
      this.nullable,
      this.default,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
      this.enums,
    );
  }
  public toJSON(): unknown {
    const json = this.commonJSON();
    Object.defineProperty(json, "type", { value: this.type });
    if (this.minimum !== undefined) {
      Object.defineProperty(json, "minimum", { value: this.minimum });
    }
    if (this.maximum !== undefined) {
      Object.defineProperty(json, "maximum", { value: this.maximum });
    }
    if (this.exclusiveMinimum !== undefined) {
      Object.defineProperty(json, "exclusiveMinimum", {
        value: this.exclusiveMinimum,
      });
    }
    if (this.exclusiveMaximum !== undefined) {
      Object.defineProperty(json, "exclusiveMaximum", {
        value: this.exclusiveMaximum,
      });
    }
    if (this.format !== undefined) {
      Object.defineProperty(json, "format", { value: this.format });
    }
    if (this.multipleOf !== undefined) {
      Object.defineProperty(json, "multipleOf", { value: this.multipleOf });
    }
    if (this.enums !== undefined) {
      Object.defineProperty(json, "enum", { value: Array.from(this.enums) });
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

  public addDefault(defaultVal: boolean): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      defaultVal,
    );
  }

  public addXML(xml: OpenApiXML): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
    );
  }
  public addExternalDocs(docs: OpenApiDocumentation): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this.xml,
      docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
    );
  }
  public addExample(example: OpenApiExample): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this.xml,
      this.docs,
      example,
      this.description,
      this.nullable,
      this.default,
    );
  }
  public addDescription(description: string): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this.xml,
      this.docs,
      this.example,
      description,
      this.nullable,
      this.default,
    );
  }
  public addNullable(nullable: boolean): OpenApiSchemaBoolean {
    return new OpenApiSchemaBoolean(
      this.xml,
      this.docs,
      this.example,
      this.description,
      nullable,
      this.default,
    );
  }
  public toJSON(): unknown {
    return this.commonJSON();
  }
}

class OpenApiSchemaString extends OpenApiSchema {
  private readonly minLength?: number;
  private readonly maxLength?: number;
  private readonly format?: string;
  private readonly pattern?: RegExp;
  private readonly enums?: Set<string | null>;

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
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.format = format;
    this.pattern = pattern;
    this.enums = enums;
  }

  public addDefault(defaultVal: string): OpenApiSchema {
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      defaultVal,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }

  public addEnum(enumVal: string | null) {
    let enums: Set<string | null>;
    if (this.enums) {
      enums = new Set(this.enums);
      enums.add(enumVal);
    } else {
      enums = new Set();
      enums.add(enumVal);
    }
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
      enums,
    );
  }

  public addNullable(bool: boolean): OpenApiSchema {
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      this.description,
      bool,
      this.default,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }

  public addPattern(pattern: RegExp) {
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minLength,
      this.maxLength,
      this.format,
      pattern,
      this.enums,
    );
  }

  public addFormat(format: string) {
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minLength,
      this.maxLength,
      format,
      this.pattern,
      this.enums,
    );
  }

  public addMaxLength(maxLength: number) {
    if (this.minLength && maxLength < this.minLength) {
      throw new Error(
        `Maximum length: ${maxLength} is smaller than min length: ${this.minLength}`,
      );
    } else if (!Number.isInteger(maxLength) || maxLength < 0) {
      throw new Error(
        `${maxLength} is not positive integer greater than or equal to zero.`,
      );
    }
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minLength,
      maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }
  public addMinLength(minLength: number) {
    if (this.maxLength && this.maxLength < minLength) {
      throw new Error(
        `Minimum length: ${minLength} is greater than max length: ${this.maxLength}`,
      );
    } else if (!Number.isInteger(minLength) || minLength < 0) {
      throw new Error(
        `${minLength} is not positive integer greater than or equal to zero.`,
      );
    }
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      minLength,
      this.maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }

  public addXML(xml: OpenApiXML): OpenApiSchemaString {
    return new OpenApiSchemaString(
      xml,
      this.docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }

  public addExternalDocs(docs: OpenApiDocumentation): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this.xml,
      docs,
      this.example,
      this.description,
      this.nullable,
      this.default,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }
  public addExample(example: OpenApiExample): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      example,
      this.description,
      this.nullable,
      this.default,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }
  public addDescription(description: string): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this.xml,
      this.docs,
      this.example,
      description,
      this.nullable,
      this.default,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
      this.enums,
    );
  }

  public toJSON(): unknown {
    const json = this.commonJSON();
    if (this.minLength !== undefined) {
      Object.defineProperty(json, "minLength", {
        value: this.minLength,
      });
    }
    if (this.maxLength !== undefined) {
      Object.defineProperty(json, "maxLength", { value: this.maxLength });
    }
    if (this.format !== undefined) {
      Object.defineProperty(json, "format", { value: this.format });
    }
    if (this.pattern !== undefined) {
      Object.defineProperty(json, "pattern", { value: this.pattern });
    }
    if (this.enums !== undefined) {
      Object.defineProperty(json, "enum", { value: Array.from(this.enums) });
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
    type: OpenApiSchemaType,
    properties?: Map<string, OpenApiSchema>,
    discriminator?: OpenApiDiscriminator,
    xml?: OpenApiXML,
    docs?: OpenApiDocumentation,
    example?: OpenApiExample,
    description?: string,
    requiredProperties?: Set<string>,
    additionalProperties?: Map<string, OpenApiSchema>,
    minProperties?: number,
    maxProperties?: number,
  ) {
    super(type, discriminator, xml, docs, example, description);
    this.properties = properties;
    this.requiredProperties = requiredProperties;
    this.additionalProperties = additionalProperties;
    this.minProperties = minProperties;
    this.maxProperties = maxProperties;
  }

  public addAdditionalProperty(propertyName: string) {
    return {
      addPropertyValue: (propertyValue: OpenApiSchema) => {
        let additionalProperties: Map<string, OpenApiSchema>;
        if (!this.additionalProperties) {
          additionalProperties = new Map();
          additionalProperties.set(propertyName, propertyValue);
        } else {
          additionalProperties = new Map(this.additionalProperties);
          additionalProperties.set(propertyName, propertyValue);
        }
        return new OpenApiSchemaObject(
          this.type,
          this.properties,
          this.discriminator,
          this.xml,
          this.docs,
          this.example,
          this.description,
          this.requiredProperties,
          this.additionalProperties,
          this.minProperties,
          this.maxProperties,
        );
      },
    };
  }

  public toJSON(): unknown {
    throw new Error("Method not implemented.");
  }

  public addRequiredProperty(propertyName: string) {
    let requiredProperties: Set<string>;
    if (this.requiredProperties) {
      requiredProperties = new Set(this.requiredProperties);
    } else {
      requiredProperties = new Set();
    }
    requiredProperties.add(propertyName);
    return new OpenApiSchemaObject(
      this.type,
      this.properties,
      this.discriminator,
      this.xml,
      this.docs,
      this.example,
      this.description,
      requiredProperties,
      this.additionalProperties,
      this.minProperties,
      this.maxProperties,
    );
  }

  public addDescription(description: string): OpenApiSchemaObject {
    return new OpenApiSchemaObject(
      this.type,
      this.properties,
      this.discriminator,
      this.xml,
      this.docs,
      this.example,
      description,
      this.requiredProperties,
      this.additionalProperties,
      this.minProperties,
      this.maxProperties,
    );
  }

  public addProperty(propertyName: string) {
    return {
      addPropertyValue: (propertyValue: OpenApiSchema) => {
        let properties: Map<string, OpenApiSchema>;
        if (!this.properties) {
          properties = new Map();
          properties.set(propertyName, propertyValue);
        } else {
          properties = new Map(this.properties);
          properties.set(propertyName, propertyValue);
        }
        return new OpenApiSchemaObject(
          this.type,
          properties,
          this.discriminator,
          this.xml,
          this.docs,
          this.example,
          this.description,
          this.requiredProperties,
          this.additionalProperties,
          this.minProperties,
          this.maxProperties,
        );
      },
    };
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
