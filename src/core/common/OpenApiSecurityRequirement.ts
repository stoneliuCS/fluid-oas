import { withSecurityRequirement } from "../../common/common";
import { _base } from "./base";

const SecurityRequirementBase = withSecurityRequirement(_base);

class _OpenApiSecurityRequirementBase extends SecurityRequirementBase {}

export function SecurityRequirement() {
  return new _OpenApiSecurityRequirementBase();
}

export type OpenApiSecurityRequirement = _OpenApiSecurityRequirementBase;
