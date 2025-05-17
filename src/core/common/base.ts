import {
  withDescription,
  withExample,
  withExtensions,
  withExternalDocs,
  withNullable,
} from "../../common/common.ts";

class _base {
  toJSON(): unknown {
    return {};
  }
}

// Base Class which all OpenApi Definitions will inherit.
export const Base = withExtensions(_base);
export const SchemaBase = withNullable(
  withExample(withExternalDocs(withDescription(Base)))
);
