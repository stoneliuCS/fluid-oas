import type { GConstructor } from "./constructor.ts";

/**
 * Extends the functionality of a class with a Description Builder.
 * @fieldType string
 * @serializedName description
 * @generic false
 */
export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _description?: string;
    description(description: string) {
      const copy: this = Object.create(this);
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
    }
  };
}

/**
 * Extends the functionality of a class with a Summary Builder.
 * @fieldType string
 * @serializedName summary
 * @generic false
 */
export function withSummary<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _summary?: string;
    summary(summary: string) {
      const copy: this = Object.create(this);
      copy._summary = summary;
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
 * Extends the functionality of a class with a AllowReserved Builder.
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
 * Extends the functionality of a class with a Value Builder.
 * @fieldType string|unknown
 * @serializedName value
 * @generic true
 */
export function withValue<TBase extends GConstructor>(Base: TBase) {
  <T extends string | unknown>() => {
    return class extends Base {
      private _value: T;
      value(value: T) {
        const copy: this = Object.create(this);
        copy._value = value;
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
