import { deepFreeze } from "../../lib/freeze";
import type { OpenApiDocumentation } from "../OpenApiDocumentation";
import type { OpenApiExample } from "../OpenApiExample";
import type { OpenApiXML } from "../OpenApiXML";
import { AbstractOpenApiSchema } from "./OpenApiSchema";

class OpenApiSchemaObject extends AbstractOpenApiSchema {
  private readonly _properties?: Map<string, AbstractOpenApiSchema>;
  private readonly _requiredProperties?: Set<string>;
  private readonly _additionalProperties?: AbstractOpenApiSchema | boolean;
  private readonly _minProperties?: number;
  private readonly _maxProperties?: number;

  public constructor(
    _properties?: Map<string, AbstractOpenApiSchema>,
    _xml?: OpenApiXML,
    _docs?: OpenApiDocumentation,
    _example?: OpenApiExample,
    _description?: string,
    _nullable?: boolean,
    _defaultVal?: unknown,
    _requiredProperties?: Set<string>,
    _additionalProperties?: AbstractOpenApiSchema | boolean,
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
    } else if (maxProperties < 0) {
      throw new Error("Cannot be less than zero.");
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
    } else if (minProperties < 0) {
      throw new Error(`Minimum cannot be less than zero.`);
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

  public additionalProperty(value: AbstractOpenApiSchema | boolean) {
    return new OpenApiSchemaObject(
      this._properties,
      this._xml,
      this._docs,
      this._example,
      this._description,
      this._nullable,
      this._default,
      this._requiredProperties,
      value,
      this._minProperties,
      this._maxProperties,
    );
  }

  private stringifyProperties(
    properties: Map<string, AbstractOpenApiSchema>,
  ): unknown {
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

    if (this._additionalProperties !== undefined) {
      if (typeof this._additionalProperties === "object") {
        Object.defineProperty(json, "additionalProperties", {
          value: this._additionalProperties.toJSON(),
        });
      } else {
        Object.defineProperty(json, "additionalProperties", {
          value: this._additionalProperties,
        });
      }
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
      true,
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

  public property(propertyName: string, property: AbstractOpenApiSchema) {
    let mappedSchemas: Map<string, AbstractOpenApiSchema>;
    if (this._properties) {
      mappedSchemas = new Map(this._properties);
    } else {
      mappedSchemas = new Map();
    }
    mappedSchemas.set(propertyName, property);
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

  public properties(properties: { [key: string]: AbstractOpenApiSchema }) {
    let mappedSchemas: Map<string, AbstractOpenApiSchema>;
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

export const OpenApiObject = new OpenApiSchemaObject();
