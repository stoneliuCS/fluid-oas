import {
  withDescription,
  withExample,
  withExtensions,
  withExternalDocs,
  withNullable,
} from "../../common/common";
import type { OpenApiExtensionString } from "../../common/types";
import type { OpenApiSchema } from "../schema/OpenApiSchema";

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

// Base Class which all OpenApi Definitions will inherit.
const _Base = withExtensions(Root);
export class Base extends _Base implements BaseInterface {}
export const SchemaBase = withNullable(
  withExample(withExternalDocs(withDescription(Base)))
);
