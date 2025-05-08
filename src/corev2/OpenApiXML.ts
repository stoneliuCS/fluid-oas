import { OpenApiSchema } from "../core/schema/OpenApiSchema";
import { OpenApiCommonBuilder } from "./OpenApiBuilder";

class _OpenApiXML {
  private constructor(
    private readonly _extensions: Map<string, OpenApiSchema>,
    private readonly _name?: string,
    private readonly _namespace?: string,
    private readonly _prefix?: string,
    private readonly _attribute?: boolean,
    private readonly _wrapped?: boolean,
  ) {
    this._name = _name;
    this._namespace = _namespace;
    this._prefix = _prefix;
    this._attribute = _attribute;
    this._wrapped = _wrapped;
    this._extensions = _extensions;
  }

  static create() {
    return new OpenApiXMLBuilder(
      (
        _extensions: Map<string, OpenApiSchema>,
        _name?: string,
        _namespace?: string,
        _prefix?: string,
        _attribute?: boolean,
        _wrapped?: boolean,
      ) => {
        return new _OpenApiXML(
          _extensions,
          _name,
          _namespace,
          _prefix,
          _attribute,
          _wrapped,
        );
      },
    );
  }

  toJSON(): unknown {
    const json = {};
    for (let [key, val] of this._extensions.entries()) {
      Object.defineProperty(json, key, { value: val.toJSON() });
    }
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
    return json;
  }
}

class OpenApiXMLBuilder extends OpenApiCommonBuilder<OpenApiXML> {
  private _name?: string;
  private _namespace?: string;
  private _prefix?: string;
  private _attribute?: boolean;
  private _wrapped?: boolean;
  constructor(
    private builder: (
      _extensions: Map<string, OpenApiSchema>,
      _name?: string,
      _namespace?: string,
      _prefix?: string,
      _attribute?: boolean,
      _wrapped?: boolean,
    ) => OpenApiXML,
  ) {
    super();
  }

  public namespace(namespace: string) {
    this._namespace = namespace;
    return this;
  }

  public prefix(prefix: string) {
    this._prefix = prefix;
    return this;
  }

  public attribute(attribute: boolean) {
    this._attribute = attribute;
    return this;
  }

  public wrapped(wrapped: boolean) {
    this._wrapped = wrapped;
    return this;
  }

  public build(): OpenApiXML {
    return this.builder(
      this._extensions,
      this._name,
      this._namespace,
      this._prefix,
      this._attribute,
      this._wrapped,
    );
  }
}

export const CreateOpenApiXML = _OpenApiXML.create
export type OpenApiXML = _OpenApiXML
