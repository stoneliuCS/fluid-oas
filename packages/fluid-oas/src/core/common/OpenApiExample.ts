import {
  withDescription,
  withExternalValue,
  withSummary,
  withValue,
} from "../../common/common";
import { Base, type BaseInterface } from "./base";

const ExampleBase = withValue(
  withExternalValue(withSummary(withDescription(Base)))
)<unknown>();

export interface OpenApiExample extends BaseInterface {
  addValue(val: string | unknown): this;
  addExternalValue(val: string): this;
  addSummary(summary: string): this;
  addDescription(description: string): this;
}

class _OpenApiExample extends ExampleBase implements OpenApiExample {}

export function Example() {
  return new _OpenApiExample();
}
