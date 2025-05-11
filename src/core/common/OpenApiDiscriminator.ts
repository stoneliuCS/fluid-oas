import type { OpenApiSchema } from '../schema/OpenApiSchema';
import { Base } from './common';

const DiscriminatorBase = Base;

class _OpenApiDiscriminator extends DiscriminatorBase {
  private _propertyName?: string;
  private _mapping?: Map<string, OpenApiSchema>;
  propertyName(propertyName: string): this {
    const copy = Object.create(this);
    copy._propertyName = propertyName;
    return copy;
  }

  mapping(name: string) {
    return {
      schema: (schema: OpenApiSchema): this => {
        const copy = Object.create(this);
        copy._mapping = new Map(this._mapping);
        copy._mapping.set(name, schema);
        return copy;
      },
    };
  }

  toJSON() {
    const json = super.toJSON();

    if (this._mapping) {
      const map: any = {};
      this._mapping.forEach((val, key) => {
        map[key] = val.toJSON();
      });
      Object.defineProperty(json, 'mapping', {
        value: map,
        enumerable: true,
      });
    }
    if (this._propertyName) {
      Object.defineProperty(json, 'propertyName', {
        value: this._propertyName,
        enumerable: true,
      });
    }
    return json;
  }
}

export const OpenApiDiscriminator = () => new _OpenApiDiscriminator();
export type OpenApiDiscriminator = _OpenApiDiscriminator;
