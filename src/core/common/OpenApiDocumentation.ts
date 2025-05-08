import { Map } from "immutable";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import type { OpenApiSpecificationProperty } from "../types/OpenApi";

class _OpenApiDocumentation
  implements OpenApiSpecificationProperty<_OpenApiDocumentation>
{
  static create() {
    return new _OpenApiDocumentation();
  }
  private constructor(
    private readonly _description?: string,
    private readonly _url?: string,
    private readonly _extensions?: Map<string, OpenApiSchema>,
  ) {}
  toJSON(): unknown {
    const json = {};
    if (this._description) {
      Object.defineProperty(json, "description", { value: this._description });
    }
    if (this._url) {
      Object.defineProperty(json, "url", { value: this._url });
    }
    if (this._extensions) {
      this._extensions.forEach((val, key) => {
        Object.defineProperty(json, key, { value: val.toJSON() });
      });
    }
    return json;
  }
  extend(name: string, schema: OpenApiSchema): _OpenApiDocumentation {
    return new _OpenApiDocumentation(
      this._description,
      this._url,
      this._extensions
        ? this._extensions.set(name, schema)
        : Map<string, OpenApiSchema>().set(name, schema),
    );
  }
  description(description: string) {
    return new _OpenApiDocumentation(description, this._url, this._extensions);
  }
  url(url: string) {
    return new _OpenApiDocumentation(this._description, url, this._extensions);
  }
}

export const CreateOpenApiDocumentation = _OpenApiDocumentation.create;
export type OpenApiDocumentation = _OpenApiDocumentation;
