// Generated Code. Do not Modify.

type GConstructor<T = { toJSON(): unknown }> = new (...args: any[]) => T;

export function withAllowReserved<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _allowReserved?: boolean;
    allowReserved() : this {
      const copy: this = Object.create(this);
      copy._allowReserved = true;
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
    deprecated() : this {
      const copy: this = Object.create(this);
      copy._deprecated = true;
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
    required() : this {
      const copy: this = Object.create(this);
      copy._required = true;
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
    nullable() : this {
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

export function withWrapped<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _wrapped?: boolean;
    wrapped() : this {
      const copy: this = Object.create(this);
      copy._wrapped = true;
      return copy;
    }

    toJSON(): unknown {
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
    attribute() : this {
      const copy: this = Object.create(this);
      copy._attribute = true;
      return copy;
    }

    toJSON(): unknown {
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

export function withExplode<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _explode?: boolean;
    explode() : this {
      const copy: this = Object.create(this);
      copy._explode = true;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._explode) {
        Object.defineProperty(json, "explode", {
          value: this._explode,
          enumerable: true,
        });
      }
      return json;
    }
  };
}