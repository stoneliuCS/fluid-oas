import {
  withDescription,
  withMethods,
  withParametersArray,
  withServersArray,
  withSummary,
} from "../../common/common";
import { Base } from "./base";

const PathItemBase = withParametersArray(
  withServersArray(withMethods(withDescription(withSummary(Base))))()
)();

class _OpenApiPathItem extends PathItemBase {}

export function PathItem() {
  return new _OpenApiPathItem();
}

export type OpenApiPathItem = _OpenApiPathItem;
