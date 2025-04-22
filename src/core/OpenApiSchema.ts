import type { OpenApiSchemaType } from "../types/OpenApiTypes";

export class OpenApiSchema {
  readonly name: string;
  readonly type: OpenApiSchemaType;

  public constructor(name: string, type: OpenApiSchemaType) {
    this.name = name;
    this.type = type;
  }
}
