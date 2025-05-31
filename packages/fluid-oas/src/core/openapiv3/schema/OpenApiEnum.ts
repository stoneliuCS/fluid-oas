import { SchemaBase, type SchemaInterface } from "../lib/base";

export type EnumTypes = string | number | boolean | object | null;

const EnumBase = SchemaBase<EnumTypes>;

export interface OpenApiEnum
  extends Omit<SchemaInterface<EnumTypes>, "addEnums"> {}

class _OpenApiEnum extends EnumBase implements OpenApiEnum {
  private _val: EnumTypes[];
  constructor(...val: EnumTypes[]) {
    super();
    if (val.length == 0) {
      throw new Error("Enums cannot be empty.");
    }
    this._val = val;
  }
  toJSON(): unknown {
    const json = super.toJSON();
    if (this._val) {
      Object.defineProperty(json, "enum", {
        value: this._val,
        enumerable: true,
      });
    }
    return json;
  }
}

/**
 * A Special Utility type for defining arbitrary enumerable values.
 *
 * This is different from the addEnums method on other schemas, as those restrict
 * the enumerable types to be contained with the type of Schema.
 */
export const Enum = (...val: EnumTypes[]): OpenApiEnum => {
  return new _OpenApiEnum(...val);
};
