import {
  withDescription,
  withExternalValue,
  withSummary,
  withValue,
} from "../../common/common";
import { Base } from "./base";

const ExampleBase = withValue(
  withExternalValue(withSummary(withDescription(Base)))
)<unknown>();
class _OpenApiExample extends ExampleBase {}

export const example = () => new _OpenApiExample();
export type Example = _OpenApiExample;
