import { SchemaBase } from "../common/common";

class _OpenApiBoolean extends SchemaBase {
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
export type OpenApiBooleanType = typeof OpenApiBoolean;
