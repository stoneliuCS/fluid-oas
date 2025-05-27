import {
  withDescription,
  withMethods,
  withParametersArray,
  withServersArray,
  withSummary,
} from "../../../common/common";
import type { OpenApiHTTPMethod } from "../../../common/types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiOperation } from "./OpenApiOperation";
import type { OpenApiParameter } from "./OpenApiParameter";
import type { OpenApiServer } from "./OpenApiServer";

const PathItemBase = withParametersArray(
  withServersArray(withMethods(withDescription(withSummary(Base))))()
)<OpenApiParameter>();

export interface OpenApiPathItem extends BaseInterface {
  addSummary(summary: string): this;
  addDescription(description: string): this;
  addMethod(method: OpenApiHTTPMethod, operation: OpenApiOperation): this;
  addServers(servers: OpenApiServer[]): this;
  addParameters(parameters: OpenApiParameter[]): this;
}

class _OpenApiPathItem extends PathItemBase implements OpenApiPathItem {}

export function PathItem(): OpenApiPathItem {
  return new _OpenApiPathItem();
}
