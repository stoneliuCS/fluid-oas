import {
  withDescription,
  withMethods,
  withParametersArray,
  withRef,
  withServersArray,
  withSummary,
} from "../common";
import type { OpenApiHTTPMethod } from "../types";
import { Base, type BaseInterface } from "./base";
import type { OpenApiOperation } from "./OpenApiOperation";
import type { OpenApiParameter } from "./OpenApiParameter";
import type { OpenApiReferenceObject } from "./OpenApiReferenceObject";
import type { OpenApiServer } from "./OpenApiServer";

const PathItemBase = withRef(
  withParametersArray(
    withServersArray(withMethods(withDescription(withSummary(Base))))()
  )<OpenApiParameter>()
);

export interface OpenApiPathItem extends BaseInterface {
  addSummary(summary: string): this;
  addDescription(description: string): this;
  addMethod(
    mappings: Partial<{ [K in OpenApiHTTPMethod]: OpenApiOperation }>
  ): this;
  addServers(servers: OpenApiServer[]): this;
  addParameters(
    parameters: (OpenApiParameter | OpenApiReferenceObject)[]
  ): this;
  add$Ref($ref: string): this;
}

class _OpenApiPathItem extends PathItemBase implements OpenApiPathItem {}

export const PathItem: OpenApiPathItem = new _OpenApiPathItem();
