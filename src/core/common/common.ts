import type { OpenApiSchema } from "../schema/OpenApiSchema";
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
export const SchemaBase = withDescription(
  withExternalDocs(withDiscriminator(withXML(Base))),
);

export function withFormat<TBase extends GConstructor>(Base: TBase) {
  return <K extends string>() =>
    class extends Base {
      private _format?: K;

      format(format: K): this {
        const copy: this = Object.create(this);
        copy._format = format;
        return copy;
      }

      toJSON(): unknown {
        const json = super.toJSON();
        if (this._format) {
          Object.defineProperty(json, "format", {
            value: this._format,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withNullable<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _nullable?: boolean;
    nullable() {
      const copy: this = Object.create(this);
      copy._nullable = true;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._nullable) {
        Object.defineProperty(json, "nullable", {
          value: this._nullable,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withMaximum<TBase extends GConstructor>(Base: TBase) {
  return (name: string) =>
    class extends Base {
      private _max?: number;
      max(max: number) {
        const copy: this = Object.create(this);
        copy._max = max;
        return copy;
      }

      toJSON(): unknown {
        const json = super.toJSON();
        if (this._max) {
          Object.defineProperty(json, name, {
            value: this._max,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withMinimum<TBase extends GConstructor>(Base: TBase) {
  return (name: string) =>
    class extends Base {
      private _min?: number;
      min(min: number) {
        const copy: this = Object.create(this);
        copy._min = min;
        return copy;
      }

      toJSON(): unknown {
        const json = super.toJSON();
        if (this._min) {
          Object.defineProperty(json, name, {
            value: this._min,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withDefault<TBase extends GConstructor>(Base: TBase) {
  return <K>() =>
    class extends Base {
      private _default?: K;
      default(def: K): this {
        const copy: this = Object.create(this);
        copy._default = def;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._default) {
          Object.defineProperty(json, "default", {
            value: this._default,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withExtensions<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
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
          Object.defineProperty(json, key, {
            value: val.toJSON(),
            enumerable: true,
          });
        }
      }
      return json;
    }
  };
}

export function withName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _name?: string;
    name(name: string): this {
      const copy = Object.create(this);
      copy._name = name;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._name) {
        Object.defineProperty(json, "name", {
          value: this._name,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
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
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
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
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withPropertyName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
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
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withMapping<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
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
        const map: any = {};
        this._mapping.forEach((val, key) => {
          map[key] = val.toJSON();
        });
        Object.defineProperty(json, "mapping", {
          value: map,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withNamespace<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _namespace?: string;

    namespace(namespace: string): this {
      const copy = Object.create(this);
      copy._namespace = namespace;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._namespace) {
        Object.defineProperty(json, "namespace", {
          value: this._namespace,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withPrefix<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _prefix?: string;

    prefix(prefix: string): this {
      const copy = Object.create(this);
      copy._prefix = prefix;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._prefix) {
        Object.defineProperty(json, "prefix", {
          value: this._prefix,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withWrapped<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _wrapped?: boolean;

    wrapped(): this {
      const copy = Object.create(this);
      copy._wrapped = true;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._wrapped) {
        Object.defineProperty(json, "wrapped", {
          value: this._wrapped,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withAttribute<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _attribute?: boolean;

    wrapped(): this {
      const copy = Object.create(this);
      copy._attribute = true;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._attribute) {
        Object.defineProperty(json, "attribute", {
          value: this._attribute,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withXML<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _xml?: OpenApiXML;

    xml(xml: OpenApiXML): this {
      const copy: this = Object.create(this);
      copy._xml = xml;
      return copy;
    }

    toJSON() {
      const json = super.toJSON();
      if (this._xml) {
        Object.defineProperty(json, "xml", {
          value: this._xml.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withDiscriminator<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _discriminator?: OpenApiDiscriminator;

    discriminator(discriminator: OpenApiDiscriminator): this {
      const copy: this = Object.create(this);
      copy._discriminator = discriminator;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._discriminator) {
        Object.defineProperty(json, "discriminator", {
          value: this._discriminator.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withExternalDocs<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _docs?: OpenApiDocumentation;

    externalDocs(docs: OpenApiDocumentation): this {
      const copy: this = Object.create(this);
      copy._docs = docs;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._docs) {
        Object.defineProperty(json, "externalDocs", {
          value: this._docs.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}
