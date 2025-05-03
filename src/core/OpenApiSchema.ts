import type { OpenApiSchemaType } from "../types/OpenApiTypes";
import type { OpenApiDiscriminator } from "./OpenApiDiscriminator";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiExternalDocumentation } from "./OpenApiExternalDocumentation";
import type { OpenApiXML } from "./OpenApiXML";

type OpenApiSchemaJSON = {};

export abstract class OpenApiSchema {
  protected readonly type: OpenApiSchemaType;
  protected readonly description?: string;
  protected readonly xml?: OpenApiXML;
  protected readonly externalDocs?: OpenApiExternalDocumentation;
  protected readonly example?: OpenApiExample;
  protected readonly nullable?: boolean;

  public static create(type: "array"): OpenApiSchemaArray;
  public static create(type: "object"): OpenApiSchemaObject;
  public static create(type: "string"): OpenApiSchemaString;
  public static create(type: "boolean"): OpenApiSchemaBoolean;
  public static create(type: "integer" | "number"): OpenApiSchemaNumber;
  public static create(type: OpenApiSchemaType): OpenApiSchema {
    switch (type) {
      case "string":
        return new OpenApiSchemaString();
      case "number":
        return new OpenApiSchemaNumber("number");
      case "boolean":
        return new OpenApiSchemaBoolean();
      case "object":
        return new OpenApiSchemaObject();
      case "array":
        return new OpenApiSchemaArray();
      case "integer":
        return new OpenApiSchemaNumber("integer");
      default:
        throw new Error(`Unknown type : ${type} given.`);
    }
  }

  protected constructor(
    type: OpenApiSchemaType,
    xml?: OpenApiXML,
    externalDocs?: OpenApiExternalDocumentation,
    example?: OpenApiExample,
    description?: string,
    nullable?: boolean,
  ) {
    this.type = type;
    this.xml = xml;
    this.externalDocs = externalDocs;
    this.example = example;
    this.description = description;
    this.nullable = nullable;
  }

  public abstract addXML(xml: OpenApiXML): OpenApiSchema;
  public abstract addExternalDocs(
    externalDocs: OpenApiExternalDocumentation,
  ): OpenApiSchema;
  public abstract addExample(example: OpenApiExample): OpenApiSchema;
  public abstract addDescription(description: string): OpenApiSchema;
  public abstract addNullable(bool: boolean): OpenApiSchema;
  public abstract toJSON(): unknown;

  protected commonJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "type", { value: this.type });
    if (this.externalDocs !== undefined) {
      Object.defineProperty(json, "externalDocs", {
        value: this.externalDocs.toJSON(),
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

  public constructor(
    type: OpenApiSchemaType,
    xml?: OpenApiXML,
    externalDocs?: OpenApiExternalDocumentation,
    example?: OpenApiExample,
    description?: string,
    nullable?: boolean,
    minimum?: number,
    maximum?: number,
    exclusiveMinimum?: boolean,
    exclusiveMaximum?: boolean,
    format?: OpenApiSchemaNumberFormat,
    multipleOf?: number,
  ) {
    super(type, xml, externalDocs, example, description, nullable);
    this.minimum = minimum;
    this.maximum = maximum;
    this.exclusiveMinimum = exclusiveMinimum;
    this.exclusiveMaximum = exclusiveMaximum;
    this.format = format;
    this.multipleOf = multipleOf;
  }

  public addNullable(bool: boolean): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      bool,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
    );
  }

  public addMultipleOf(multiple: number) {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      multiple,
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
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      format,
      this.multipleOf,
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
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      exclusiveMaximum,
      this.format,
      this.multipleOf,
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
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minimum,
      this.maximum,
      exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
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
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minimum,
      maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
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
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
    );
  }

  public addXML(xml: OpenApiXML): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      xml,
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
    );
  }
  public addExternalDocs(
    externalDocs: OpenApiExternalDocumentation,
  ): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
    );
  }
  public addExample(example: OpenApiExample): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.externalDocs,
      example,
      this.description,
      this.nullable,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
    );
  }
  public addDescription(description: string): OpenApiSchemaNumber {
    return new OpenApiSchemaNumber(
      this.type,
      this.xml,
      this.externalDocs,
      this.example,
      description,
      this.nullable,
      this.minimum,
      this.maximum,
      this.exclusiveMinimum,
      this.exclusiveMaximum,
      this.format,
      this.multipleOf,
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
    return json;
  }
}

class OpenApiSchemaBoolean extends OpenApiSchema {}

class OpenApiSchemaString extends OpenApiSchema {
  private readonly minLength?: number;
  private readonly maxLength?: number;
  private readonly format?: string;
  private readonly pattern?: RegExp;

  public constructor(
    xml?: OpenApiXML,
    externalDocs?: OpenApiExternalDocumentation,
    example?: OpenApiExample,
    description?: string,
    nullable?: boolean,
    minLength?: number,
    maxLength?: number,
    format?: string,
    pattern?: RegExp,
  ) {
    super("string", xml, externalDocs, example, description, nullable);
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.format = format;
    this.pattern = pattern;
  }

  public addPattern(pattern: RegExp) {
    return new OpenApiSchemaString(
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minLength,
      this.maxLength,
      this.format,
      pattern,
    );
  }

  public addFormat(format: string) {
    return new OpenApiSchemaString(
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minLength,
      this.maxLength,
      format,
      this.pattern,
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
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minLength,
      maxLength,
      this.format,
      this.pattern,
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
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      minLength,
      this.maxLength,
      this.format,
      this.pattern,
    );
  }

  public addXML(xml: OpenApiXML): OpenApiSchemaString {
    return new OpenApiSchemaString(
      xml,
      this.externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
    );
  }

  public addExternalDocs(
    externalDocs: OpenApiExternalDocumentation,
  ): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this.xml,
      externalDocs,
      this.example,
      this.description,
      this.nullable,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
    );
  }
  public addExample(example: OpenApiExample): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this.xml,
      this.externalDocs,
      example,
      this.description,
      this.nullable,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
    );
  }
  public addDescription(description: string): OpenApiSchemaString {
    return new OpenApiSchemaString(
      this.xml,
      this.externalDocs,
      this.example,
      description,
      this.nullable,
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
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
    externalDocs?: OpenApiExternalDocumentation,
    example?: OpenApiExample,
    description?: string,
    requiredProperties?: Set<string>,
    additionalProperties?: Map<string, OpenApiSchema>,
    minProperties?: number,
    maxProperties?: number,
  ) {
    super(type, discriminator, xml, externalDocs, example, description);
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
          this.externalDocs,
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

  public toJSON(): OpenApiSchemaJSON {
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
      this.externalDocs,
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
      this.externalDocs,
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
          this.externalDocs,
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
