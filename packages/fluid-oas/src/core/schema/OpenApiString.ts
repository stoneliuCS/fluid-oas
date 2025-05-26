import {
  withDefault,
  withEnum,
  withFormat,
  withMaxLength,
  withMinLength,
  withPattern,
} from "../../common/common";
import { SchemaBase, type SchemaInterface } from "../common/base";

const StringBase = withEnum(
  withDefault(
    withPattern(withMaxLength(withMinLength(withFormat(SchemaBase)<string>())))
  )<string>()
)<string | null>();

export interface OpenApiString extends SchemaInterface {
  addFormat(val: string): this;
  addMinLength(min: number): this;
  addMaxLength(max: number): this;
  addPattern(pattern: RegExp): this;
  addDefault(val: string): this;
  addEnums(val: (string | null)[]): this;
}
class _OpenApiString extends StringBase implements OpenApiString {
  toJSON(): unknown {
    const json = super.toJSON();
    Object.defineProperty(json, "type", { value: "string", enumerable: true });
    return json;
  }
}

/**
 * Creates a OpenAPI String with methods build from.
 */
export function String(): OpenApiString {
  return new _OpenApiString();
}
