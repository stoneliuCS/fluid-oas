import type { OpenApiSchema } from "../core/schema/OpenApiSchema.ts";
import type { GConstructor } from "./constructor.ts";

/**
 * @fieldType string
 * @serializedName description
 * @generic false
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
 * @generic false
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
 * @generic false
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
 * @generic false
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
 * @generic false
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
 * @generic false
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
 * @fieldType number
 * @serializedName maximum
 * @generic false
 */
export function withMaximum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _maximum?: number;
    maximum(val: number) {
      const copy: this = Object.create(this);
      copy._maximum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._maximum) {
        Object.defineProperty(json, "maximum", {
          value: this._maximum,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType number
 * @serializedName minimum
 * @generic false
 */
export function withMinimum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _minimum?: number;
    minimum(val: number) {
      const copy: this = Object.create(this);
      copy._minimum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._minimum) {
        Object.defineProperty(json, "minimum", {
          value: this._minimum,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType string|unknown
 * @serializedName value
 * @generic true
 */
export function withValue<TBase extends GConstructor>(Base: TBase) {
  return <T extends string | unknown>() => {
    return class extends Base {
      private _value: T;
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
 * @generic true
 */
export function withFormat<TBase extends GConstructor>(Base: TBase) {
  return <T extends string>() => {
    return class extends Base {
      private _format: T;
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
 * @fieldType T
 * @serializedName default
 * @generic true
 */
export function withDefault<TBase extends GConstructor>(Base: TBase) {
  return <T>() => {
    return class extends Base {
      private _default: T;
      default(val: T) {
        const copy: this = Object.create(this);
        copy._default = val;
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
      }
    };
  };
}

/**
 * @fieldType OpenApiSchema
 * @serializedName mapping
 * @generic false
 */
export function withMapping<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _mapping?: Map<string, OpenApiSchema>;
    mapping(name: string) {
      return {
        with: (val: OpenApiSchema) => {
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
        const mappings: any = {};
        this._mapping.forEach((val, key) => {
          mappings[key] = val.toJSON();
        });
        Object.defineProperty(json, "mapping", {
          value: mappings,
          enumerable: true,
        });
      }
    }
  };
}

/**
 * @fieldType OpenApiSchema
 * @serializedName parameters
 * @generic false
 */
export function withParameters<TBase extends GConstructor>(Base: TBase) {
  return <T extends OpenApiSchema>() => {
    return class extends Base {
      private _parameters: T[];
      parameters(val: T) {
        const copy: this = Object.create(this);
        copy._parameters =
          this._parameters === undefined ? [val] : [...this._parameters, val];
        return copy;
      }
    };
  };
}
