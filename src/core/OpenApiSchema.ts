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
  protected readonly discriminator?: OpenApiDiscriminator;
  protected readonly xml?: OpenApiXML;
  protected readonly externalDocs?: OpenApiExternalDocumentation;
  protected readonly example?: OpenApiExample;

  public static create(type: "array"): OpenApiSchemaArray;
  public static create(type: "object"): OpenApiSchemaObject;
  public static create(
    type: "string" | "number" | "boolean" | "integer",
  ): OpenApiSchemaPrimitive;
  public static create(type: OpenApiSchemaType): OpenApiSchema {
    if (
      type === "string" ||
      type === "number" ||
      type === "boolean" ||
      type === "integer"
    ) {
      return new OpenApiSchemaPrimitive(type);
    } else if (type === "object") {
      return new OpenApiSchemaObject(type);
    } else {
      return new OpenApiSchemaArray(type);
    }
  }

  protected constructor(
    type: OpenApiSchemaType,
    discriminator?: OpenApiDiscriminator,
    xml?: OpenApiXML,
    externalDocs?: OpenApiExternalDocumentation,
    example?: OpenApiExample,
    description?: string,
  ) {
    this.type = type;
    this.discriminator = discriminator;
    this.xml = xml;
    this.externalDocs = externalDocs;
    this.example = example;
    this.description = description;
    deepFreeze(this);
  }

  public abstract addDiscriminator(
    discriminator: OpenApiDiscriminator,
  ): OpenApiSchema;
  public abstract addXML(xml: OpenApiXML): OpenApiSchema;
  public abstract addExternalDocs(
    externalDocs: OpenApiExternalDocumentation,
  ): OpenApiSchema;
  public abstract addExample(example: OpenApiExample): OpenApiSchema;
  public abstract addDescription(description: string): OpenApiSchema;
  public abstract toJSON(): OpenApiSchemaJSON;
}

class OpenApiSchemaPrimitive extends OpenApiSchema {
  private readonly format?: string;
  private readonly minimum?: number;
  private readonly maximum?: number;

  public constructor(
    type: OpenApiSchemaType,
    discriminator?: OpenApiDiscriminator,
    xml?: OpenApiXML,
    externalDocs?: OpenApiExternalDocumentation,
    example?: OpenApiExample,
    description?: string,
    format?: string,
    minimum?: number,
    maximum?: number,
  ) {
    super(type, discriminator, xml, externalDocs, example, description);
    this.format = format;
    this.minimum = minimum;
    this.maximum = maximum;
  }

  public toJSON(): OpenApiSchemaJSON {
    throw new Error("Method not implemented.");
  }

  public addDescription(description: string): OpenApiSchema {
    return new OpenApiSchemaPrimitive(
      this.type,
      this.discriminator,
      this.xml,
      this.externalDocs,
      this.example,
      description,
      this.format,
      this.minimum,
      this.maximum,
    );
  }

  public addMax(maximum: number) {
    return new OpenApiSchemaPrimitive(
      this.type,
      this.discriminator,
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      this.format,
      this.minimum,
      maximum,
    );
  }

  public addMin(minimum: number) {
    return new OpenApiSchemaPrimitive(
      this.type,
      this.discriminator,
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      this.format,
      minimum,
      this.maximum,
    );
  }

  public addDiscriminator(
    discriminator: OpenApiDiscriminator,
  ): OpenApiSchemaPrimitive {
    return new OpenApiSchemaPrimitive(
      this.type,
      discriminator,
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      this.format,
      this.minimum,
      this.maximum,
    );
  }

  public addXML(xml: OpenApiXML): OpenApiSchemaPrimitive {
    return new OpenApiSchemaPrimitive(
      this.type,
      this.discriminator,
      xml,
      this.externalDocs,
      this.example,
      this.description,
      this.format,
      this.minimum,
      this.maximum,
    );
  }

  public addExternalDocs(
    externalDocs: OpenApiExternalDocumentation,
  ): OpenApiSchemaPrimitive {
    return new OpenApiSchemaPrimitive(
      this.type,
      this.discriminator,
      this.xml,
      externalDocs,
      this.example,
      this.description,
      this.format,
      this.minimum,
      this.maximum,
    );
  }

  public addExample(example: OpenApiExample): OpenApiSchemaPrimitive {
    return new OpenApiSchemaPrimitive(
      this.type,
      this.discriminator,
      this.xml,
      this.externalDocs,
      example,
      this.description,
      this.format,
      this.minimum,
      this.maximum,
    );
  }

  public addFormat(format: string) {
    return new OpenApiSchemaPrimitive(
      this.type,
      this.discriminator,
      this.xml,
      this.externalDocs,
      this.example,
      this.description,
      format,
      this.minimum,
      this.maximum,
    );
  }
}

class OpenApiSchemaObject extends OpenApiSchema {
  private readonly properties?: Map<string, OpenApiSchema>;
  private readonly requiredProperties?: Set<string>;
  private readonly additionalProperties?: Map<string, OpenApiSchema>;

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
  ) {
    super(type, discriminator, xml, externalDocs, example, description);
    this.properties = properties;
    this.requiredProperties = requiredProperties;
    this.additionalProperties = additionalProperties;
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
        );
      },
    };
  }
}

class OpenApiSchemaArray extends OpenApiSchema {}
