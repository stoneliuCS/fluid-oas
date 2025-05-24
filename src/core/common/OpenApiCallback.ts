import { withCallback } from "../../common/common";
import { Base } from "./base";

const CallbackBase = withCallback(Base);

class _OpenApiCallback extends CallbackBase {}

export function Callback() {
  return new _OpenApiCallback();
}

export type OpenApiCallback = _OpenApiCallback;
