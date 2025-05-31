import { withDefault, withDescription, withEnum } from "../common";
import { Base, type BaseInterface } from "./base";

const ServerVariableBase = withDescription(
  withDefault(withEnum(Base)<string>())<string>()
);

export interface OpenApiServerVariable extends BaseInterface {
  addEnums(val: string[]): this;
  addDefault(val: string): this;
  addDescription(description: string): this;
}

class _OpenApiServerVariable
  extends ServerVariableBase
  implements OpenApiServerVariable {}

export const ServerVariable: {
  addDefault(val: string): OpenApiServerVariable;
} = {
  addDefault(val: string) {
    return new _OpenApiServerVariable().addDefault(val);
  },
};
