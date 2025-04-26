import type { OpenApiSchemaType } from "../types/OpenApiTypes";

class OpenApiDiscriminator {}
class OpenApiXML {}

export class OpenApiSchema {
  readonly name: string;
  readonly type: OpenApiSchemaType;
  readonly discriminator?: OpenApiDiscriminator;
  readonly xml?: OpenApiXML;

  public static create(name : string, type : OpenApiSchemaType) {
    return new OpenApiSchema(name, type)
  }

  private constructor(name: string, type: OpenApiSchemaType) {
    this.name = name;
    this.type = type;
  }
}
