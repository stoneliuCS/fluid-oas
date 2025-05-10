import type { OpenApiOperation } from "../path/OpenApiOperator";
import { Base, withDescription, withOperationId } from "./common";
import type { OpenApiServer } from "./OpenApiServer";
import { mapMap } from "./utils";

const LinkBase = withOperationId(withDescription(Base));

class _OpenApiLink extends LinkBase {
  private _op?: OpenApiOperation;
  private _parameters?: Map<string, unknown>;
  private _requestBody?: unknown;
  private _server?: OpenApiServer;

  op(op: OpenApiOperation) {
    const copy: this = Object.create(this);
    copy._op = op;
    return copy;
  }

  parameter(name: string) {
    return {
      literal: (literal: unknown) => {
        const copy: this = Object.create(this);
        copy._parameters = new Map(this._parameters);
        copy._parameters.set(name, literal);
        return copy;
      },
    };
  }

  requestBody(literal: string) {
    const copy: this = Object.create(this);
    copy._requestBody = literal;
    return copy;
  }

  server(server: OpenApiServer) {
    const copy: this = Object.create(this);
    copy._server = server;
    return copy;
  }

  toJSON(): unknown {
    const json = super.toJSON();
    if (this._op) {
      // Unsupported for now..
    }

    if (this._parameters) {
      Object.defineProperty(json, "parameters", {
        value: mapMap(this._parameters, (val) => val),
        enumerable: true,
      });
    }

    if (this._requestBody) {
      Object.defineProperty(json, "requestBody", {
        value: this._requestBody,
        enumerable: true,
      });
    }

    if (this._server) {
      Object.defineProperty(json, "server", {
        value: this._server.toJSON(),
        enumerable: true,
      });
    }
    return json;
  }
}

export const OpenApiLink = () => new _OpenApiLink();
export type OpenApiLink = _OpenApiLink;
