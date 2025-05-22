import {
  withEncoding,
  withExample,
  withExamples,
  withSchema,
} from "../../common/common";
import { Base } from "./base";

const MediaTypeBase = withEncoding(withExamples(withExample(withSchema(Base))));

class _OpenApiMediaType extends MediaTypeBase {}

export function MediaType() {
  return new _OpenApiMediaType();
}
export type OpenApiMediaType = _OpenApiMediaType;
