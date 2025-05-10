import { OpenApiSchema } from "./OpenApiSchema";

class _OpenApiString extends OpenApiSchema {
  private readonly _type: string = "string";
  private _minLength?: number;
  private _maxLength?: number;
  private _format?: string;
  private _pattern?: RegExp;

  min(min: number): this {
    const copy: this = Object.create(this);
    copy._minLength = min;
    return copy;
  }

  max(max: number): this {
    const copy: this = Object.create(this);
    copy._maxLength = max;
    return copy;
  }

  format(format: string): this {
    const copy: this = Object.create(this);
    copy._format = format;
    return copy;
  }

  pattern(pattern: RegExp): this {
    const copy: this = Object.create(this);
    copy._pattern = pattern;
    return copy;
  }

  toJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "type", { value: this._type });

    if (this._minLength) {
      Object.defineProperty(json, "minLength", { value: this._minLength });
    }

    if (this._maxLength) {
      Object.defineProperty(json, "maxLength", { value: this._maxLength });
    }

    if (this._format) {
      Object.defineProperty(json, "format", { value: this._format });
    }

    if (this._pattern) {
      Object.defineProperty(json, "pattern", { value: this._pattern.source });
    }
    return json;
  }
}

export const OpenApiString = new _OpenApiString();
export type OpenApiString = typeof OpenApiString;
