import type { OpenApiMediaType } from "../core/common/OpenApiMedia.js";
import type { OpenApiSchema } from "../core/schema/OpenApiSchema.js";
import type {
  OpenApiExample,
  OpenApiDocumentation,
  OpenApiOAuthFlow,
  OpenApiOAuthFlows,
  OpenApiHeader,
  OpenApiEncoding,
  OpenApiPathItem,
  OpenApiServerVariable,
  OpenApiLink,
  OpenApiServer,
  OpenApiCallback,
  OpenApiRequestBody,
  OpenApiResponse,
  OpenApiOperation,
  OpenApiParameter,
  OpenApiSecurityRequirement,
  OpenApiInfo,
  OpenApiPath,
  OpenApiContact,
  OpenApiResponses,
  OpenApiLicense,
} from "../external.js";
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
    #description?: string;
    addDescription(val: string) {
      const copy: this = Object.create(this);
      copy.#description = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#description !== undefined) {
        Object.defineProperty(json, "description", {
          value: this.#description,
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
    #summary?: string;
    addSummary(val: string) {
      const copy: this = Object.create(this);
      copy.#summary = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#summary !== undefined) {
        Object.defineProperty(json, "summary", {
          value: this.#summary,
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
    #allowReserved?: boolean;
    allowReserved() {
      const copy: this = Object.create(this);
      copy.#allowReserved = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#allowReserved !== undefined) {
        Object.defineProperty(json, "allowReserved", {
          value: this.#allowReserved,
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
    #deprecated?: boolean;
    deprecated() {
      const copy: this = Object.create(this);
      copy.#deprecated = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#deprecated !== undefined) {
        Object.defineProperty(json, "deprecated", {
          value: this.#deprecated,
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
    #required?: boolean;
    required() {
      const copy: this = Object.create(this);
      copy.#required = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#required !== undefined) {
        Object.defineProperty(json, "required", {
          value: this.#required,
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
    #nullable?: boolean;
    nullable() {
      const copy: this = Object.create(this);
      copy.#nullable = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#nullable !== undefined) {
        Object.defineProperty(json, "nullable", {
          value: this.#nullable,
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
    #name?: string;
    addName(val: string) {
      const copy: this = Object.create(this);
      copy.#name = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#name !== undefined) {
        Object.defineProperty(json, "name", {
          value: this.#name,
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
    #namespace?: string;
    addNamespace(val: string) {
      const copy: this = Object.create(this);
      copy.#namespace = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#namespace !== undefined) {
        Object.defineProperty(json, "namespace", {
          value: this.#namespace,
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
    #prefix?: string;
    addPrefix(val: string) {
      const copy: this = Object.create(this);
      copy.#prefix = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#prefix !== undefined) {
        Object.defineProperty(json, "prefix", {
          value: this.#prefix,
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
    #wrapped?: boolean;
    wrapped() {
      const copy: this = Object.create(this);
      copy.#wrapped = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#wrapped !== undefined) {
        Object.defineProperty(json, "wrapped", {
          value: this.#wrapped,
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
    #attribute?: boolean;
    attribute() {
      const copy: this = Object.create(this);
      copy.#attribute = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#attribute !== undefined) {
        Object.defineProperty(json, "attribute", {
          value: this.#attribute,
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
      #value?: T;
      addValue(val: T) {
        const copy: this = Object.create(this);
        copy.#value = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#value !== undefined) {
          Object.defineProperty(json, "value", {
            value: this.#value,
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
      #format?: T;
      addFormat(val: T) {
        const copy: this = Object.create(this);
        copy.#format = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#format !== undefined) {
          Object.defineProperty(json, "format", {
            value: this.#format,
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
      #default?: T;
      addDefault(val: T) {
        const copy: this = Object.create(this);
        copy.#default = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#default !== undefined) {
          Object.defineProperty(json, "default", {
            value: this.#default,
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
      #type?: T;
      addType(val: T) {
        const copy: this = Object.create(this);
        copy.#type = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#type !== undefined) {
          Object.defineProperty(json, "type", {
            value: this.#type,
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
      #in?: T;
      addIn(val: T) {
        const copy: this = Object.create(this);
        copy.#in = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#in !== undefined) {
          Object.defineProperty(json, "in", {
            value: this.#in,
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
 * @methodName addMap
 */
export function withMapping<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #mapping?: Map<string, string>;
    addMap(name: string, val: string) {
      const copy: this = Object.create(this);
      copy.#mapping = new Map(this.#mapping);
      copy.#mapping.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#mapping) {
        const mappings: any = {};
        this.#mapping.forEach((val, key) => {
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
 * @methodName addExample
 */
export function withExamples<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #examples?: Map<string, OpenApiExample>;
    addExample(name: string, val: OpenApiExample) {
      const copy: this = Object.create(this);
      copy.#examples = new Map(this.#examples);
      copy.#examples.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#examples) {
        const mappings: any = {};
        this.#examples.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
 * @methodName addExtension
 */
export function withExtensions<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #extensions?: Map<OpenApiExtensionString, OpenApiSchema>;
    addExtension(name: OpenApiExtensionString, val: OpenApiSchema) {
      const copy: this = Object.create(this);
      copy.#extensions = new Map(this.#extensions);
      copy.#extensions.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#extensions) {
        const mappings: any = {};
        this.#extensions.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
    #maximum?: number;
    addMaximum(val: number) {
      const copy: this = Object.create(this);
      copy.#maximum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#maximum !== undefined) {
        Object.defineProperty(json, "maximum", {
          value: this.#maximum,
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
    #minimum?: number;
    addMinimum(val: number) {
      const copy: this = Object.create(this);
      copy.#minimum = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#minimum !== undefined) {
        Object.defineProperty(json, "minimum", {
          value: this.#minimum,
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
export function withExclusiveMinimum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #exclusiveMinimum?: boolean;
    exclusiveMin() {
      const copy: this = Object.create(this);
      copy.#exclusiveMinimum = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#exclusiveMinimum !== undefined) {
        Object.defineProperty(json, "exclusiveMinimum", {
          value: this.#exclusiveMinimum,
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
export function withExclusiveMaximum<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #exclusiveMaximum?: boolean;
    exclusiveMax() {
      const copy: this = Object.create(this);
      copy.#exclusiveMaximum = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#exclusiveMaximum !== undefined) {
        Object.defineProperty(json, "exclusiveMaximum", {
          value: this.#exclusiveMaximum,
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
    #multipleOf?: number;
    addMultiple(val: number) {
      const copy: this = Object.create(this);
      copy.#multipleOf = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#multipleOf !== undefined) {
        Object.defineProperty(json, "multipleOf", {
          value: this.#multipleOf,
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
    #pattern?: RegExp;
    addPattern(val: RegExp) {
      const copy: this = Object.create(this);
      copy.#pattern = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#pattern) {
        Object.defineProperty(json, "pattern", {
          value: this.#pattern.source,
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
    #minLength?: number;
    addMinLength(val: number) {
      const copy: this = Object.create(this);
      copy.#minLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#minLength !== undefined) {
        Object.defineProperty(json, "minLength", {
          value: this.#minLength,
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
    #maxLength?: number;
    addMaxLength(val: number) {
      const copy: this = Object.create(this);
      copy.#maxLength = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#maxLength !== undefined) {
        Object.defineProperty(json, "maxLength", {
          value: this.#maxLength,
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
    #url?: string;
    addUrl(val: string) {
      const copy: this = Object.create(this);
      copy.#url = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#url !== undefined) {
        Object.defineProperty(json, "url", {
          value: this.#url,
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
    #propertyName?: string;
    addPropertyName(val: string) {
      const copy: this = Object.create(this);
      copy.#propertyName = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#propertyName !== undefined) {
        Object.defineProperty(json, "propertyName", {
          value: this.#propertyName,
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
    #scheme?: string;
    addScheme(val: string) {
      const copy: this = Object.create(this);
      copy.#scheme = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#scheme !== undefined) {
        Object.defineProperty(json, "scheme", {
          value: this.#scheme,
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
    #bearerFormat?: string;
    addBearerFormat(val: string) {
      const copy: this = Object.create(this);
      copy.#bearerFormat = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#bearerFormat !== undefined) {
        Object.defineProperty(json, "bearerFormat", {
          value: this.#bearerFormat,
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
    #authorizationUrl?: string;
    addAuthorizationUrl(val: string) {
      const copy: this = Object.create(this);
      copy.#authorizationUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#authorizationUrl !== undefined) {
        Object.defineProperty(json, "authorizationUrl", {
          value: this.#authorizationUrl,
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
    #tokenUrl?: string;
    addTokenUrl(val: string) {
      const copy: this = Object.create(this);
      copy.#tokenUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#tokenUrl !== undefined) {
        Object.defineProperty(json, "tokenUrl", {
          value: this.#tokenUrl,
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
    #refreshUrl?: string;
    addRefreshUrl(val: string) {
      const copy: this = Object.create(this);
      copy.#refreshUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#refreshUrl !== undefined) {
        Object.defineProperty(json, "refreshUrl", {
          value: this.#refreshUrl,
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
 * @methodName addScope
 */
export function withScopes<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #scopes?: Map<string, string>;
    addScope(name: string, val: string) {
      const copy: this = Object.create(this);
      copy.#scopes = new Map(this.#scopes);
      copy.#scopes.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#scopes) {
        const mappings: any = {};
        this.#scopes.forEach((val, key) => {
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
    #externalDocs?: OpenApiDocumentation;
    addExternalDocs(val: OpenApiDocumentation) {
      const copy: this = Object.create(this);
      copy.#externalDocs = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#externalDocs) {
        Object.defineProperty(json, "externalDocs", {
          value: this.#externalDocs.toJSON(),
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
    #implicit?: OpenApiOAuthFlow;
    addImplicit(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy.#implicit = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#implicit) {
        Object.defineProperty(json, "implicit", {
          value: this.#implicit.toJSON(),
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
    #password?: OpenApiOAuthFlow;
    addPassword(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy.#password = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#password) {
        Object.defineProperty(json, "password", {
          value: this.#password.toJSON(),
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
    #clientCredentials?: OpenApiOAuthFlow;
    addClientCredentials(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy.#clientCredentials = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#clientCredentials) {
        Object.defineProperty(json, "clientCredentials", {
          value: this.#clientCredentials.toJSON(),
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
    #authorizationCode?: OpenApiOAuthFlow;
    addAuthorizationCode(val: OpenApiOAuthFlow) {
      const copy: this = Object.create(this);
      copy.#authorizationCode = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#authorizationCode) {
        Object.defineProperty(json, "authorizationCode", {
          value: this.#authorizationCode.toJSON(),
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
    #schema?: OpenApiSchema;
    addSchema(val: OpenApiSchema) {
      const copy: this = Object.create(this);
      copy.#schema = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#schema) {
        Object.defineProperty(json, "schema", {
          value: this.#schema.toJSON(),
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
    #flows?: OpenApiOAuthFlows;
    addFlows(val: OpenApiOAuthFlows) {
      const copy: this = Object.create(this);
      copy.#flows = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#flows) {
        Object.defineProperty(json, "flows", {
          value: this.#flows.toJSON(),
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
    #example?: OpenApiExample;
    addExample(val: OpenApiExample) {
      const copy: this = Object.create(this);
      copy.#example = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#example) {
        Object.defineProperty(json, "example", {
          value: this.#example.toJSON(),
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
    #items?: OpenApiSchema;
    addItemTypes(val: OpenApiSchema) {
      const copy: this = Object.create(this);
      copy.#items = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#items) {
        Object.defineProperty(json, "items", {
          value: this.#items.toJSON(),
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
    #openIdConnectUrl?: string;
    addOpenIdConnectUrl(val: string) {
      const copy: this = Object.create(this);
      copy.#openIdConnectUrl = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#openIdConnectUrl !== undefined) {
        Object.defineProperty(json, "openIdConnectUrl", {
          value: this.#openIdConnectUrl,
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
    #externalValue?: string;
    addExternalValue(val: string) {
      const copy: this = Object.create(this);
      copy.#externalValue = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#externalValue !== undefined) {
        Object.defineProperty(json, "externalValue", {
          value: this.#externalValue,
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
    #title?: string;
    addTitle(val: string) {
      const copy: this = Object.create(this);
      copy.#title = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#title !== undefined) {
        Object.defineProperty(json, "title", {
          value: this.#title,
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
    #version?: string;
    addVersion(val: string) {
      const copy: this = Object.create(this);
      copy.#version = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#version !== undefined) {
        Object.defineProperty(json, "version", {
          value: this.#version,
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
    #minItems?: number;
    addMinItems(val: number) {
      const copy: this = Object.create(this);
      copy.#minItems = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#minItems !== undefined) {
        Object.defineProperty(json, "minItems", {
          value: this.#minItems,
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
    #maxItems?: number;
    addMaxItems(val: number) {
      const copy: this = Object.create(this);
      copy.#maxItems = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#maxItems !== undefined) {
        Object.defineProperty(json, "maxItems", {
          value: this.#maxItems,
          enumerable: true,
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiSchema>
 * @serializedName property
 * @methodName addProperty
 */
export function withProperty<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #property?: Map<string, OpenApiSchema>;
    addProperty(name: string, val: OpenApiSchema) {
      const copy: this = Object.create(this);
      copy.#property = new Map(this.#property);
      copy.#property.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#property) {
        const mappings: any = {};
        this.#property.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
      #enum?: T[];
      addEnums(val: T[]) {
        const copy: this = Object.create(this);
        copy.#enum = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#enum !== undefined) {
          Object.defineProperty(json, "enum", {
            value: this.#enum,
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
      #style?: T;
      addStyle(val: T) {
        const copy: this = Object.create(this);
        copy.#style = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#style !== undefined) {
          Object.defineProperty(json, "style", {
            value: this.#style,
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
    #explode?: boolean;
    explode() {
      const copy: this = Object.create(this);
      copy.#explode = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#explode !== undefined) {
        Object.defineProperty(json, "explode", {
          value: this.#explode,
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
    #contentType?: string;
    addContentType(val: string) {
      const copy: this = Object.create(this);
      copy.#contentType = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#contentType !== undefined) {
        Object.defineProperty(json, "contentType", {
          value: this.#contentType,
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
    #operationRef?: string;
    addOperationRef(val: string) {
      const copy: this = Object.create(this);
      copy.#operationRef = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#operationRef !== undefined) {
        Object.defineProperty(json, "operationRef", {
          value: this.#operationRef,
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
    #operationId?: string;
    addOperationId(val: string) {
      const copy: this = Object.create(this);
      copy.#operationId = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#operationId !== undefined) {
        Object.defineProperty(json, "operationId", {
          value: this.#operationId,
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
 * @methodName addHeader
 */
export function withHeaders<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #headers?: Map<string, OpenApiHeader>;
    addHeader(name: string, val: OpenApiHeader) {
      const copy: this = Object.create(this);
      copy.#headers = new Map(this.#headers);
      copy.#headers.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#headers) {
        const mappings: any = {};
        this.#headers.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
 * @methodName addContent
 */
export function withContent<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #content?: Map<OpenApiMediaContentType, OpenApiMediaType>;
    addContent(name: OpenApiMediaContentType, val: OpenApiMediaType) {
      const copy: this = Object.create(this);
      copy.#content = new Map(this.#content);
      copy.#content.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#content) {
        const mappings: any = {};
        this.#content.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
 * @methodName addEncoding
 */
export function withEncoding<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #encoding?: Map<string, OpenApiEncoding>;
    addEncoding(name: string, val: OpenApiEncoding) {
      const copy: this = Object.create(this);
      copy.#encoding = new Map(this.#encoding);
      copy.#encoding.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#encoding) {
        const mappings: any = {};
        this.#encoding.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
    #callback?: Map<string, OpenApiPathItem>;
    addCallback(name: string, val: OpenApiPathItem) {
      const copy: this = Object.create(this);
      copy.#callback = new Map(this.#callback);
      copy.#callback.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#callback) {
        const mappings: any = {};
        this.#callback.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
 * @methodName addVariable
 */
export function withVariables<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #variables?: Map<string, OpenApiServerVariable>;
    addVariable(name: string, val: OpenApiServerVariable) {
      const copy: this = Object.create(this);
      copy.#variables = new Map(this.#variables);
      copy.#variables.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#variables) {
        const mappings: any = {};
        this.#variables.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
 * @methodName addLink
 */
export function withLinks<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #links?: Map<string, OpenApiLink>;
    addLink(name: string, val: OpenApiLink) {
      const copy: this = Object.create(this);
      copy.#links = new Map(this.#links);
      copy.#links.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#links) {
        const mappings: any = {};
        this.#links.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
    #server?: OpenApiServer;
    addServer(val: OpenApiServer) {
      const copy: this = Object.create(this);
      copy.#server = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#server) {
        Object.defineProperty(json, "server", {
          value: this.#server.toJSON(),
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
 * @methodName addCallback
 */
export function withCallbacks<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #callbacks?: Map<string, OpenApiCallback>;
    addCallback(name: string, val: OpenApiCallback) {
      const copy: this = Object.create(this);
      copy.#callbacks = new Map(this.#callbacks);
      copy.#callbacks.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#callbacks) {
        const mappings: any = {};
        this.#callbacks.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
 * @methodName addParameterLiteral
 */
export function withParametersPrimitive<TBase extends GConstructor>(
  Base: TBase
) {
  return class extends Base {
    #parameters?: Map<string, string>;
    addParameterLiteral(name: string, val: string) {
      const copy: this = Object.create(this);
      copy.#parameters = new Map(this.#parameters);
      copy.#parameters.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#parameters) {
        const mappings: any = {};
        this.#parameters.forEach((val, key) => {
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
    #requestBody?: string;
    addRequestBodyLiteral(val: string) {
      const copy: this = Object.create(this);
      copy.#requestBody = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#requestBody !== undefined) {
        Object.defineProperty(json, "requestBody", {
          value: this.#requestBody,
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
    #requestBody?: OpenApiRequestBody;
    addRequestBody(val: OpenApiRequestBody) {
      const copy: this = Object.create(this);
      copy.#requestBody = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#requestBody) {
        Object.defineProperty(json, "requestBody", {
          value: this.#requestBody.toJSON(),
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
 * @methodName addResponse
 */
export function withResponses<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #response?: Map<OpenApiHTTPStatusCode, OpenApiResponse>;
    addResponse(name: OpenApiHTTPStatusCode, val: OpenApiResponse) {
      const copy: this = Object.create(this);
      copy.#response = new Map(this.#response);
      copy.#response.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#response) {
        this.#response.forEach((val, key) => {
          Object.defineProperty(json, key, {
            value: val.toJSON(),
            enumerable: true,
          });
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
    #method?: Map<OpenApiHTTPMethod, OpenApiOperation>;
    addMethod(name: OpenApiHTTPMethod, val: OpenApiOperation) {
      const copy: this = Object.create(this);
      copy.#method = new Map(this.#method);
      copy.#method.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#method) {
        this.#method.forEach((val, key) => {
          Object.defineProperty(json, key, {
            value: val.toJSON(),
            enumerable: true,
          });
        });
      }
      return json;
    }
  };
}

/**
 * @fieldType Map<string,OpenApiPathItem>
 * @serializedName endpoint
 * @methodName addEndpoint
 */
export function withPath<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #endpoint?: Map<string, OpenApiPathItem>;
    addEndpoint(name: string, val: OpenApiPathItem) {
      const copy: this = Object.create(this);
      copy.#endpoint = new Map(this.#endpoint);
      copy.#endpoint.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#endpoint) {
        this.#endpoint.forEach((val, key) => {
          Object.defineProperty(json, key, {
            value: val.toJSON(),
            enumerable: true,
          });
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
      #parameters?: T[];
      addParameters(val: T[]) {
        const copy: this = Object.create(this);
        copy.#parameters = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#parameters !== undefined) {
          Object.defineProperty(json, "parameters", {
            value: this.#parameters.map(val => val.toJSON()),
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
      #security?: T[];
      addSecurity(val: T[]) {
        const copy: this = Object.create(this);
        copy.#security = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#security !== undefined) {
          Object.defineProperty(json, "security", {
            value: this.#security.map(val => val.toJSON()),
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
      #servers?: T[];
      addServers(val: T[]) {
        const copy: this = Object.create(this);
        copy.#servers = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#servers !== undefined) {
          Object.defineProperty(json, "servers", {
            value: this.#servers.map(val => val.toJSON()),
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
      #tags?: T[];
      addTags(val: T[]) {
        const copy: this = Object.create(this);
        copy.#tags = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#tags !== undefined) {
          Object.defineProperty(json, "tags", {
            value: this.#tags,
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
      #required?: T[];
      addRequired(val: T[]) {
        const copy: this = Object.create(this);
        copy.#required = val;
        return copy;
      }
      toJSON() {
        const json = super.toJSON();
        if (this.#required !== undefined) {
          Object.defineProperty(json, "required", {
            value: this.#required,
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
    #additionalProperties?: boolean;
    additionalProperties() {
      const copy: this = Object.create(this);
      copy.#additionalProperties = true;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#additionalProperties !== undefined) {
        Object.defineProperty(json, "additionalProperties", {
          value: this.#additionalProperties,
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
    #field?: Map<string, string[]>;
    addSecurityRequirement(name: string, val: Array<string>) {
      const copy: this = Object.create(this);
      copy.#field = new Map(this.#field);
      copy.#field.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#field !== undefined) {
        this.#field.forEach((val, key) => {
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
    #openapi?: string;
    addOpenApiVersion(val: string) {
      const copy: this = Object.create(this);
      copy.#openapi = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#openapi !== undefined) {
        Object.defineProperty(json, "openapi", {
          value: this.#openapi,
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
    #termsOfService?: string;
    addTermsOfService(val: string) {
      const copy: this = Object.create(this);
      copy.#termsOfService = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#termsOfService !== undefined) {
        Object.defineProperty(json, "termsOfService", {
          value: this.#termsOfService,
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
    #jsonSchemaDialect?: string;
    addJsonSchemaDialect(val: string) {
      const copy: this = Object.create(this);
      copy.#jsonSchemaDialect = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#jsonSchemaDialect !== undefined) {
        Object.defineProperty(json, "jsonSchemaDialect", {
          value: this.#jsonSchemaDialect,
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
    #email?: string;
    addEmail(val: string) {
      const copy: this = Object.create(this);
      copy.#email = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#email !== undefined) {
        Object.defineProperty(json, "email", {
          value: this.#email,
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
    #identifier?: string;
    addIdentifier(val: string) {
      const copy: this = Object.create(this);
      copy.#identifier = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#identifier !== undefined) {
        Object.defineProperty(json, "identifier", {
          value: this.#identifier,
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
    #info?: OpenApiInfo;
    addInfo(val: OpenApiInfo) {
      const copy: this = Object.create(this);
      copy.#info = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#info) {
        Object.defineProperty(json, "info", {
          value: this.#info.toJSON(),
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
    #paths?: OpenApiPath;
    addPaths(val: OpenApiPath) {
      const copy: this = Object.create(this);
      copy.#paths = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#paths) {
        Object.defineProperty(json, "paths", {
          value: this.#paths.toJSON(),
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
    #contact?: OpenApiContact;
    addContact(val: OpenApiContact) {
      const copy: this = Object.create(this);
      copy.#contact = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#contact) {
        Object.defineProperty(json, "contact", {
          value: this.#contact.toJSON(),
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
    #responses?: OpenApiResponses;
    addResponses(val: OpenApiResponses) {
      const copy: this = Object.create(this);
      copy.#responses = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#responses) {
        Object.defineProperty(json, "responses", {
          value: this.#responses.toJSON(),
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
    #license?: OpenApiLicense;
    addLicense(val: OpenApiLicense) {
      const copy: this = Object.create(this);
      copy.#license = val;
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#license) {
        Object.defineProperty(json, "license", {
          value: this.#license.toJSON(),
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
 * @methodName addWebhook
 */
export function withWebhooks<TBase extends GConstructor>(Base: TBase) {
  return class extends Base {
    #webhooks?: Map<string, OpenApiPathItem>;
    addWebhook(name: string, val: OpenApiPathItem) {
      const copy: this = Object.create(this);
      copy.#webhooks = new Map(this.#webhooks);
      copy.#webhooks.set(name, val);
      return copy;
    }
    toJSON() {
      const json = super.toJSON();
      if (this.#webhooks) {
        const mappings: any = {};
        this.#webhooks.forEach((val, key) => {
          mappings[key] = val.toJSON();
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
