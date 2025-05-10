import { OpenApiSchema } from "./OpenApiSchema";

class _OpenApiBoolean extends OpenApiSchema {
  private readonly _type: string = "boolean";

  toJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "type", { value: this._type });
    return json;
  }
}

export const OpenApiBoolean = new _OpenApiBoolean();
export type OpenApiBoolean = typeof OpenApiBoolean;
