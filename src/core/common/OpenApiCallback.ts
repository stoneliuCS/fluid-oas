import { withCallback } from "../../common/common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiPathItem } from "./OpenApiPathItem";

const CallbackBase = withCallback(Base);

interface Callback extends BaseInterface {
  addCallback(callbackName: string, pathItem: OpenApiPathItem): this;
}

class _OpenApiCallback extends CallbackBase implements Callback {}

export function Callback(): Callback {
  return new _OpenApiCallback();
}

export type OpenApiCallback = Callback;
