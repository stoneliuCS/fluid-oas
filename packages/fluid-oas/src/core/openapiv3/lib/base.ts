import {
  withExtensions,
  withNullable,
  withExample,
  withExternalDocs,
  withDescription,
} from "../common";
import type { OpenApiSchema } from "../schema";
import type { OpenApiExtensionString } from "../types";
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
  addExtensions(mappings: {
    [K in OpenApiExtensionString]: OpenApiSchema;
  }): this;
}

export interface SchemaInterface extends BaseInterface {
  addDescription(description: string): this;
  addExternalDocs(docs: OpenApiDocumentation): this;
  addExample(example: OpenApiExample): this;
  /**
   * As of v3.1.0 this has been removed. Still available for v3.0.* OAS
   */
  nullable(): this;
}

// Base Class which all OpenApi Definitions will inherit.
const _Base = withExtensions(Root);
export class Base extends _Base implements BaseInterface {}
export const _SchemaBase = withNullable(
  withExample(withExternalDocs(withDescription(Base)))
);
export class SchemaBase extends _SchemaBase implements SchemaInterface {}
