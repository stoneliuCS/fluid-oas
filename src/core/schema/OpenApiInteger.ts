import { OpenApiSchema } from "./OpenApiSchema";

class _OpenApiInteger extends OpenApiSchema {
  private readonly _type: string = "integer";
  private _minimum?: number;
  private _maximum?: number;
  private _exclusiveMin?: boolean;
  private _exclusiveMax?: boolean;
  private _multipleOf?: number;
  private _format?: "int32" | "int64";

  min(min: number): this {
    const copy: this = Object.create(this);
    copy._minimum = min;
    return copy;
  }

  max(max: number): this {
    const copy: this = Object.create(this);
    copy._maximum = max;
    return copy;
  }

  exclusiveMin(): this {
    const copy: this = Object.create(this);
    copy._exclusiveMin = true;
    return copy;
  }

  exclusiveMax(): this {
    const copy: this = Object.create(this);
    copy._exclusiveMax = true;
    return copy;
  }

  multipleOf(mutliple: number) {
    const copy: this = Object.create(this);
    copy._multipleOf = mutliple;
    return copy;
  }

  format(format: "int32" | "int64") {
    const copy: this = Object.create(this);
    copy._format = format;
    return copy;
  }

  toJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "type", { value: this._type });
    if (this._minimum) {
      Object.defineProperty(json, "minimum", { value: this._minimum });
    }
    if (this._maximum) {
      Object.defineProperty(json, "maximum", { value: this._maximum });
    }
    if (this._exclusiveMin) {
      Object.defineProperty(json, "exclusiveMinimum", {
        value: this._exclusiveMin,
      });
    }

    if (this._exclusiveMax) {
      Object.defineProperty(json, "exclusiveMaximum", {
        value: this._exclusiveMax,
      });
    }

    if (this._multipleOf) {
      Object.defineProperty(json, "multipleOf", {
        value: this._multipleOf,
      });
    }

    if (this._format) {
      Object.defineProperty(json, "format", {
        value: this._format,
      });
    }
    return json;
  }
}

export const OpenApiInteger = new _OpenApiInteger();
export type OpenApiInteger = typeof OpenApiInteger;
