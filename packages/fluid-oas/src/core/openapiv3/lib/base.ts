import {
  withExtensions,
  withNullable,
  withExample,
  withExternalDocs,
  withDescription,
  withEnum,
  withConst,
  withDefault,
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
  /**
   * Extend the specification with an extension object schema.
   *
   * @param mappings - key value mappings with names MUST beginning with "x-"
   */
  addExtensions(mappings: {
    [K in OpenApiExtensionString]: OpenApiSchema;
  }): this;
}

export interface SchemaInterface<T> extends BaseInterface {
  /**
   * Adds a description to this OpenApiSchema
   *
   * @param description - Description
   */
  addDescription(description: string): this;
  /**
   * Adds an external documentation to this OpenApiSchema
   *
   * @param docs - Documentation to add to this schema.
   */
  addExternalDocs(docs: OpenApiDocumentation): this;
  addExample(example: OpenApiExample): this;
  addEnums(val: (T | null)[]): this;
  addConst(val: T): this;
  addDefault(val: T): this;
  /**
   * As of v3.1.0 this has been removed. Still available for v3.0.* OAS
   */
  addNullable(nullable: boolean): this;
}

// Base Class which all OpenApi Definitions will inherit.
const _Base = withExtensions(Root);
export class Base extends _Base implements BaseInterface {}

// Some Mixins are HOF generic functions allowing for maximum flexibility.
// Here I defined some mixin methods like withConst, withEnum, and withDefault
// and invoke their respective methods, however I do not type parameterize them.
// I let the interface handle this.
const _SchemaBase = withDefault(
  withConst(
    withEnum(
      withNullable(withExample(withExternalDocs(withDescription(Base))))
    )()
  )()
)();

export class SchemaBase<T> extends _SchemaBase implements SchemaInterface<T> {}
