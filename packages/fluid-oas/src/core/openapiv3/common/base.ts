import {
  withDescription,
  withExample,
  withExtensions,
  withExternalDocs,
  withNullable,
} from "../../../common/common";
import type { OpenApiExtensionString } from "../../../common/types";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";
import type { OpenApiExample } from "./OpenApiExample";

export class Root {
  toJSON(): unknown {
    return {};
  }
}

export interface RootInterface {
  toJSON(): unknown;
}

export interface BaseInterface extends RootInterface {
  addExtension(name: OpenApiExtensionString, val: OpenApiSchema): this;
}

export interface SchemaInterface extends BaseInterface {
  addDescription(description: string): this;
  addExternalDocs(docs: OpenApiDocumentation): this;
  addExample(example: OpenApiExample): this;
  nullable(): this;
}

// Base Class which all OpenApi Definitions will inherit.
const _Base = withExtensions(Root);
export class Base extends _Base implements BaseInterface {}
export const _SchemaBase = withNullable(
  withExample(withExternalDocs(withDescription(Base)))
);
export class SchemaBase extends _SchemaBase implements SchemaInterface {}
