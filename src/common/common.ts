import type { OpenApiDocumentation } from "../core/common/OpenApiDocumentation.ts";
import type { OpenApiSchema } from "../core/schema/OpenApiSchema.ts";
import type { GConstructor } from "./constructor.ts";

/**
 * @fieldType string
 * @serializedName description
 */
export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _description?: string;
    description(val: string) {
      const copy: this = Object.create(this);
      copy._description = val;
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
    }
  };
}

/**
 * @fieldType string
 * @serializedName summary
 */
export function withSummary<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _summary?: string;
    summary(val: string) {
      const copy: this = Object.create(this);
      copy._summary = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._summary) {
        Object.defineProperty(json, "summary", {
          value: this._summary,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName allowReserved
 */
export function withAllowReserved<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _allowReserved?: boolean;
    allowReserved() {
      const copy: this = Object.create(this);
      copy._allowReserved = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._allowReserved) {
        Object.defineProperty(json, "allowReserved", {
          value: this._allowReserved,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName deprecated
 */
export function withDeprecated<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _deprecated?: boolean;
    deprecated() {
      const copy: this = Object.create(this);
      copy._deprecated = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._deprecated) {
        Object.defineProperty(json, "deprecated", {
          value: this._deprecated,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName required
 */
export function withRequired<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _required?: boolean;
    required() {
      const copy: this = Object.create(this);
      copy._required = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._required) {
        Object.defineProperty(json, "required", {
          value: this._required,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName nullable
 */
export function withNullable<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _nullable?: boolean;
    nullable() {
      const copy: this = Object.create(this);
      copy._nullable = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._nullable) {
        Object.defineProperty(json, "nullable", {
          value: this._nullable,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType string
 * @serializedName name
 */
export function withName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _name?: string;
    name(val: string) {
      const copy: this = Object.create(this);
      copy._name = val;
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
    }
  };
}

/**
 * @fieldType string
 * @serializedName namespace
 */
export function withNamespace<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _namespace?: string;
    namespace(val: string) {
      const copy: this = Object.create(this);
      copy._namespace = val;
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
    }
  };
}

/**
 * @fieldType string
 * @serializedName prefix
 */
export function withPrefix<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _prefix?: string;
    prefix(val: string) {
      const copy: this = Object.create(this);
      copy._prefix = val;
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
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName wrapped
 */
export function withWrapped<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _wrapped?: boolean;
    wrapped() {
      const copy: this = Object.create(this);
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
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName attribute
 */
export function withAttribute<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _attribute?: boolean;
    attribute() {
      const copy: this = Object.create(this);
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
    }
  };
}

/**
 * @fieldType string|unknown
 * @serializedName value
 */
export function withValue<TBase extends GConstructor>(Base: TBase) {
  return <T extends string | unknown>() => {
    return class extends Base {
      private _value?: T;
      value(val: T) {
        const copy: this = Object.create(this);
        copy._value = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._value) {
          Object.defineProperty(json, "value", {
            value: this._value,
            enumerable: true,
          });
        }
      }
    };
  };
}

/**
 * @fieldType string
 * @serializedName format
 */
export function withFormat<TBase extends GConstructor>(Base: TBase) {
  return <T extends string>() => {
    return class extends Base {
      private _format?: T;
      format(val: T) {
        const copy: this = Object.create(this);
        copy._format = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._format) {
          Object.defineProperty(json, "format", {
            value: this._format,
            enumerable: true,
          });
        }
      }
    };
  };
}

/**
 * @fieldType Map<string,string>
 * @serializedName mapping
 */
export function withMapping<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _mapping?: Map<string, string>;
    mapping(name: string) {
      return {
        with: (val: string) => {
          const copy: this = Object.create(this);
          copy._mapping = new Map(this._mapping);
          copy._mapping.set(name, val);
          return copy;
        },
      };
    }
    toJSON() {
      const json = super.toJSON();
      if (this._mapping) {
        Object.defineProperty(json, "mapping", {
          value: this._mapping,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType Map<string,OpenApiSchema>
 * @serializedName extensions
 */
export function withExtensions<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _extensions?: Map<string, OpenApiSchema>;
    extensions(name: string) {
      if (!name.startsWith("x-")) {
        throw new Error("Extension names must start with x-");
      }
      return {
        with: (val: Map<string, OpenApiSchema>) => {
          const copy: this = Object.create(this);
          copy._extensions = new Map(this._extensions);
          copy._extensions.set(name, val);
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
    }
  };
}

/**
 * @fieldType number
 * @serializedName minLength
 */
export function withMax<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _minLength?: number;
    minLength(val: number) {
      const copy: this = Object.create(this);
      copy._minLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._minLength) {
        Object.defineProperty(json, "minLength", {
          value: this._minLength,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType number
 * @serializedName maxLength
 */
export function withMin<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _maxLength?: number;
    maxLength(val: number) {
      const copy: this = Object.create(this);
      copy._maxLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._maxLength) {
        Object.defineProperty(json, "maxLength", {
          value: this._maxLength,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType RegExp
 * @serializedName pattern
 */
export function withPattern<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _pattern?: RegExp;
    pattern(val: RegExp) {
      const copy: this = Object.create(this);
      copy._pattern = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._pattern) {
        Object.defineProperty(json, "pattern", {
          value: this._pattern.source,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType number
 * @serializedName minLength
 */
export function withMinLength<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _minLength?: number;
    minLength(val: number) {
      const copy: this = Object.create(this);
      copy._minLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._minLength) {
        Object.defineProperty(json, "minLength", {
          value: this._minLength,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType number
 * @serializedName maxLength
 */
export function withMaxLength<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _maxLength?: number;
    maxLength(val: number) {
      const copy: this = Object.create(this);
      copy._maxLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._maxLength) {
        Object.defineProperty(json, "maxLength", {
          value: this._maxLength,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType string
 * @serializedName url
 */
export function withURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _url?: string;
    url(val: string) {
      const copy: this = Object.create(this);
      copy._url = val;
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
    }
  };
}

/**
 * @fieldType string
 * @serializedName propertyName
 */
export function withPropertyName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _propertyName?: string;
    propertyName(val: string) {
      const copy: this = Object.create(this);
      copy._propertyName = val;
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
    }
  };
}

/**
 * @fieldType OpenApiDocumentation
 * @serializedName externalDocs
 */
export function withExternalDocs<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _externalDocs?: OpenApiDocumentation;
    externalDocs(val: OpenApiDocumentation) {
      const copy: this = Object.create(this);
      copy._externalDocs = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._externalDocs) {
        Object.defineProperty(json, "externalDocs", {
          value: this._externalDocs.toJSON(),
          enumerable: true,
        });
      }
    }
  };
}
