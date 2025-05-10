import { SchemaBase } from "../common/common";
import type { OpenApiSchema } from "./OpenApiSchema";

const OneOfBase = SchemaBase;

class _OpenApiOneOf extends OneOfBase {
  private _oneOf?: OpenApiSchema[];

  of(schema: OpenApiSchema) {
    const copy: this = Object.create(this);
    copy._oneOf =
      this._oneOf === undefined ? [schema] : [...this._oneOf, schema];
    return copy;
  }

  toJSON(): unknown {
    const json = super.toJSON();
    if (this._oneOf) {
      Object.defineProperty(json, "oneOf", {
        value: this._oneOf.map((schema) => schema.toJSON()),
        enumerable: true,
      });
    }
    return json;
  }
}

export const OpenApiOneOf = new _OpenApiOneOf();
export type OpenApiOneOfType = _OpenApiOneOf;
