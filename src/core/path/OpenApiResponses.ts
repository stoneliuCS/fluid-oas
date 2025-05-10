import { Base, withDefault } from "../common/common";
import { OpenApiResponse } from "./OpenApiResponse";

const ResponsesBase = withDefault(Base)<OpenApiResponse>();
type OpenApiResponseCode = "200";
class _OpenApiResponses extends ResponsesBase {
  private _responses?: Map<OpenApiResponseCode, OpenApiResponse>;
  responses(statusCode: OpenApiResponseCode) {
    return {
      response: (response: OpenApiResponse) => {
        const copy: this = Object.create(this);
        copy._responses = new Map(this._responses);
        copy._responses.set(statusCode, response);
        return copy;
      },
    };
  }

  toJSON(): unknown {
    const json = super.toJSON();

    if (this._responses) {
      for (let [key, val] of this._responses.entries()) {
        Object.defineProperty(json, key, {
          value: val.toJSON(),
          enumerable: true,
        });
      }
    }
    return json;
  }
}

export const OpenApiResponses = () => new _OpenApiResponses();
export type OpenApiResponses = _OpenApiResponses;
