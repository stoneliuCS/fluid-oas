import { Base, withDescription, withURL } from "./common";
import { OpenApiServerVariable } from "./OpenApiServerVariable";
import { mapMap } from "./utils";

const ServerBase = withDescription(withURL(Base));

class _OpenApiServer extends ServerBase {
  private _variables?: Map<string, OpenApiServerVariable>;

  serverVariable(name: string) {
    return {
      variable: (variable: OpenApiServerVariable) => {
        const copy: this = Object.create(this);
        copy._variables = new Map(this._variables);
        copy._variables.set(name, variable);
        return copy;
      },
    };
  }

  toJSON(): unknown {
    const json = super.toJSON();

    if (this._variables) {
      Object.defineProperty(json, "variables", {
        enumerable: true,
        value: mapMap(this._variables, (val) => val.toJSON()),
      });
    }
    return json;
  }
}

export const OpenApiServer = () => new _OpenApiServer();
export type OpenApiServer = _OpenApiServer;

OpenApiServer;
