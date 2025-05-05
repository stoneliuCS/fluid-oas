import { deepFreeze } from "../../lib/freeze";
import type { OpenApiDocumentation } from "../OpenApiDocumentation";
import type { OpenApiExample } from "../OpenApiExample";
import type { OpenApiXML } from "../OpenApiXML";
import { AbstractOpenApiSchema } from "./OpenApiSchema";

class OpenApiSchemaBoolean extends AbstractOpenApiSchema {
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

export const OpenApiBoolean = new OpenApiSchemaBoolean();
