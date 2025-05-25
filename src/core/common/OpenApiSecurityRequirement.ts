import { withSecurityRequirement } from "../../common/common";
import { Root } from "./base";

const SecurityRequirementBase = withSecurityRequirement(Root);

class _OpenApiSecurityRequirementBase extends SecurityRequirementBase {}

export function SecurityRequirement() {
  return new _OpenApiSecurityRequirementBase();
}

export type OpenApiSecurityRequirement = _OpenApiSecurityRequirementBase;
