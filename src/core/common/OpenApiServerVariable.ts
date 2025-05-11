import { Base, withDefault, withDescription, withEnum } from './common';

const ServerVariableBase = withEnum(
  withDescription(withDefault(Base)<string>())
)<string>();

class _ServerVariable extends ServerVariableBase {}

export const OpenApiServerVariable = () => new _ServerVariable();
export type OpenApiServerVariable = _ServerVariable;
