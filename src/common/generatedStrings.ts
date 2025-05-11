// Generated Code. Do not Modify.

type GConstructor<T = { toJSON(): unknown }> = new (...args: any[]) => T;

export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _description?: string;

    description(description: string) : this {
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

    summary(summary: string) : this {
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

export function withName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _name?: string;

    name(name: string) : this {
      const copy: this = Object.create(this);
      copy._name = name;
      return copy;
    }

    toJSON(): unknown {
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

    url(url: string) : this {
      const copy: this = Object.create(this);
      copy._url = url;
      return copy;
    }

    toJSON(): unknown {
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

export function withNamespace<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _namespace?: string;

    namespace(namespace: string) : this {
      const copy: this = Object.create(this);
      copy._namespace = namespace;
      return copy;
    }

    toJSON(): unknown {
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

export function withOperationId<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _operationId?: string;

    operationId(operationId: string) : this {
      const copy: this = Object.create(this);
      copy._operationId = operationId;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._operationId) {
        Object.defineProperty(json, "operationId", {
          value: this._operationId,
          enumerable: true,
        });
      }
      return json;
    }
  };
}