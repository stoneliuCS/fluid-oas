import {
  withDefault,
  withEnum,
  withFormat,
  withMaxLength,
  withMinLength,
  withPattern,
} from "../../common/common";
import { SchemaBase } from "../common/base";

const StringBase = withEnum(
  withDefault(
    withPattern(withMaxLength(withMinLength(withFormat(SchemaBase)<string>())))
  )<string>()
)<string>();
class _OpenApiString extends StringBase {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "string", enumerable: true });
    return json;
  }
}

export const String = () => new _OpenApiString();
export type OpenApiString = _OpenApiString;
