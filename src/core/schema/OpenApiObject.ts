import { SchemaBase, withDefault } from "../common/common";
import type { OpenApiSchema } from "./OpenApiSchema";

const ObjectBase = withDefault(SchemaBase)<OpenApiObjectType>();

class _OpenApiObject extends ObjectBase {
  private readonly _type: string = "object";
  private _required?: string[];
  private _properties?: Map<string, OpenApiSchema>;
  private _additionalProperties?: Map<string, OpenApiSchema>;

  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", {
      value: this._type,
      enumerable: true,
    });
    if (this._required) {
      Object.defineProperty(json, "required", {
        value: this._required,
        enumerable: true,
      });
    }
    if (this._properties) {
      const map: any = {};
      this._properties.forEach((val, key) => {
        map[key] = val.toJSON();
      });
      Object.defineProperty(json, "properties", {
        value: map,
        enumerable: true,
      });
    }
    if (this._additionalProperties) {
      const map: any = {};
      this._additionalProperties.forEach((val, key) => {
        map[key] = val.toJSON();
      });
      Object.defineProperty(json, "additionalProperties", {
        value: map,
        enumerable: true,
      });
    }
    return json;
  }

  property(name: string) {
    return {
      schema: (schema: OpenApiSchema): this => {
        const copy: this = Object.create(this);
        copy._properties = new Map(this._properties);
        copy._properties.set(name, schema);
        return copy;
      },
    };
  }

  additionalProperty(name: string) {
    return {
      schema: (schema: OpenApiSchema): this => {
        const copy: this = Object.create(this);
        copy._additionalProperties = new Map(this._properties);
        copy._additionalProperties.set(name, schema);
        return copy;
      },
    };
  }

  required(required: string): this {
    const copy: this = Object.create(this);
    copy._required =
      this._required === undefined ? [required] : [...this._required, required];
    return copy;
  }
}

export const OpenApiObject = new _OpenApiObject();
export type OpenApiObjectType = _OpenApiObject;
