import { withSecurityRequirement } from "../../../common/common";
import { Root, type RootInterface } from "./base";

const SecurityRequirementBase = withSecurityRequirement(Root);

export interface OpenApiSecurityRequirement extends RootInterface {
  addSecurityRequirement(name: string, val: Array<string>): this;
}

class _OpenApiSecurityRequirementBase extends SecurityRequirementBase {}

export function SecurityRequirement(): OpenApiSecurityRequirement {
  return new _OpenApiSecurityRequirementBase();
}
