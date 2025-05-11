import {
  Base,
  Fixed,
  withAllowReserved,
  withContentMap,
  withDeprecated,
  withDescription,
  withExample,
  withExamplesMap,
  withExplode,
  withName,
  withRequired,
  withSchema,
  withStyle,
} from "../common/common";
import { serializeError } from "../common/utils";

const ParameterBase = withDeprecated(
  withRequired(withDescription(withName(Base)))
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

const _OpenApiParameterBaseSchema = withAllowReserved(
  withExamplesMap(
    withExample(withSchema(withExplode(withStyle(_OpenApiParameter)<string>())))
  )
);

const _OpenApiParameterBaseContent = withContentMap(_OpenApiParameter);

class _OpenApiParameterSchema extends _OpenApiParameterBaseSchema {}
class _OpenApiParameterContent extends _OpenApiParameterBaseContent {}

export function OpenApiParameter(
  fixed: Fixed.CONTENT
): _OpenApiParameterContent;
export function OpenApiParameter(fixed: Fixed.SCHEMA): _OpenApiParameterSchema;
export function OpenApiParameter(fixed: Fixed) {
  switch (fixed) {
    case Fixed.SCHEMA:
      return new _OpenApiParameterBaseSchema();
    case Fixed.CONTENT:
      return new _OpenApiParameterBaseContent();
  }
}
export type OpenApiParameter =
  | _OpenApiParameterSchema
  | _OpenApiParameterContent;
