import { Map } from "immutable";
import type { OpenApiDocumentation } from "../common/OpenApiDocumentation";
import type { OpenApiXML } from "../common/OpenApiXML";
import type { OpenApiSchema } from "../types/OpenApi";

class _OpenApiString implements OpenApiSchema {
  private readonly _type = "string";

  static create() {
    return new _OpenApiString();
  }
  private constructor(
    private readonly _min?: number,
    private readonly _max?: number,
    private readonly _format?: string,
    private readonly _pattern?: RegExp,
    private readonly _extensions?: Map<string, OpenApiSchema>,
    private readonly _xml?: OpenApiXML,
    private readonly _docs?: OpenApiDocumentation,
    private readonly _nullable?: boolean
  ) {}

  toJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "type", { value: this._type });
    if (this._min) {
      Object.defineProperty(json, "minLength", { value: this._min });
    }
    if (this._max) {
      Object.defineProperty(json, "maxLength", { value: this._max });
    }
    if (this._format) {
      Object.defineProperty(json, "format", { value: this._format });
    }
    if (this._pattern) {
      Object.defineProperty(json, "pattern", { value: this._pattern.source });
    }
    if (this._extensions) {
      this._extensions.forEach((val, key) => {
        Object.defineProperty(json, key, { value: val.toJSON() });
      });
    }
    if (this._xml) {
      Object.defineProperty(json, "xml", { value: this._xml.toJSON() });
    }
    if (this._docs) {
      Object.defineProperty(json, "externalDocs", {
        value: this._docs.toJSON(),
      });
    }
    return json;
  }

  nullable(): _OpenApiString {
    return new _OpenApiString(
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._extensions,
      this._xml,
      this._docs,
      true
    );
      
  }

  pattern(pattern: RegExp) {
    return new _OpenApiString(
      this._min,
      this._max,
      this._format,
      pattern,
      this._extensions,
      this._xml,
      this._docs,
      this._nullable
    );
  }

  format(format: string) {
    return new _OpenApiString(
      this._min,
      this._max,
      format,
      this._pattern,
      this._extensions,
      this._xml,
      this._docs,
      this._nullable
    );
  }

  max(max: number) {
    return new _OpenApiString(
      this._min,
      max,
      this._format,
      this._pattern,
      this._extensions,
      this._xml,
      this._docs,
      this._nullable
    );
  }

  min(min: number) {
    return new _OpenApiString(
      min,
      this._max,
      this._format,
      this._pattern,
      this._extensions,
      this._xml,
      this._docs,
      this._nullable
    );
  }

  extend(name: string, schema: OpenApiSchema): OpenApiString {
    return new _OpenApiString(
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._extensions
        ? this._extensions.set(name, schema)
        : Map<string, OpenApiSchema>().set(name, schema),
      this._xml,
      this._docs,
      this._nullable
    );
  }

  xml(xml: OpenApiXML): OpenApiSchema {
    return new _OpenApiString(
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._extensions,
      xml,
      this._docs,
      this._nullable
    );
  }

  externalDocs(externalDocs: OpenApiDocumentation): OpenApiString {
    return new _OpenApiString(
      this._min,
      this._max,
      this._format,
      this._pattern,
      this._extensions,
      this._xml,
      externalDocs,
      this._nullable
    );
  }
}

export type OpenApiString = _OpenApiString;
export const CreateOpenApiString = _OpenApiString.create;
