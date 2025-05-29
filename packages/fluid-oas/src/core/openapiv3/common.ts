import type { OpenApiCallback } from "./lib/OpenApiCallback.js";
import type { OpenApiContact } from "./lib/OpenApiContact.js";
import type { OpenApiDocumentation } from "./lib/OpenApiDocumentation.js";
import type { OpenApiEncoding } from "./lib/OpenApiEncoding.js";
import type { OpenApiExample } from "./lib/OpenApiExample.js";
import type { OpenApiHeader } from "./lib/OpenApiHeader.js";
import type { OpenApiInfo } from "./lib/OpenApiInfo.js";
import type { OpenApiLicense } from "./lib/OpenApiLicense.js";
import type { OpenApiLink } from "./lib/OpenApiLink.js";
import type { OpenApiMediaType } from "./lib/OpenApiMedia.js";
import type { OpenApiOAuthFlow } from "./lib/OpenApiOAuthFlow.js";
import type { OpenApiOAuthFlows } from "./lib/OpenApiOAuthFlows.js";
import type { OpenApiOperation } from "./lib/OpenApiOperation.js";
import type { OpenApiParameter } from "./lib/OpenApiParameter.js";
import type { OpenApiPath } from "./lib/OpenApiPath.js";
import type { OpenApiPathItem } from "./lib/OpenApiPathItem.js";
import type { OpenApiRequestBody } from "./lib/OpenApiRequestBody.js";
import type { OpenApiResponse } from "./lib/OpenApiResponse.js";
import type { OpenApiResponses } from "./lib/OpenApiResponses.js";
import type { OpenApiSecurityRequirement } from "./lib/OpenApiSecurityRequirement.js";
import type { OpenApiServer } from "./lib/OpenApiServer.js";
import type { OpenApiServerVariable } from "./lib/OpenApiServerVariable.js";
import type { OpenApiSchema } from "./schema/OpenApiSchema.js";
import type {
  GConstructor,
  OpenApiExtensionString,
  OpenApiHTTPMethod,
  OpenApiHTTPStatusCode,
  OpenApiMediaContentType,
} from "./types.ts";

/**
 * @fieldType string
 * @serializedName description
 * @methodName addDescription
 */
export function withDescription<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _description?: string;
    addDescription(val: string) {
      const copy: this = Object.create(this);
      copy._description = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._description !== undefined) {
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
 * @methodName addSummary
 */
export function withSummary<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _summary?: string;
    addSummary(val: string) {
      const copy: this = Object.create(this);
      copy._summary = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._summary !== undefined) {
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
 * @methodName allowReserved
 */
export function withAllowReserved<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _allowReserved?: boolean;
    allowReserved() {
      const copy: this = Object.create(this);
      copy._allowReserved = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._allowReserved !== undefined) {
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
 * @methodName deprecated
 */
export function withDeprecated<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _deprecated?: boolean;
    deprecated() {
      const copy: this = Object.create(this);
      copy._deprecated = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._deprecated !== undefined) {
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
 * @methodName required
 */
export function withRequired<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _required?: boolean;
    required() {
      const copy: this = Object.create(this);
      copy._required = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._required !== undefined) {
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
 * @methodName nullable
 */
export function withNullable<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _nullable?: boolean;
    nullable() {
      const copy: this = Object.create(this);
      copy._nullable = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._nullable !== undefined) {
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
 * @methodName addName
 */
export function withName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _name?: string;
    addName(val: string) {
      const copy: this = Object.create(this);
      copy._name = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._name !== undefined) {
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
 * @methodName addNamespace
 */
export function withNamespace<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _namespace?: string;
    addNamespace(val: string) {
      const copy: this = Object.create(this);
      copy._namespace = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._namespace !== undefined) {
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
 * @methodName addPrefix
 */
export function withPrefix<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _prefix?: string;
    addPrefix(val: string) {
      const copy: this = Object.create(this);
      copy._prefix = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._prefix !== undefined) {
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
 * @methodName wrapped
 */
export function withWrapped<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _wrapped?: boolean;
    wrapped() {
      const copy: this = Object.create(this);
      copy._wrapped = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._wrapped !== undefined) {
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
 * @methodName attribute
 */
export function withAttribute<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _attribute?: boolean;
    attribute() {
      const copy: this = Object.create(this);
      copy._attribute = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._attribute !== undefined) {
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
 * @methodName addValue
 */
export function withValue<TBase extends GConstructor>(Base: TBase) {
  return <T extends string | unknown>() => {
    return class extends Base {
      _value?: T;
      addValue(val: T) {
        const copy: this = Object.create(this);
        copy._value = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._value !== undefined) {
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
 * @methodName addFormat
 */
export function withFormat<TBase extends GConstructor>(Base: TBase) {
  return <T extends string>() => {
    return class extends Base {
      _format?: T;
      addFormat(val: T) {
        const copy: this = Object.create(this);
        copy._format = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._format !== undefined) {
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
 * @fieldType T
 * @serializedName default
 * @methodName addDefault
 */
export function withDefault<TBase extends GConstructor>(Base: TBase) {
  return <T>() => {
    return class extends Base {
      _default?: T;
      addDefault(val: T) {
        const copy: this = Object.create(this);
        copy._default = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._default !== undefined) {
          Object.defineProperty(json, "default", {
            value: this._default,
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
 * @methodName addType
 */
export function withType<TBase extends GConstructor>(Base: TBase) {
  return <
    T extends "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect",
  >() => {
    return class extends Base {
      _type?: T;
      addType(val: T) {
        const copy: this = Object.create(this);
        copy._type = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._type !== undefined) {
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
 * @fieldType T
 * @serializedName in
 * @methodName addIn
 */
export function withIn<TBase extends GConstructor>(Base: TBase) {
  return <T>() => {
    return class extends Base {
      _in?: T;
      addIn(val: T) {
        const copy: this = Object.create(this);
        copy._in = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._in !== undefined) {
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
 * @methodName addMappings
 */
export function withMapping<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _mapping?: Map<string, string>;
    addMappings(mappings: Partial<{ [K in string]: string }>) {
      const copy: this = Object.create(this);
      copy._mapping = new Map(this._mapping);
      for (const key in mappings) {
        const k: string = key as string;
        copy._mapping.set(k, mappings[k]!);
      }
      return copy;
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
 * @fieldType Map<string,OpenApiExample>
 * @serializedName examples
 * @methodName addExamples
 */
export function withExamples<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _examples?: Map<string, OpenApiExample>;
    addExamples(mappings: Partial<{ [K in string]: OpenApiExample }>) {
      const copy: this = Object.create(this);
      copy._examples = new Map(this._examples);
      for (const key in mappings) {
        const k: string = key as string;
        copy._examples.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._examples) {
        const mappings: any = {};
        this._examples.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "examples", {
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
 * @methodName addExtensions
 */
export function withExtensions<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _extensions?: Map<OpenApiExtensionString, OpenApiSchema>;
    addExtensions(
      mappings: Partial<{ [K in OpenApiExtensionString]: OpenApiSchema }>
    ) {
      const copy: this = Object.create(this);
      copy._extensions = new Map(this._extensions);
      for (const key in mappings) {
        const k: OpenApiExtensionString = key as OpenApiExtensionString;
        copy._extensions.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._extensions) {
        const mappings: any = {};
        this._extensions.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "extensions", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName maximum
 * @methodName addMaximum
 */
export function withMaximum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _maximum?: number;
    addMaximum(val: number) {
      const copy: this = Object.create(this);
      copy._maximum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._maximum !== undefined) {
        Object.defineProperty(json, "maximum", {
          value: this._maximum,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName minimum
 * @methodName addMinimum
 */
export function withMinimum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _minimum?: number;
    addMinimum(val: number) {
      const copy: this = Object.create(this);
      copy._minimum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._minimum !== undefined) {
        Object.defineProperty(json, "minimum", {
          value: this._minimum,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName exclusiveMinimum
 * @methodName exclusiveMin
 */
export function withExclusiveMinimum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _exclusiveMinimum?: number;
    exclusiveMin(val: number) {
      const copy: this = Object.create(this);
      copy._exclusiveMinimum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._exclusiveMinimum !== undefined) {
        Object.defineProperty(json, "exclusiveMinimum", {
          value: this._exclusiveMinimum,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName exclusiveMaximum
 * @methodName exclusiveMax
 */
export function withExclusiveMaximum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _exclusiveMaximum?: number;
    exclusiveMax(val: number) {
      const copy: this = Object.create(this);
      copy._exclusiveMaximum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._exclusiveMaximum !== undefined) {
        Object.defineProperty(json, "exclusiveMaximum", {
          value: this._exclusiveMaximum,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName exclusiveMinimum
 * @methodName exclusiveMin
 */
export function withExclusiveMinimumBoolean<TBase extends GConstructor>(
  Base: TBase
) {
  return class extends Base {
    _exclusiveMinimum?: boolean;
    exclusiveMin() {
      const copy: this = Object.create(this);
      copy._exclusiveMinimum = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._exclusiveMinimum !== undefined) {
        Object.defineProperty(json, "exclusiveMinimum", {
          value: this._exclusiveMinimum,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType boolean
 * @serializedName exclusiveMaximum
 * @methodName exclusiveMax
 */
export function withExclusiveMaximumBoolean<TBase extends GConstructor>(
  Base: TBase
) {
  return class extends Base {
    _exclusiveMaximum?: boolean;
    exclusiveMax() {
      const copy: this = Object.create(this);
      copy._exclusiveMaximum = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._exclusiveMaximum !== undefined) {
        Object.defineProperty(json, "exclusiveMaximum", {
          value: this._exclusiveMaximum,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName multipleOf
 * @methodName addMultiple
 */
export function withMultipleOf<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _multipleOf?: number;
    addMultiple(val: number) {
      const copy: this = Object.create(this);
      copy._multipleOf = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._multipleOf !== undefined) {
        Object.defineProperty(json, "multipleOf", {
          value: this._multipleOf,
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
 * @methodName addPattern
 */
export function withPattern<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _pattern?: RegExp;
    addPattern(val: RegExp) {
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
 * @methodName addMinLength
 */
export function withMinLength<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _minLength?: number;
    addMinLength(val: number) {
      const copy: this = Object.create(this);
      copy._minLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._minLength !== undefined) {
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
 * @methodName addMaxLength
 */
export function withMaxLength<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _maxLength?: number;
    addMaxLength(val: number) {
      const copy: this = Object.create(this);
      copy._maxLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._maxLength !== undefined) {
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
 * @methodName addUrl
 */
export function withURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _url?: string;
    addUrl(val: string) {
      const copy: this = Object.create(this);
      copy._url = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._url !== undefined) {
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
 * @methodName addPropertyName
 */
export function withPropertyName<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _propertyName?: string;
    addPropertyName(val: string) {
      const copy: this = Object.create(this);
      copy._propertyName = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._propertyName !== undefined) {
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
 * @methodName addScheme
 */
export function withScheme<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _scheme?: string;
    addScheme(val: string) {
      const copy: this = Object.create(this);
      copy._scheme = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._scheme !== undefined) {
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
 * @methodName addBearerFormat
 */
export function withBearerFormat<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _bearerFormat?: string;
    addBearerFormat(val: string) {
      const copy: this = Object.create(this);
      copy._bearerFormat = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._bearerFormat !== undefined) {
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
 * @methodName addAuthorizationUrl
 */
export function withAuthorizationURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _authorizationUrl?: string;
    addAuthorizationUrl(val: string) {
      const copy: this = Object.create(this);
      copy._authorizationUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._authorizationUrl !== undefined) {
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
 * @methodName addTokenUrl
 */
export function withTokenURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _tokenUrl?: string;
    addTokenUrl(val: string) {
      const copy: this = Object.create(this);
      copy._tokenUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._tokenUrl !== undefined) {
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
 * @methodName addRefreshUrl
 */
export function withRefreshURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _refreshUrl?: string;
    addRefreshUrl(val: string) {
      const copy: this = Object.create(this);
      copy._refreshUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._refreshUrl !== undefined) {
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
 * @methodName addScopes
 */
export function withScopes<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _scopes?: Map<string, string>;
    addScopes(mappings: Partial<{ [K in string]: string }>) {
      const copy: this = Object.create(this);
      copy._scopes = new Map(this._scopes);
      for (const key in mappings) {
        const k: string = key as string;
        copy._scopes.set(k, mappings[k]!);
      }
      return copy;
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
 * @methodName addExternalDocs
 */
export function withExternalDocs<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _externalDocs?: OpenApiDocumentation;
    addExternalDocs(val: OpenApiDocumentation) {
      const copy: this = Object.create(this);
      copy._externalDocs = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._externalDocs !== undefined) {
        Object.defineProperty(json, "externalDocs", {
          value: this._externalDocs,
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
 * @methodName addImplicit
 */
export function withImplicit<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _implicit?: OpenApiOAuthFlow;
    addImplicit(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._implicit = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._implicit !== undefined) {
        Object.defineProperty(json, "implicit", {
          value: this._implicit,
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
 * @methodName addPassword
 */
export function withPassword<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _password?: OpenApiOAuthFlow;
    addPassword(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._password = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._password !== undefined) {
        Object.defineProperty(json, "password", {
          value: this._password,
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
 * @methodName addClientCredentials
 */
export function withClientCredentials<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _clientCredentials?: OpenApiOAuthFlow;
    addClientCredentials(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._clientCredentials = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._clientCredentials !== undefined) {
        Object.defineProperty(json, "clientCredentials", {
          value: this._clientCredentials,
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
 * @methodName addAuthorizationCode
 */
export function withAuthorizationCode<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _authorizationCode?: OpenApiOAuthFlow;
    addAuthorizationCode(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy._authorizationCode = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._authorizationCode !== undefined) {
        Object.defineProperty(json, "authorizationCode", {
          value: this._authorizationCode,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiSchema
 * @serializedName schema
 * @methodName addSchema
 */
export function withSchema<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _schema?: OpenApiSchema;
    addSchema(val: OpenApiSchema) {
      const copy: this = Object.create(this);
      copy._schema = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._schema !== undefined) {
        Object.defineProperty(json, "schema", {
          value: this._schema,
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
 * @methodName addFlows
 */
export function withFlows<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _flows?: OpenApiOAuthFlows;
    addFlows(val: OpenApiOAuthFlows) {
      const copy: this = Object.create(this);
      copy._flows = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._flows !== undefined) {
        Object.defineProperty(json, "flows", {
          value: this._flows,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiExample
 * @serializedName example
 * @methodName addExample
 */
export function withExample<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _example?: OpenApiExample;
    addExample(val: OpenApiExample) {
      const copy: this = Object.create(this);
      copy._example = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._example !== undefined) {
        Object.defineProperty(json, "example", {
          value: this._example,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiSchema
 * @serializedName items
 * @methodName addItemTypes
 */
export function withItems<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _items?: OpenApiSchema;
    addItemTypes(val: OpenApiSchema) {
      const copy: this = Object.create(this);
      copy._items = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._items !== undefined) {
        Object.defineProperty(json, "items", {
          value: this._items,
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
 * @methodName addOpenIdConnectUrl
 */
export function withOpenIdConnectURL<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _openIdConnectUrl?: string;
    addOpenIdConnectUrl(val: string) {
      const copy: this = Object.create(this);
      copy._openIdConnectUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._openIdConnectUrl !== undefined) {
        Object.defineProperty(json, "openIdConnectUrl", {
          value: this._openIdConnectUrl,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName externalValue
 * @methodName addExternalValue
 */
export function withExternalValue<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _externalValue?: string;
    addExternalValue(val: string) {
      const copy: this = Object.create(this);
      copy._externalValue = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._externalValue !== undefined) {
        Object.defineProperty(json, "externalValue", {
          value: this._externalValue,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName title
 * @methodName addTitle
 */
export function withTitle<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _title?: string;
    addTitle(val: string) {
      const copy: this = Object.create(this);
      copy._title = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._title !== undefined) {
        Object.defineProperty(json, "title", {
          value: this._title,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName version
 * @methodName addVersion
 */
export function withVersion<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _version?: string;
    addVersion(val: string) {
      const copy: this = Object.create(this);
      copy._version = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._version !== undefined) {
        Object.defineProperty(json, "version", {
          value: this._version,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName minItems
 * @methodName addMinItems
 */
export function withMinItems<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _minItems?: number;
    addMinItems(val: number) {
      const copy: this = Object.create(this);
      copy._minItems = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._minItems !== undefined) {
        Object.defineProperty(json, "minItems", {
          value: this._minItems,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType number
 * @serializedName maxItems
 * @methodName addMaxItems
 */
export function withMaxItems<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _maxItems?: number;
    addMaxItems(val: number) {
      const copy: this = Object.create(this);
      copy._maxItems = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._maxItems !== undefined) {
        Object.defineProperty(json, "maxItems", {
          value: this._maxItems,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiSchema>
 * @serializedName properties
 * @methodName addProperties
 */
export function withProperties<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _properties?: Map<string, OpenApiSchema>;
    addProperties(mappings: Partial<{ [K in string]: OpenApiSchema }>) {
      const copy: this = Object.create(this);
      copy._properties = new Map(this._properties);
      for (const key in mappings) {
        const k: string = key as string;
        copy._properties.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._properties) {
        const mappings: any = {};
        this._properties.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "properties", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType T
 * @serializedName enum
 * @methodName addEnums
 */
export function withEnum<TBase extends GConstructor>(Base: TBase) {
  return <T>() => {
    return class extends Base {
      _enum?: T[];
      addEnums(val: T[]) {
        const copy: this = Object.create(this);
        copy._enum = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._enum !== undefined) {
          Object.defineProperty(json, "enum", {
            value: this._enum,
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
 * @serializedName style
 * @methodName addStyle
 */
export function withStyle<TBase extends GConstructor>(Base: TBase) {
  return <T extends string>() => {
    return class extends Base {
      _style?: T;
      addStyle(val: T) {
        const copy: this = Object.create(this);
        copy._style = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._style !== undefined) {
          Object.defineProperty(json, "style", {
            value: this._style,
            enumerable: true,
          });
        }
        return json;
      }
    };
  };
}

/**
 * @fieldType boolean
 * @serializedName explode
 * @methodName explode
 */
export function withExplode<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _explode?: boolean;
    explode() {
      const copy: this = Object.create(this);
      copy._explode = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._explode !== undefined) {
        Object.defineProperty(json, "explode", {
          value: this._explode,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName contentType
 * @methodName addContentType
 */
export function withContentType<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _contentType?: string;
    addContentType(val: string) {
      const copy: this = Object.create(this);
      copy._contentType = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._contentType !== undefined) {
        Object.defineProperty(json, "contentType", {
          value: this._contentType,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName operationRef
 * @methodName addOperationRef
 */
export function withOperationRef<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _operationRef?: string;
    addOperationRef(val: string) {
      const copy: this = Object.create(this);
      copy._operationRef = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._operationRef !== undefined) {
        Object.defineProperty(json, "operationRef", {
          value: this._operationRef,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName operationId
 * @methodName addOperationId
 */
export function withOperationId<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _operationId?: string;
    addOperationId(val: string) {
      const copy: this = Object.create(this);
      copy._operationId = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._operationId !== undefined) {
        Object.defineProperty(json, "operationId", {
          value: this._operationId,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiHeader>
 * @serializedName headers
 * @methodName addHeaders
 */
export function withHeaders<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _headers?: Map<string, OpenApiHeader>;
    addHeaders(mappings: Partial<{ [K in string]: OpenApiHeader }>) {
      const copy: this = Object.create(this);
      copy._headers = new Map(this._headers);
      for (const key in mappings) {
        const k: string = key as string;
        copy._headers.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._headers) {
        const mappings: any = {};
        this._headers.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "headers", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<OpenApiMediaContentType,OpenApiMediaType>
 * @serializedName content
 * @methodName addContents
 */
export function withContent<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _content?: Map<OpenApiMediaContentType, OpenApiMediaType>;
    addContents(
      mappings: Partial<{ [K in OpenApiMediaContentType]: OpenApiMediaType }>
    ) {
      const copy: this = Object.create(this);
      copy._content = new Map(this._content);
      for (const key in mappings) {
        const k: OpenApiMediaContentType = key as OpenApiMediaContentType;
        copy._content.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._content) {
        const mappings: any = {};
        this._content.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "content", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiEncoding>
 * @serializedName encoding
 * @methodName addEncodings
 */
export function withEncoding<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _encoding?: Map<string, OpenApiEncoding>;
    addEncodings(mappings: Partial<{ [K in string]: OpenApiEncoding }>) {
      const copy: this = Object.create(this);
      copy._encoding = new Map(this._encoding);
      for (const key in mappings) {
        const k: string = key as string;
        copy._encoding.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._encoding) {
        const mappings: any = {};
        this._encoding.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "encoding", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiPathItem>
 * @serializedName callback
 * @methodName addCallback
 */
export function withCallback<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _callback?: Map<string, OpenApiPathItem>;
    addCallback(mappings: Partial<{ [K in string]: OpenApiPathItem }>) {
      const copy: this = Object.create(this);
      copy._callback = new Map(this._callback);
      for (const key in mappings) {
        const k: string = key as string;
        copy._callback.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._callback) {
        const mappings: any = {};
        this._callback.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "callback", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiServerVariable>
 * @serializedName variables
 * @methodName addVariables
 */
export function withVariables<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _variables?: Map<string, OpenApiServerVariable>;
    addVariables(mappings: Partial<{ [K in string]: OpenApiServerVariable }>) {
      const copy: this = Object.create(this);
      copy._variables = new Map(this._variables);
      for (const key in mappings) {
        const k: string = key as string;
        copy._variables.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._variables) {
        const mappings: any = {};
        this._variables.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "variables", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiLink>
 * @serializedName links
 * @methodName addLinks
 */
export function withLinks<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _links?: Map<string, OpenApiLink>;
    addLinks(mappings: Partial<{ [K in string]: OpenApiLink }>) {
      const copy: this = Object.create(this);
      copy._links = new Map(this._links);
      for (const key in mappings) {
        const k: string = key as string;
        copy._links.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._links) {
        const mappings: any = {};
        this._links.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "links", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiServer
 * @serializedName server
 * @methodName addServer
 */
export function withServer<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _server?: OpenApiServer;
    addServer(val: OpenApiServer) {
      const copy: this = Object.create(this);
      copy._server = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._server !== undefined) {
        Object.defineProperty(json, "server", {
          value: this._server,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiCallback>
 * @serializedName callbacks
 * @methodName addCallbacks
 */
export function withCallbacks<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _callbacks?: Map<string, OpenApiCallback>;
    addCallbacks(mappings: Partial<{ [K in string]: OpenApiCallback }>) {
      const copy: this = Object.create(this);
      copy._callbacks = new Map(this._callbacks);
      for (const key in mappings) {
        const k: string = key as string;
        copy._callbacks.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._callbacks) {
        const mappings: any = {};
        this._callbacks.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "callbacks", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,string>
 * @serializedName parameters
 * @methodName addParametersLiteral
 */
export function withParametersPrimitive<TBase extends GConstructor>(
  Base: TBase
) {
  return class extends Base {
    _parameters?: Map<string, string>;
    addParametersLiteral(mappings: Partial<{ [K in string]: string }>) {
      const copy: this = Object.create(this);
      copy._parameters = new Map(this._parameters);
      for (const key in mappings) {
        const k: string = key as string;
        copy._parameters.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._parameters) {
        const mappings: any = {};
        this._parameters.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "parameters", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName requestBody
 * @methodName addRequestBodyLiteral
 */
export function withRequestBodyPrimitive<TBase extends GConstructor>(
  Base: TBase
) {
  return class extends Base {
    _requestBody?: string;
    addRequestBodyLiteral(val: string) {
      const copy: this = Object.create(this);
      copy._requestBody = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._requestBody !== undefined) {
        Object.defineProperty(json, "requestBody", {
          value: this._requestBody,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiRequestBody
 * @serializedName requestBody
 * @methodName addRequestBody
 */
export function withRequestBody<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _requestBody?: OpenApiRequestBody;
    addRequestBody(val: OpenApiRequestBody) {
      const copy: this = Object.create(this);
      copy._requestBody = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._requestBody !== undefined) {
        Object.defineProperty(json, "requestBody", {
          value: this._requestBody,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<OpenApiHTTPStatusCode,OpenApiResponse>
 * @serializedName response
 * @methodName addResponses
 */
export function withResponses<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _response?: Map<OpenApiHTTPStatusCode, OpenApiResponse>;
    addResponses(
      mappings: Partial<{ [K in OpenApiHTTPStatusCode]: OpenApiResponse }>
    ) {
      const copy: this = Object.create(this);
      copy._response = new Map(this._response);
      for (const key in mappings) {
        const k: OpenApiHTTPStatusCode = key as OpenApiHTTPStatusCode;
        copy._response.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._response) {
        this._response.forEach((val, key) => {
          Object.defineProperty(json, key, { value: val, enumerable: true });
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<OpenApiHTTPMethod,OpenApiOperation>
 * @serializedName method
 * @methodName addMethod
 */
export function withMethods<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _method?: Map<OpenApiHTTPMethod, OpenApiOperation>;
    addMethod(
      mappings: Partial<{ [K in OpenApiHTTPMethod]: OpenApiOperation }>
    ) {
      const copy: this = Object.create(this);
      copy._method = new Map(this._method);
      for (const key in mappings) {
        const k: OpenApiHTTPMethod = key as OpenApiHTTPMethod;
        copy._method.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._method) {
        this._method.forEach((val, key) => {
          Object.defineProperty(json, key, { value: val, enumerable: true });
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiPathItem>
 * @serializedName endpoint
 * @methodName addEndpoints
 */
export function withPath<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _endpoint?: Map<string, OpenApiPathItem>;
    addEndpoints(mappings: Partial<{ [K in string]: OpenApiPathItem }>) {
      const copy: this = Object.create(this);
      copy._endpoint = new Map(this._endpoint);
      for (const key in mappings) {
        const k: string = key as string;
        copy._endpoint.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._endpoint) {
        this._endpoint.forEach((val, key) => {
          Object.defineProperty(json, key, { value: val, enumerable: true });
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiParameter
 * @serializedName parameters
 * @methodName addParameters
 */
export function withParametersArray<TBase extends GConstructor>(Base: TBase) {
  return <T extends OpenApiParameter>() => {
    return class extends Base {
      _parameters?: T[];
      addParameters(val: T[]) {
        const copy: this = Object.create(this);
        copy._parameters = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._parameters !== undefined) {
          Object.defineProperty(json, "parameters", {
            value: this._parameters,
            enumerable: true,
          });
        }
        return json;
      }
    };
  };
}

/**
 * @fieldType OpenApiSecurityRequirement
 * @serializedName security
 * @methodName addSecurity
 */
export function withSecurityArray<TBase extends GConstructor>(Base: TBase) {
  return <T extends OpenApiSecurityRequirement>() => {
    return class extends Base {
      _security?: T[];
      addSecurity(val: T[]) {
        const copy: this = Object.create(this);
        copy._security = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._security !== undefined) {
          Object.defineProperty(json, "security", {
            value: this._security,
            enumerable: true,
          });
        }
        return json;
      }
    };
  };
}

/**
 * @fieldType OpenApiServer
 * @serializedName servers
 * @methodName addServers
 */
export function withServersArray<TBase extends GConstructor>(Base: TBase) {
  return <T extends OpenApiServer>() => {
    return class extends Base {
      _servers?: T[];
      addServers(val: T[]) {
        const copy: this = Object.create(this);
        copy._servers = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._servers !== undefined) {
          Object.defineProperty(json, "servers", {
            value: this._servers,
            enumerable: true,
          });
        }
        return json;
      }
    };
  };
}

/**
 * @fieldType (OpenApiSchema|null)
 * @serializedName type
 * @methodName ofTypes
 */
export function withUnionTypes<TBase extends GConstructor>(Base: TBase) {
  return <T extends OpenApiSchema | null>() => {
    return class extends Base {
      _type?: T[];
      ofTypes(val: T[]) {
        const copy: this = Object.create(this);
        copy._type = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._type !== undefined) {
          if (this._type !== undefined) {
            const deserializedSchemas = this._type.map(schema =>
              schema ? schema.toJSON() : schema
            );
            const newJSON: { type: string[] } = { type: [] };
            deserializedSchemas.forEach(jsonVal => {
              if (typeof jsonVal !== "object") {
                throw new Error("Unable to deserialize the union.");
              }
              if (jsonVal === null) {
                newJSON.type.push("null");
              } else if ("type" in jsonVal) {
                newJSON.type.push(jsonVal["type"] as string);
                const { type, ...rest } = jsonVal;
                Object.assign(newJSON, rest);
              }
            });
            return newJSON;
          }
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
 * @fieldType T
 * @serializedName tags
 * @methodName addTags
 */
export function withTags<TBase extends GConstructor>(Base: TBase) {
  return <T>() => {
    return class extends Base {
      _tags?: T[];
      addTags(val: T[]) {
        const copy: this = Object.create(this);
        copy._tags = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._tags !== undefined) {
          Object.defineProperty(json, "tags", {
            value: this._tags,
            enumerable: true,
          });
        }
        return json;
      }
    };
  };
}

/**
 * @fieldType T
 * @serializedName required
 * @methodName addRequired
 */
export function withRequiredEnumerable<TBase extends GConstructor>(
  Base: TBase
) {
  return <T>() => {
    return class extends Base {
      _required?: T[];
      addRequired(val: T[]) {
        const copy: this = Object.create(this);
        copy._required = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this._required !== undefined) {
          Object.defineProperty(json, "required", {
            value: this._required,
            enumerable: true,
          });
        }
        return json;
      }
    };
  };
}

/**
 * @fieldType boolean
 * @serializedName additionalProperties
 * @methodName additionalProperties
 */
export function withAdditionalProperties<TBase extends GConstructor>(
  Base: TBase
) {
  return class extends Base {
    _additionalProperties?: boolean;
    additionalProperties() {
      const copy: this = Object.create(this);
      copy._additionalProperties = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._additionalProperties !== undefined) {
        Object.defineProperty(json, "additionalProperties", {
          value: this._additionalProperties,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,string[]>
 * @serializedName field
 * @methodName addSecurityRequirement
 */
export function withSecurityRequirement<TBase extends GConstructor>(
  Base: TBase
) {
  return class extends Base {
    _field?: Map<string, string[]>;
    addSecurityRequirement(
      mappings: Partial<{ [K in string]: Array<string> }>
    ) {
      const copy: this = Object.create(this);
      copy._field = new Map(this._field);
      for (const key in mappings) {
        const k: string = key as string;
        copy._field.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._field) {
        this._field.forEach((val, key) => {
          Object.defineProperty(json, key, { value: val, enumerable: true });
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName openapi
 * @methodName addOpenApiVersion
 */
export function withOpenApi<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _openapi?: string;
    addOpenApiVersion(val: string) {
      const copy: this = Object.create(this);
      copy._openapi = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._openapi !== undefined) {
        Object.defineProperty(json, "openapi", {
          value: this._openapi,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName termsOfService
 * @methodName addTermsOfService
 */
export function withTermsOfService<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _termsOfService?: string;
    addTermsOfService(val: string) {
      const copy: this = Object.create(this);
      copy._termsOfService = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._termsOfService !== undefined) {
        Object.defineProperty(json, "termsOfService", {
          value: this._termsOfService,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName jsonSchemaDialect
 * @methodName addJsonSchemaDialect
 */
export function withJSONSchemaDialect<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _jsonSchemaDialect?: string;
    addJsonSchemaDialect(val: string) {
      const copy: this = Object.create(this);
      copy._jsonSchemaDialect = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._jsonSchemaDialect !== undefined) {
        Object.defineProperty(json, "jsonSchemaDialect", {
          value: this._jsonSchemaDialect,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName email
 * @methodName addEmail
 */
export function withEmail<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _email?: string;
    addEmail(val: string) {
      const copy: this = Object.create(this);
      copy._email = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._email !== undefined) {
        Object.defineProperty(json, "email", {
          value: this._email,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType string
 * @serializedName identifier
 * @methodName addIdentifier
 */
export function withIdentifier<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _identifier?: string;
    addIdentifier(val: string) {
      const copy: this = Object.create(this);
      copy._identifier = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._identifier !== undefined) {
        Object.defineProperty(json, "identifier", {
          value: this._identifier,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiInfo
 * @serializedName info
 * @methodName addInfo
 */
export function withInfo<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _info?: OpenApiInfo;
    addInfo(val: OpenApiInfo) {
      const copy: this = Object.create(this);
      copy._info = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._info !== undefined) {
        Object.defineProperty(json, "info", {
          value: this._info,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiPath
 * @serializedName paths
 * @methodName addPaths
 */
export function withPaths<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _paths?: OpenApiPath;
    addPaths(val: OpenApiPath) {
      const copy: this = Object.create(this);
      copy._paths = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._paths !== undefined) {
        Object.defineProperty(json, "paths", {
          value: this._paths,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiContact
 * @serializedName contact
 * @methodName addContact
 */
export function withContact<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _contact?: OpenApiContact;
    addContact(val: OpenApiContact) {
      const copy: this = Object.create(this);
      copy._contact = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._contact !== undefined) {
        Object.defineProperty(json, "contact", {
          value: this._contact,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiResponses
 * @serializedName responses
 * @methodName addResponses
 */
export function withResponsesObject<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _responses?: OpenApiResponses;
    addResponses(val: OpenApiResponses) {
      const copy: this = Object.create(this);
      copy._responses = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._responses !== undefined) {
        Object.defineProperty(json, "responses", {
          value: this._responses,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType OpenApiLicense
 * @serializedName license
 * @methodName addLicense
 */
export function withLicense<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _license?: OpenApiLicense;
    addLicense(val: OpenApiLicense) {
      const copy: this = Object.create(this);
      copy._license = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._license !== undefined) {
        Object.defineProperty(json, "license", {
          value: this._license,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiPathItem>
 * @serializedName webhooks
 * @methodName addWebhooks
 */
export function withWebhooks<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    _webhooks?: Map<string, OpenApiPathItem>;
    addWebhooks(mappings: Partial<{ [K in string]: OpenApiPathItem }>) {
      const copy: this = Object.create(this);
      copy._webhooks = new Map(this._webhooks);
      for (const key in mappings) {
        const k: string = key as string;
        copy._webhooks.set(k, mappings[k]!);
      }
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this._webhooks) {
        const mappings: any = {};
        this._webhooks.forEach((val, key) => {
          mappings[key] = val;
        });
        Object.defineProperty(json, "webhooks", {
          value: mappings,
          enumerable: true,
        });
      }
      return json;
    }
  };
}
