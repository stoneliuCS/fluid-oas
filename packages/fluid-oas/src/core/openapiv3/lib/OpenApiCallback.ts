import { withCallback } from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiPathItem } from "./OpenApiPathItem";

const CallbackBase = withCallback(Base);

export interface OpenApiCallback extends BaseInterface {
  addCallback(callbackName: string, pathItem: OpenApiPathItem): this;
}

class _OpenApiCallback extends CallbackBase implements OpenApiCallback {}

export function Callback(): OpenApiCallback {
  return new _OpenApiCallback();
}
