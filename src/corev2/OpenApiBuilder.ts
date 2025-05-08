import type { OpenApiSchema } from "../core/schema/OpenApiSchema";

export abstract class OpenApiCommonBuilder<T> {
  protected _extensions: Map<string, OpenApiSchema>;
  protected constructor() {
    this._extensions = new Map();
  }

  public extend(name: string) {
    if (!name.startsWith("x-")) {
      throw new Error();
    }
    return {
      schema: (schema: OpenApiSchema) => {
        this._extensions.set(name, schema);
        return this;
      },
    };
  }

  public abstract build(): T;
}
