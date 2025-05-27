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

export function ServerVariable(): OpenApiServerVariable {
  return new _OpenApiServerVariable();
}
