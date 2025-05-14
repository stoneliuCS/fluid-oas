import type { OpenApiDocumentation } from "../core/common/OpenApiDocumentation.ts";
import type { OpenApiOAuthFlow } from "../core/common/OpenApiOAuthFlow.ts";
import type { OpenApiOAuthFlows } from "../core/common/OpenApiOAuthFlows.ts";
import type { OpenApiSchema } from "../core/schema/OpenApiSchema.ts";
import type { GConstructor, OpenApiExtensionString } from "./constructor.ts";

/**
 * @fieldType string
 * @serializedName description
 */
export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _description?: string;
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
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName summary
 */
export function withSummary<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _summary?: string;
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
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName allowReserved
 */
export function withAllowReserved<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _allowReserved?: boolean;
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
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName deprecated
 */
export function withDeprecated<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _deprecated?: boolean;
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
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName required
 */
export function withRequired<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _required?: boolean;
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
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName nullable
 */
export function withNullable<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _nullable?: boolean;
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
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName name
 */
export function withName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _name?: string;
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
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName namespace
 */
export function withNamespace<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _namespace?: string;
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
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName prefix
 */
export function withPrefix<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _prefix?: string;
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
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName wrapped
 */
export function withWrapped<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _wrapped?: boolean;
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
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName attribute
 */
export function withAttribute<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _attribute?: boolean;
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
      return json;
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
      protected _value?: T;
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
        return json;
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
      protected _format?: T;
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
        return json;
      }
    };
  };
}

/**
 * @fieldType "apiKey"|"http"|"mutualTLS"|"oauth2"|"openIdConnect"
 * @serializedName type
 */
export function withType<TBase extends GConstructor>(Base: TBase) {
  return <
    T extends "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect",
  >() => {
    return class extends Base {
      protected _type?: T;
      type(val: T) {
        const copy: this = Object.create(this);
        copy._type = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._type) {
          Object.defineProperty(json, "type", {
            value: this._type,
            enumerable: true,
          });
        }
        return json;
      }
    };
  };
}

/**
 * @fieldType "query"|"header"|"cookie"
 * @serializedName in
 */
export function withIn<TBase extends GConstructor>(Base: TBase) {
  return <T extends "query" | "header" | "cookie">() => {
    return class extends Base {
      protected _in?: T;
      in(val: T) {
        const copy: this = Object.create(this);
        copy._in = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._in) {
          Object.defineProperty(json, "in", {
            value: this._in,
            enumerable: true,
          });
        }
        return json;
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
    protected _mapping?: Map<string, string>;
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
        const mappings: any = {};
        this._mapping.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "mapping", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<OpenApiExtensionString,OpenApiSchema>
 * @serializedName extensions
 */
export function withExtensions<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _extensions?: Map<OpenApiExtensionString, OpenApiSchema>;
    extensions(name: OpenApiExtensionString) {
      return {
        with: (val: OpenApiSchema) => {
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
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName minLength
 */
export function withMax<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _minLength?: number;
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
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName maxLength
 */
export function withMin<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _maxLength?: number;
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
      return json;
    }
  };
}

/**
 * @fieldType RegExp
 * @serializedName pattern
 */
export function withPattern<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _pattern?: RegExp;
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
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName minLength
 */
export function withMinLength<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _minLength?: number;
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
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName maxLength
 */
export function withMaxLength<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _maxLength?: number;
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
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName url
 */
export function withURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _url?: string;
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
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName propertyName
 */
export function withPropertyName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _propertyName?: string;
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
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName scheme
 */
export function withScheme<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _scheme?: string;
    scheme(val: string) {
      const copy: this = Object.create(this);
      copy._scheme = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._scheme) {
        Object.defineProperty(json, "scheme", {
          value: this._scheme,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName bearerFormat
 */
export function withBearerFormat<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _bearerFormat?: string;
    bearerFormat(val: string) {
      const copy: this = Object.create(this);
      copy._bearerFormat = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._bearerFormat) {
        Object.defineProperty(json, "bearerFormat", {
          value: this._bearerFormat,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName authorizationUrl
 */
export function withAuthorizationURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _authorizationUrl?: string;
    authorizationUrl(val: string) {
      const copy: this = Object.create(this);
      copy._authorizationUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._authorizationUrl) {
        Object.defineProperty(json, "authorizationUrl", {
          value: this._authorizationUrl,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName tokenUrl
 */
export function withTokenURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _tokenUrl?: string;
    tokenUrl(val: string) {
      const copy: this = Object.create(this);
      copy._tokenUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._tokenUrl) {
        Object.defineProperty(json, "tokenUrl", {
          value: this._tokenUrl,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName refreshUrl
 */
export function withRefreshURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _refreshUrl?: string;
    refreshUrl(val: string) {
      const copy: this = Object.create(this);
      copy._refreshUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._refreshUrl) {
        Object.defineProperty(json, "refreshUrl", {
          value: this._refreshUrl,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,string>
 * @serializedName scopes
 */
export function withScopes<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _scopes?: Map<string, string>;
    scopes(name: string) {
      return {
        with: (val: string) => {
          const copy: this = Object.create(this);
          copy._scopes = new Map(this._scopes);
          copy._scopes.set(name, val);
          return copy;
        },
      };
    }
    toJSON() {
      const json = super.toJSON();
      if (this._scopes) {
        const mappings: any = {};
        this._scopes.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "scopes", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiDocumentation
 * @serializedName externalDocs
 */
export function withExternalDocs<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _externalDocs?: OpenApiDocumentation;
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
      return json;
    }
  };
}

/**
 * @fieldType OpenApiOAuthFlow
 * @serializedName implicit
 */
export function withImplicit<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _implicit?: OpenApiOAuthFlow;
    implicit(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._implicit = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._implicit) {
        Object.defineProperty(json, "implicit", {
          value: this._implicit.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiOAuthFlow
 * @serializedName password
 */
export function withPassword<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _password?: OpenApiOAuthFlow;
    password(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._password = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._password) {
        Object.defineProperty(json, "password", {
          value: this._password.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiOAuthFlow
 * @serializedName clientCredentials
 */
export function withClientCredentials<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _clientCredentials?: OpenApiOAuthFlow;
    clientCredentials(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._clientCredentials = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._clientCredentials) {
        Object.defineProperty(json, "clientCredentials", {
          value: this._clientCredentials.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiOAuthFlow
 * @serializedName authorizationCode
 */
export function withAuthorizationCode<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _authorizationCode?: OpenApiOAuthFlow;
    authorizationCode(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._authorizationCode = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._authorizationCode) {
        Object.defineProperty(json, "authorizationCode", {
          value: this._authorizationCode.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiOAuthFlows
 * @serializedName flows
 */
export function withFlows<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _flows?: OpenApiOAuthFlows;
    flows(val: OpenApiOAuthFlows) {
      const copy: this = Object.create(this);
      copy._flows = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._flows) {
        Object.defineProperty(json, "flows", {
          value: this._flows.toJSON(),
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName openIdConnectUrl
 */
export function withOpenIdConnectURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    protected _openIdConnectUrl?: string;
    openIdConnectUrl(val: string) {
      const copy: this = Object.create(this);
      copy._openIdConnectUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._openIdConnectUrl) {
        Object.defineProperty(json, "openIdConnectUrl", {
          value: this._openIdConnectUrl,
          enumerable: true,
        });
      }
      return json;
    }
  };
}
