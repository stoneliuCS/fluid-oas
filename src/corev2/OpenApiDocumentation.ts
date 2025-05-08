import type { OpenApiSchema } from "../core/schema/OpenApiSchema";
import { OpenApiCommonBuilder } from "./OpenApiBuilder";

class _OpenApiDocumentation {
  private constructor(
    private readonly _url: string,
    private readonly _extensions: Map<string, OpenApiSchema>,
    private readonly _description?: string,
  ) {
    this._url = _url;
    this._extensions = _extensions;
    this._description = _description;
  }

  /**
   * Begins the process of creating an OpenApiDocumentation
   * @param url - Required URL to the Documentation.
   * @returns OpenApiDocumentationBuilder
   */
  static create(url: string) {
    return new OpenApiDocumentationBuilder(
      (extensions: Map<string, OpenApiSchema>, description?: string) => {
        return new _OpenApiDocumentation(url, extensions, description);
      },
    );
  }

  toJSON(): unknown {
    const json = {};
    Object.defineProperty(json, "url", { value: this._url });

    if (this._description) {
      Object.defineProperty(json, "description", { value: this._description });
    }

    for (let [key, val] of this._extensions.entries()) {
      Object.defineProperty(json, key, { value: val.toJSON() });
    }
    return json;
  }
}

class OpenApiDocumentationBuilder extends OpenApiCommonBuilder<_OpenApiDocumentation> {
  private _description?: string;

  constructor(
    private builder: (
      extensions: Map<string, OpenApiSchema>,
      description?: string,
    ) => _OpenApiDocumentation,
  ) {
    super();
  }

  public description(description: string) {
    this._description = description;
    return this;
  }

  public build() {
    return this.builder(this._extensions, this._description);
  }
}

export const CreateOpenApiDocumentation = _OpenApiDocumentation.create;
export type OpenApiDocumentation = _OpenApiDocumentation;
