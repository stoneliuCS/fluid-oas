import {
  withEnum,
  withDefault,
  withPattern,
  withMaxLength,
  withMinLength,
  withFormat,
} from "../common";
import { SchemaBase, type SchemaInterface } from "../lib/base";

const StringBase = withEnum(
  withDefault(
    withPattern(withMaxLength(withMinLength(withFormat(SchemaBase)<string>())))
  )<string>()
)<string | null>();

export interface OpenApiString extends SchemaInterface {
  /**
   * Adds a format to this OpenApiString.
   *
   * @param val - a format string i.e. "date" or "date-time"
   */
  addFormat(val: string): this;
  /**
   * Validates the string with the minimum length.
   *
   * @param min - Min length of the string.
   */
  addMinLength(min: number): this;
  /**
   * Validates the string with the maximum length.
   *
   * @param max - Max length of the string.
   */
  addMaxLength(max: number): this;
  /**
   * Validates the string with a regular expresssion.
   *
   * @param pattern - Regular expression to validate against.
   */
  addPattern(pattern: RegExp): this;
  /**
   * Adds a default value to this OpenApiString
   *
   * @param val - Default value
   */
  addDefault(val: string): this;
  /**
   * Adds the potential enumerations to validate against this OpenApiString.
   *
   * @param val - String enumerations or null
   */
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
 * Creates a OpenAPI String Schema.
 */
export function String(): OpenApiString {
  return new _OpenApiString();
}
