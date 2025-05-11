import {
  SchemaBase,
  withDefault,
  withEnum,
  withFormat,
  withMaximum,
  withMinimum,
  withNullable,
} from '../common/common';

const StringBase = withEnum(
  withFormat(
    withNullable(
      withMaximum(withMinimum(withDefault(SchemaBase)<string>())('minLength'))(
        'maxLength'
      )
    )
  )<string>()
)<string>();
class _OpenApiString extends StringBase {
  private readonly _type: string = 'string';
  private _pattern?: RegExp;

  pattern(pattern: RegExp): this {
    const copy: this = Object.create(this);
    copy._pattern = pattern;
    return copy;
  }

  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, 'type', {
      value: this._type,
      enumerable: true,
    });

    if (this._pattern) {
      Object.defineProperty(json, 'pattern', {
        value: this._pattern.source,
        enumerable: true,
      });
    }
    return json;
  }
}

export const OpenApiString = () => new _OpenApiString();
export type OpenApiStringType = _OpenApiString;
