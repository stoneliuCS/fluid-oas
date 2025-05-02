import { deepFreeze } from "../lib/freeze";
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
        return new OpenApiSchemaNumber();
      case "boolean":
        return new OpenApiSchemaBoolean();
      case "object":
        return new OpenApiSchemaObject();
      case "array":
        return new OpenApiSchemaArray();
      case "integer":
        return new OpenApiSchemaInteger();
    }
  }

  protected constructor(
    type: OpenApiSchemaType,
    xml?: OpenApiXML,
    externalDocs?: OpenApiExternalDocumentation,
    example?: OpenApiExample,
    description?: string,
  ) {
    this.type = type;
    this.xml = xml;
    this.externalDocs = externalDocs;
    this.example = example;
    this.description = description;
  }

  public abstract addXML(xml: OpenApiXML): OpenApiSchema;
  public abstract addExternalDocs(
    externalDocs: OpenApiExternalDocumentation,
  ): OpenApiSchema;
  public abstract addExample(example: OpenApiExample): OpenApiSchema;
  public abstract addDescription(description: string): OpenApiSchema;
  public abstract toJSON(): unknown;
}

class OpenApiSchemaNumber extends OpenApiSchema {}

class OpenApiSchemaBoolean extends OpenApiSchema {}

class OpenApiSchemaInteger extends OpenApiSchema {}

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
    minLength?: number,
    maxLength?: number,
    format?: string,
    pattern?: RegExp,
  ) {
    super("string", xml, externalDocs, example, description);
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.format = format;
    this.pattern = pattern;
  }

  public addPattern(pattern : RegExp) {
    return new OpenApiSchemaString(
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
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
      this.minLength,
      this.maxLength,
      this.format,
      this.pattern,
    );
  }

  public toJSON(): unknown {
    const json = {
      type: this.type,
    };
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
