import { SchemaBase, withDefault, withMaximum, withMinimum } from "../common/common";

const StringBase = withMaximum(
  withMinimum(withDefault(SchemaBase)<string>())("minLength"),
)("maxLength");
class _OpenApiString extends StringBase {
  private readonly _type: string = "string";
  private _format?: string;
  private _pattern?: RegExp;

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

export const OpenApiString = new _OpenApiString();
export type OpenApiStringType = _OpenApiString;
