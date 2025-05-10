import { SchemaBase, withDefault } from "../common/common";

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

const OpenApiBooleanImpl = withDefault(_OpenApiBoolean)<boolean>();
export const OpenApiBoolean = new OpenApiBooleanImpl();
export type OpenApiBooleanType = _OpenApiBoolean;
