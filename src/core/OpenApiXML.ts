import { _extend } from "../lib/common";
import type { OpenApiSchema } from "./schema/OpenApiSchema";

class _OpenApiXML {
  toJSON(): unknown {
    throw new Error("Method not implemented.");
  }
  name(name: string) {
    return new _OpenApiXML(
      name,
      this._namespace,
      this._prefix,
      this._attribute,
      this._wrapped,
      this._extensions,
    );
  }
  namespace(namespace: string) {
    return new _OpenApiXML(
      this._name,
      namespace,
      this._prefix,
      this._attribute,
      this._wrapped,
      this._extensions,
    );
  }
  prefix(prefix: string) {
    return new _OpenApiXML(
      this._name,
      this._namespace,
      prefix,
      this._attribute,
      this._wrapped,
      this._extensions,
    );
  }
  attribute(attribute: boolean) {
    return new _OpenApiXML(
      this._name,
      this._namespace,
      this._prefix,
      attribute,
      this._wrapped,
      this._extensions,
    );
  }
  wrapped(wrapped: boolean) {
    return new _OpenApiXML(
      this._name,
      this._namespace,
      this._prefix,
      this._attribute,
      wrapped,
      this._extensions,
    );
  }
  extend(name : string, schema: OpenApiSchema) {
    return _extend(name).withSchema(schema).returning<OpenApiXML>()
  }
  public static create() {
    return new _OpenApiXML();
  }
  private constructor(
    _name?: string,
    _namespace?: string,
    _prefix?: string,
    _attribute?: boolean,
    _wrapped?: boolean,
    _extensions?: Map<string, OpenApiSchema>,
  ) {
    this._name = _name;
    this._namespace = _namespace;
    this._prefix = _prefix;
    this._attribute = _attribute;
    this._wrapped = _wrapped;
    this._extensions = _extensions;
  }
  private readonly _name?: string;
  private readonly _namespace?: string;
  private readonly _prefix?: string;
  private readonly _attribute?: boolean;
  private readonly _wrapped?: boolean;
  private readonly _extensions?: Map<string, OpenApiSchema>;
}

export type OpenApiXML = _OpenApiXML;
export const OpenApiXML: OpenApiXML = _OpenApiXML.create();
