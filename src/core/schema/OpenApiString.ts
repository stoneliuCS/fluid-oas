import {
  withFormat,
  withMaxLength,
  withMinLength,
  withPattern,
} from "../../common/common";
import { SchemaBase } from "../common/base";

const StringBase = withPattern(
  withMaxLength(withMinLength(withFormat(SchemaBase)<string>()))
);

class _OpenApiString extends StringBase {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "string", enumerable: true });
    return json;
  }
}

export const string = () => new _OpenApiString();
export type String = _OpenApiString;
