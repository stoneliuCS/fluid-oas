import type { OpenApiSchemaType } from "../types/OpenApiTypes";

class OpenApiDiscriminator {}
class OpenApiXML {}

export class OpenApiSchema {
  private readonly type: OpenApiSchemaType;

  private constructor(type: OpenApiSchemaType) {
    this.type = type;
  }
}
