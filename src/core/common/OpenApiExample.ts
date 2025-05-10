import { Base, withDescription, withSummary, withValue } from "./common";

const ExampleBase = withValue(withDescription(withSummary(Base)))<unknown>();
class _OpenApiExample extends ExampleBase {}

export const OpenApiExample = new _OpenApiExample();
export type OpenApiExample = _OpenApiExample;
