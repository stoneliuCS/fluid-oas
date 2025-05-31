import { withConst } from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";

export type ConstTypes = string | number | boolean | object | null;

const ConstBase = withConst(SchemaBase<ConstTypes>)<ConstTypes>();

export interface OpenApiConst
  extends Omit<SchemaInterface<ConstTypes>, "addEnums"> {}

class _OpenApiConst extends ConstBase implements OpenApiConst {
  private _val: ConstTypes;
  constructor(val: ConstTypes) {
    super();
    this._val = val;
  }
  toJSON(): unknown {
    const json = super.toJSON();
    if (this._val) {
      Object.defineProperty(json, "const", {
        value: this._val,
        enumerable: true,
      });
    }
    return json;
  }
}

export const Const = (constant: ConstTypes): OpenApiConst => {
  return new _OpenApiConst(constant);
};
