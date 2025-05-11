import { mapMap } from "../core/common/utils.ts";
import type { OpenApiMedia } from "../core/path/OpenApiMedia.ts";
import type { OpenApiParameter } from "../core/path/OpenApiParameter.ts";
import type { GConstructor } from "./constructor.ts";

export function withAllowReserved<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _allowReserved?: boolean;
    allowReserved(allowReserved: boolean) {
      const copy: this = Object.create(this);
      copy._allowReserved = allowReserved;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._allowReserved) {
        Object.defineProperty(json, "allowReserved", {
          value: this._allowReserved,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withDeprecated<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _deprecated?: boolean;
    deprecated(deprecated: boolean) {
      const copy: this = Object.create(this);
      copy._deprecated = deprecated;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._deprecated) {
        Object.defineProperty(json, "deprecated", {
          value: this._deprecated,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withRequired<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _required?: boolean;
    required(required: boolean) {
      const copy: this = Object.create(this);
      copy._required = required;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._required) {
        Object.defineProperty(json, "required", {
          value: this._required,
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
    nullable(nullable: boolean) {
      const copy: this = Object.create(this);
      copy._nullable = nullable;
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

export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _description?: string;
    description(description: string) {
      const copy: this = Object.create(this);
      copy._description = description;
      return copy;
    }
    toJSON(): unknown {
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

export function withSummary<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _summary?: string;
    summary(summary: string) {
      const copy: this = Object.create(this);
      copy._summary = summary;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._summary) {
        Object.defineProperty(json, "summary", {
          value: this._summary,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withContentMap<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _content?: Map<string, OpenApiMedia>;
    content(key: string) {
      return {
        media: (media: OpenApiMedia) => {
          const copy: this = Object.create(this);
          copy._content = new Map<string, OpenApiMedia>();
          copy._content.set(key, media);
          return copy;
        },
      };
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._content) {
        Object.defineProperty(json, "content", {
          value: mapMap(this._content, val => val.toJSON()),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withParameters<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _parameters?: OpenApiParameter[];
    parameters(parameters: OpenApiParameter) {
      const copy: this = Object.create(this);
      copy._parameters =
        this._parameters === undefined
          ? [parameters]
          : [...this._parameters, parameters];
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._parameters) {
        Object.defineProperty(json, "parameters", {
          value: this._parameters.map(val => val.toJSON()),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withValue<TBase extends GConstructor>(Base: TBase) {
  return <K extends string | unknown>() =>
    class extends Base {
      private _value?: K;
      value(value: K) {
        const copy: this = Object.create(this);
        copy._value = value;
        return copy;
      }
      toJSON(): unknown {
        const json = super.toJSON();
        if (this._value) {
          Object.defineProperty(json, "value", {
            value: this._value,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withFormat<TBase extends GConstructor>(Base: TBase) {
  return <K extends string>() =>
    class extends Base {
      private _format?: K;
      format(format: K) {
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

export function withMinimumLength<TBase extends GConstructor>(Base: TBase) {
  return () =>
    class extends Base {
      private _minLength?: number;
      minLength(minLength: number) {
        const copy: this = Object.create(this);
        copy._minLength = minLength;
        return copy;
      }
      toJSON(): unknown {
        const json = super.toJSON();
        if (this._minLength) {
          Object.defineProperty(json, "minLength", {
            value: this._minLength,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withMaximumLength<TBase extends GConstructor>(Base: TBase) {
  return () =>
    class extends Base {
      private _maxLength?: number;
      maxLength(maxLength: number) {
        const copy: this = Object.create(this);
        copy._maxLength = maxLength;
        return copy;
      }
      toJSON(): unknown {
        const json = super.toJSON();
        if (this._maxLength) {
          Object.defineProperty(json, "maxLength", {
            value: this._maxLength,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withMinimum<TBase extends GConstructor>(Base: TBase) {
  return () =>
    class extends Base {
      private _minimum?: number;
      minimum(minimum: number) {
        const copy: this = Object.create(this);
        copy._minimum = minimum;
        return copy;
      }
      toJSON(): unknown {
        const json = super.toJSON();
        if (this._minimum) {
          Object.defineProperty(json, "minimum", {
            value: this._minimum,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withMaximum<TBase extends GConstructor>(Base: TBase) {
  return () =>
    class extends Base {
      private _maximum?: number;
      maximum(maximum: number) {
        const copy: this = Object.create(this);
        copy._maximum = maximum;
        return copy;
      }
      toJSON(): unknown {
        const json = super.toJSON();
        if (this._maximum) {
          Object.defineProperty(json, "maximum", {
            value: this._maximum,
            enumerable: true,
          });
        }
        return json;
      }
    };
}
