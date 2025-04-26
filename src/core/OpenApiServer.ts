import { BadPathError } from "../lib/error";
import { deepFreeze } from "../lib/freeze";
import { isValidUri } from "../lib/url";

class OpenApiServerVariable {
  private readonly fn: (variable: OpenApiServerVariable) => OpenApiServer;
  private readonly default: string;
  private readonly enum?: Set<string>;
  private readonly description?: string;

  public constructor(
    fn: (variable: OpenApiServerVariable) => OpenApiServer,
    _default: string,
    _enum?: Set<string>,
    description?: string,
  ) {
    this.fn = fn;
    this.default = _default;
    this.enum = _enum;
    this.description = description;
    deepFreeze(this);
  }

  public addDescription(description: string) {
    return new OpenApiServerVariable(
      this.fn,
      this.default,
      this.enum,
      description,
    );
  }

  public addEnum(_enum: string) {
    let enums: Set<string>;
    if (!this.enum) {
      enums = new Set();
      enums.add(_enum);
    } else {
      const copy = new Set(this.enum);
      copy.add(_enum);
      enums = copy;
    }
    return new OpenApiServerVariable(
      this.fn,
      this.default,
      enums,
      this.description,
    );
  }

  public endServerVariable() {
    return this.fn(this);
  }
}

export class OpenApiServer {
  private readonly uri: string;
  private readonly description?: string;
  private readonly variables?: Map<string, OpenApiServerVariable>;

  public static create(uri: string) {
    return new OpenApiServer(uri);
  }

  private constructor(
    uri: string,
    description?: string,
    variables?: Map<string, OpenApiServerVariable>,
  ) {
    if (!isValidUri(uri))
      throw new BadPathError("Invalid Server Uri provided.");
    this.uri = uri;
    if (description) {
      this.description = description;
    }
    if (variables) {
      this.variables = variables;
    }
    deepFreeze(this);
  }

  public addServerVariable(name: string) {
    const _fn = (variable: OpenApiServerVariable) => {
      let variables: Map<string, OpenApiServerVariable>;
      if (!this.variables) {
        variables = new Map();
        variables.set(name, variable);
      } else {
        const variablesCopy = new Map(this.variables);
        variablesCopy.set(name, variable);
        variables = variablesCopy;
      }
      return new OpenApiServer(this.uri, this.description, variables);
    };
    return {
      addDefault: (_default: string) => {
        return new OpenApiServerVariable(_fn, _default);
      },
    };
  }

  public addDescription(description: string) {
    return new OpenApiServer(this.uri, description, this.variables);
  }

  public getJSON() {
    const json = {}
    return json;
  }
}
