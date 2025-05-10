import { OpenApiSchemaClass } from "./OpenApiSchema";

class _OpenApiBoolean extends OpenApiSchemaClass {
  private readonly _type: string = "boolean";

  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", {
      value: this._type,
      enumerable: true,
    });
    return json;
  }
}

export const OpenApiBoolean = new _OpenApiBoolean();
export type OpenApiBoolean = typeof OpenApiBoolean;
