import { mapMap } from '../core/common/utils.ts';
import type { OpenApiMedia } from '../core/path/OpenApiMedia.ts';
import type { GConstructor } from './constructor.ts';

export function withAllowReserved<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _allowReserved?: boolean;
    allowReserved() {
      const copy: this = Object.create(this);
      copy._allowReserved = true;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._allowReserved) {
        Object.defineProperty(json, 'allowReserved', {
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
    deprecated() {
      const copy: this = Object.create(this);
      copy._deprecated = true;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._deprecated) {
        Object.defineProperty(json, 'deprecated', {
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
    required() {
      const copy: this = Object.create(this);
      copy._required = true;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._required) {
        Object.defineProperty(json, 'required', {
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
    nullable() {
      const copy: this = Object.create(this);
      copy._nullable = true;
      return copy;
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._nullable) {
        Object.defineProperty(json, 'nullable', {
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
        Object.defineProperty(json, 'description', {
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
        Object.defineProperty(json, 'summary', {
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
    content(name: string) {
      return {
        media: (media: OpenApiMedia) => {
          const copy: this = Object.create(this);
          copy._content = new Map<string, OpenApiMedia>();
          copy._content.set(name, media);
          return copy;
        },
      };
    }
    toJSON(): unknown {
      const json = super.toJSON();
      if (this._content) {
        Object.defineProperty(json, 'content', {
          value: mapMap(this._content, val => val.toJSON()),
          enumerable: true,
        });
      }
      return json;
    }
  };
}
