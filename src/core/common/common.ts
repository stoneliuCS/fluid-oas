import type { OpenApiSchema } from "../types/OpenApi";
import type { OpenApiDiscriminator } from "./OpenApiDiscriminator";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";
import type { OpenApiXML } from "./OpenApiXML";

type GConstructor<T = { toJSON(): unknown }> = new (...args: any[]) => T;

class _Base {
  toJSON(): unknown {
    return {};
  }
}

export const Base = withExtensions(_Base);

export function withExtensions<TBase extends GConstructor>(Base: TBase) {
  return class WithExtensions extends Base {
    private _extensions?: Map<string, OpenApiSchema>;
    extend(name: string) {
      if (!name.startsWith("x-")) {
        throw new Error();
      }
      return {
        with: (schema: OpenApiSchema): this => {
          const copy = Object.create(this);
          copy._extensions = new Map(this._extensions);
          copy._extensions.set(name, schema);
          return copy;
        },
      };
    }
    toJSON() {
      const json = super.toJSON();
      if (this._extensions) {
        for (let [key, val] of this._extensions.entries()) {
          Object.defineProperty(json, key, { value: val });
        }
      }
      return json;
    }
  };
}

export function withName<TBase extends GConstructor>(Base: TBase) {
  return class WithName extends Base {
    private _name?: string;
    name(name: string): this {
      const copy = Object.create(this);
      copy._name = name;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._name) {
        Object.defineProperty(json, "name", { value: this._name });
      }
      return json;
    }
  };
}

export function withURL<TBase extends GConstructor>(Base: TBase) {
  return class WithURL extends Base {
    private _url?: string;
    url(url: string): this {
      const copy = Object.create(this);
      copy._url = url;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._url) {
        Object.defineProperty(json, "url", {
          value: this._url,
        });
      }
      return json;
    }
  };
}

export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class WithDescription extends Base {
    private _description?: string;
    description(description: string): this {
      const copy = Object.create(this);
      copy._description = description;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._description) {
        Object.defineProperty(json, "description", {
          value: this._description,
        });
      }
      return json;
    }
  };
}

export function withPropertyName<TBase extends GConstructor>(Base: TBase) {
  return class WithPropertyName extends Base {
    private _propertyName?: string;
    propertyName(propertyName: string): this {
      const copy = Object.create(this);
      copy._propertyName = propertyName;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._propertyName) {
        Object.defineProperty(json, "propertyName", {
          value: this._propertyName,
        });
      }
      return json;
    }
  };
}

export function withMapping<TBase extends GConstructor>(Base: TBase) {
  return class WithMapping extends Base {
    private _mapping?: Map<string, OpenApiSchema>;

    mapping(name: string) {
      return {
        schema: (schema: OpenApiSchema): this => {
          const copy = Object.create(this);
          copy._mapping = new Map(this._mapping);
          copy._mapping.set(name, schema);
          return copy;
        },
      };
    }

    toJSON() {
      const json = super.toJSON();
      if (this._mapping) {
        Object.defineProperty(json, "mapping", { value: this._mapping });
      }
    }
  };
}

export function withNamespace<TBase extends GConstructor>(Base: TBase) {
  return class WithNamespace extends Base {
    private _namespace?: string;

    namespace(namespace: string): this {
      const copy = Object.create(this);
      copy._namespace = namespace;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._namespace) {
        Object.defineProperty(json, "namespace", { value: this._namespace });
      }
    }
  };
}

export function withPrefix<TBase extends GConstructor>(Base: TBase) {
  return class WithPrefix extends Base {
    private _prefix?: string;

    prefix(prefix: string): this {
      const copy = Object.create(this);
      copy._prefix = prefix;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._prefix) {
        Object.defineProperty(json, "prefix", { value: this._prefix });
      }
    }
  };
}

export function withWrapped<TBase extends GConstructor>(Base: TBase) {
  return class WithWrapped extends Base {
    private _wrapped?: boolean;

    wrapped(): this {
      const copy = Object.create(this);
      copy._wrapped = true;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._wrapped) {
        Object.defineProperty(json, "wrapped", { value: this._wrapped });
      }
    }
  };
}

export function withAttribute<TBase extends GConstructor>(Base: TBase) {
  return class WithAttribute extends Base {
    private _attribute?: boolean;

    wrapped(): this {
      const copy = Object.create(this);
      copy._attribute = true;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._attribute) {
        Object.defineProperty(json, "attribute", { value: this._attribute });
      }
    }
  };
}

export function withXML<TBase extends GConstructor>(Base: TBase) {
  return class WithXML extends Base {
    private _xml?: OpenApiXML;

    xml(xml: OpenApiXML): this {
      const copy: this = Object.create(this);
      copy._xml = xml;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._xml) {
        Object.defineProperty(json, "xml", { value: this._xml });
      }
    }
  };
}

export function withDiscriminator<TBase extends GConstructor>(Base: TBase) {
  return class WithDiscriminator extends Base {
    private _discriminator?: OpenApiDiscriminator;

    discriminator(discriminator: OpenApiDiscriminator) {
      const copy: this = Object.create(this);
      copy._discriminator = discriminator;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._discriminator) {
        Object.defineProperty(json, "discriminator", {
          value: this._discriminator,
        });
      }
      return json;
    }
  };
}

export function withExternalDocs<TBase extends GConstructor>(Base: TBase) {
  return class WithExternalDocs extends Base {
    private _docs?: OpenApiDocumentation;

    externalDocs(docs: OpenApiDocumentation) {
      const copy: this = Object.create(this);
      copy._docs = docs;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._docs) {
        Object.defineProperty(json, "externalDocs", {
          value: this._docs,
        });
      }
      return json;
    }
  };
}
