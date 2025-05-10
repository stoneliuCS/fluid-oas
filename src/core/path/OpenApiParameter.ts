import {
  Base,
  withDeprecated,
  withDescription,
  withName,
  withRequired,
} from "../common/common";
import { serializeError } from "../common/utils";

const ParameterBase = withDeprecated(
  withRequired(withDescription(withName(Base))),
);

class _OpenApiParameter extends ParameterBase {
  private _in?: "query" | "header" | "path" | "cookie";

  in(_in: "query" | "header" | "path" | "cookie") {
    const copy: this = Object.create(this);
    copy._in = _in;
    return copy;
  }

  toJSON(): unknown {
    const json = super.toJSON();
    if (!this._in) {
      throw new TypeError(serializeError(_OpenApiParameter, "in"));
    }
    Object.defineProperty(json, "in", { value: this._in, enumerable: true });
    return json;
  }
}

export const OpenApiParameter = new _OpenApiParameter();
export type OpenApiParameter = _OpenApiParameter;
