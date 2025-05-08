import type { OpenApiSchema, OpenApiSpecificationProperty } from "../types/OpenApi";
import { Map } from "immutable";

class _OpenApiXML implements OpenApiSpecificationProperty<_OpenApiXML> {
  static create() {
    return new _OpenApiXML();
  }
  private constructor(
    private readonly _name?: string,
    private readonly _namespace?: string,
    private readonly _prefix?: string,
    private readonly _attribute?: boolean,
    private readonly _wrapped?: boolean,
    private readonly _extensions?: Map<string, OpenApiSchema>,
  ) {}

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

  toJSON(): unknown {
    const json = {};
    if (this._name) {
      Object.defineProperty(json, "name", { value: this._name });
    }
    if (this._namespace) {
      Object.defineProperty(json, "namespace", { value: this._namespace });
    }
    if (this._prefix) {
      Object.defineProperty(json, "prefix", { value: this._prefix });
    }
    if (this._attribute) {
      Object.defineProperty(json, "attribute", { value: this._attribute });
    }
    if (this._wrapped) {
      Object.defineProperty(json, "wrapped", { value: this._wrapped });
    }
    if (this._extensions) {
      this._extensions.forEach((val, key) => {
        Object.defineProperty(json, key, { value: val.toJSON() });
      });
    }
    return json;
  }

  extend(name: string, schema: OpenApiSchema): _OpenApiXML {
    return new _OpenApiXML(
      this._name,
      this._namespace,
      this._prefix,
      this._attribute,
      this._wrapped,
      this._extensions
        ? this._extensions.set(name, schema)
        : Map<string, OpenApiSchema>().set(name, schema),
    );
  }
}

export const CreateOpenApiXML = _OpenApiXML.create;
export type OpenApiXML = _OpenApiXML;
