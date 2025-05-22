import { withDefault, withDescription, withEnum } from "../../common/common";
import { Base } from "./base";

const ServerVariableBase = withDescription(
  withDefault(withEnum(Base)<string>())<string>()
);

class _OpenApiServerVariable extends ServerVariableBase {}

export const ServerVariable = () => new _OpenApiServerVariable();
export type OpenApiServerVariable = _OpenApiServerVariable;
