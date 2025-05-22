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

export function Example() {
  return new _OpenApiExample();
}
export type OpenApiExample = _OpenApiExample;
