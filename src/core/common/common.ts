import type { OpenApiEncoding } from "../path/OpenApiEncoding";
import type { OpenApiHeader } from "../path/OpenApiHeader";
import type { OpenApiMedia } from "../path/OpenApiMedia";
import type { OpenApiParameter } from "../path/OpenApiParameter";
import type { OpenApiSchema } from "../schema/OpenApiSchema";
import type { OpenApiDiscriminator } from "./OpenApiDiscriminator";
import type { OpenApiDocumentation } from "./OpenApiDocumentation";
import type { OpenApiExample } from "./OpenApiExample";
import type { OpenApiLink } from "./OpenApiLink";
import type { OpenApiXML } from "./OpenApiXML";
import { mapMap } from "./utils";

type GConstructor<T = { toJSON(): unknown }> = new (...args: any[]) => T;

class _Base {
  toJSON(): unknown {
    return {};
  }
}

export const Base = withExtensions(_Base);
export const SchemaBase = withExample(
  withDescription(withExternalDocs(withDiscriminator(withXML(Base)))),
);
export enum Fixed {
  SCHEMA,
  CONTENT,
}

export function withValue<TBase extends GConstructor>(Base: TBase) {
  return <K extends string | unknown>() => {
    return class extends Base {
      private _value?: K;

      value(value: K) {
        const copy: this = Object.create(this);
        copy._value = value;
        return copy;
      }

      toJSON(): unknown {
        const json = this.toJSON();
        if (this._value) {
          Object.defineProperty(json, "value", {
            value: this._value,
            enumerable: true,
          });
        }
        return json;
      }
    };
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

    required() {
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

export function withEnum<TBase extends GConstructor>(Base: TBase) {
  return <K>() =>
    class extends Base {
      private _enum?: K[];

      enum(_enum: K) {
        const copy: this = Object.create(this);
        copy._enum =
          this._enum === undefined ? [_enum] : [...this._enum, _enum];
        return copy;
      }

      toJSON(): unknown {
        const json = super.toJSON();
        if (this._enum) {
          Object.defineProperty(json, "enum", {
            value: this._enum,
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

export function withEncodings<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _encodings?: Map<string, OpenApiEncoding>;

    encoding(name: string) {
      return {
        encode: (encoding: OpenApiEncoding) => {
          const copy: this = Object.create(this);
          copy._encodings = new Map(this._encodings);
          copy._encodings.set(name, encoding);
          return copy;
        },
      };
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._encodings) {
        Object.defineProperty(json, "encoding", {
          enumerable: true,
          value: mapMap(this._encodings, (val) => val.toJSON()),
        });
      }
      return json;
    }
  };
}

export function withLinksMap<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _linksMap?: Map<string, OpenApiLink>;

    links(name: string) {
      return {
        link: (link: OpenApiLink) => {
          const copy: this = Object.create(this);
          copy._linksMap = new Map(this._linksMap);
          copy._linksMap.set(name, link);
          return copy;
        },
      };
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._linksMap) {
        Object.defineProperty(json, "links", {
          value: mapMap(this._linksMap, (val) => val.toJSON()),
        });
      }
      return json;
    }
  };
}
export function withHeadersMap<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _headersMap?: Map<string, OpenApiHeader>;

    headers(name: string) {
      return {
        header: (header: OpenApiHeader) => {
          const copy: this = Object.create(this);
          copy._headersMap = new Map(this._headersMap);
          copy._headersMap.set(name, header);
          return copy;
        },
      };
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._headersMap) {
        Object.defineProperty(json, "headers", {
          value: mapMap(this._headersMap, (val) => val.toJSON()),
        });
      }
      return json;
    }
  };
}

export function withContentType<TBase extends GConstructor>(Base: TBase) {
  return <K extends string>() =>
    class extends Base {
      private _contentType?: K;

      contentType(contentType: K) {
        const copy: this = Object.create(this);
        copy._contentType = contentType;
        return copy;
      }

      toJSON(): unknown {
        const json = super.toJSON();
        if (this._contentType) {
          Object.defineProperty(json, "contentType", {
            value: this._contentType,
            enumerable: true,
          });
        }
        return json;
      }
    };
}

export function withExamplesMap<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _examples?: Map<string, OpenApiExample>;

    examples(name: string) {
      return {
        example: (example: OpenApiExample) => {
          const copy: this = Object.create(this);
          copy._examples = new Map(this._examples);
          copy._examples.set(name, example);
          return copy;
        },
      };
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._examples) {
        Object.defineProperty(json, "examples", {
          value: mapMap(this._examples, (val) => val.toJSON()),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withExample<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _example?: unknown;

    example(example: unknown): this {
      const copy: this = Object.create(this);
      copy._example = example;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._example) {
        Object.defineProperty(json, "example", {
          value: this._example,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withOperationId<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _opId?: string;

    opId(opId: string): this {
      const copy: this = Object.create(this);
      copy._opId = opId;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._opId) {
        Object.defineProperty(json, "operationId", {
          value: this._opId,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

export function withOperation<TBase extends GConstructor>(Base: TBase) {
  return <
    K extends
      | "GET"
      | "PUT"
      | "POST"
      | "DELETE"
      | "OPTIONS"
      | "HEAD"
      | "PATCH"
      | "TRACE",
  >() => {
    return class extends Base {};
  };
}

export function withTags<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _tags?: string[];

    tag(tag: string) {
      const copy: this = Object.create(this);
      copy._tags = this._tags === undefined ? [tag] : [...this._tags, tag];
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._tags) {
        Object.defineProperty(json, "tags", {
          value: this._tags,
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

    parameter(parameter: OpenApiParameter) {
      const copy: this = Object.create(this);
      copy._parameters =
        this._parameters === undefined
          ? [parameter]
          : [...this._parameters, parameter];
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._parameters) {
        Object.defineProperty(json, "parameters", {
          value: this._parameters.map((param) => param.toJSON()),
        });
      }
      return json;
    }
  };
}

export function withStyle<TBase extends GConstructor>(Base: TBase) {
  return <K>() =>
    class extends Base {
      private _style?: K;
      style(style: K) {
        const copy: this = Object.create(this);
        copy._style = style;
        return copy;
      }

      toJSON(): unknown {
        const json = super.toJSON();
        if (this._style) {
          Object.defineProperty(json, "style", {
            value: this._style,
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

    explode() {
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

export function withSchema<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    private _schema?: OpenApiSchema;

    schema(schema: OpenApiSchema) {
      const copy: this = Object.create(this);
      copy._schema = schema;
      return copy;
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._schema) {
        Object.defineProperty(json, "schema", {
          value: this._schema.toJSON(),
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
          copy._content = new Map(this._content);
          copy._content.set(name, media);
          return copy;
        },
      };
    }

    toJSON(): unknown {
      const json = super.toJSON();
      if (this._content) {
        Object.defineProperty(json, "content", {
          enumerable: true,
          value: mapMap(this._content, (val) => val.toJSON()),
        });
      }
      return json;
    }
  };
}
