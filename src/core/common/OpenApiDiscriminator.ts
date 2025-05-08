import { Map } from "immutable";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import type { OpenApiSpecificationProperty } from "../types/OpenApi";

class _OpenApiDiscriminator
  implements OpenApiSpecificationProperty<_OpenApiDiscriminator>
{
  static create(propertyName: string) {
    return new _OpenApiDiscriminator(propertyName);
  }
  private constructor(
    private readonly _propertyName: string,
    private readonly _mapping?: Map<string, OpenApiSchema>,
    private readonly _extensions?: Map<string, OpenApiSchema>,
  ) {}

  toJSON(): unknown {
    const json = {
      propertyName: this._propertyName,
    };
    if (this._mapping) {
      Object.defineProperty(json, "mapping", {
        value: this._mapping.map((val) => {
          return val.toJSON();
        }),
      });
    }
    if (this._extensions) {
      this._extensions.forEach((val, key) => {
        Object.defineProperty(json, key, { value: val.toJSON() });
      });
    }
    return json;
  }

  map(name: string, schema: OpenApiSchema) {
    return new _OpenApiDiscriminator(
      this._propertyName,
      this._mapping
        ? this._mapping.set(name, schema)
        : Map<string, OpenApiSchema>().set(name, schema),
      this._extensions,
    );
  }

  extend(name: string, schema: OpenApiSchema): _OpenApiDiscriminator {
    return new _OpenApiDiscriminator(
      this._propertyName,
      this._mapping,
      this._extensions
        ? this._extensions.set(name, schema)
        : Map<string, OpenApiSchema>().set(name, schema),
    );
  }
}

export const CreateOpenApiDiscriminator = _OpenApiDiscriminator.create;
export type OpenApiDiscriminator = _OpenApiDiscriminator;
