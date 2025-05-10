import { OpenApiSchemaClass } from "./OpenApiSchema";

class _OpenApiInteger extends OpenApiSchemaClass {
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
    const json = super.toJSON();
    Object.defineProperty(json, "type", {
      value: this._type,
      enumerable: true,
    });
    if (this._minimum) {
      Object.defineProperty(json, "minimum", {
        value: this._minimum,
        enumerable: true,
      });
    }
    if (this._maximum) {
      Object.defineProperty(json, "maximum", {
        value: this._maximum,
        enumerable: true,
      });
    }
    if (this._exclusiveMin) {
      Object.defineProperty(json, "exclusiveMinimum", {
        value: this._exclusiveMin,
        enumerable: true,
      });
    }

    if (this._exclusiveMax) {
      Object.defineProperty(json, "exclusiveMaximum", {
        value: this._exclusiveMax,
        enumerable: true,
      });
    }

    if (this._multipleOf) {
      Object.defineProperty(json, "multipleOf", {
        value: this._multipleOf,
        enumerable: true,
      });
    }

    if (this._format) {
      Object.defineProperty(json, "format", {
        value: this._format,
        enumerable: true,
      });
    }
    return json;
  }
}

export const OpenApiInteger = new _OpenApiInteger();
export type OpenApiInteger = typeof OpenApiInteger;
