import { SchemaBase, withDefault, withNullable } from '../common/common';

const BooleanBase = withNullable(withDefault(SchemaBase)<boolean>());
class _OpenApiBoolean extends BooleanBase {
  private readonly _type: string = 'boolean';

  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, 'type', {
      value: this._type,
      enumerable: true,
    });
    return json;
  }
}

export const OpenApiBoolean = () => new _OpenApiBoolean();
export type OpenApiBooleanType = _OpenApiBoolean;
