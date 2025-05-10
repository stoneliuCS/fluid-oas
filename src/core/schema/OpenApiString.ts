import { SchemaBase, withDefault } from "../common/common";

class _OpenApiString extends SchemaBase {
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
    const json = super.toJSON();
    Object.defineProperty(json, "type", {
      value: this._type,
      enumerable: true,
    });

    if (this._minLength) {
      Object.defineProperty(json, "minLength", {
        value: this._minLength,
        enumerable: true,
      });
    }

    if (this._maxLength) {
      Object.defineProperty(json, "maxLength", {
        value: this._maxLength,
        enumerable: true,
      });
    }

    if (this._format) {
      Object.defineProperty(json, "format", {
        value: this._format,
        enumerable: true,
      });
    }

    if (this._pattern) {
      Object.defineProperty(json, "pattern", {
        value: this._pattern.source,
        enumerable: true,
      });
    }
    return json;
  }
}

const OpenApiStringImpl = withDefault(_OpenApiString)<string>();
export const OpenApiString = new OpenApiStringImpl();
export type OpenApiStringType = typeof OpenApiString;
