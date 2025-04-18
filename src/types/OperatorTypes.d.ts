export type OperatorParams = RootParams | RouteParams | SchemaParams;

export interface OperatorVisitor<OperatorParams> {
  operate(builder: OpenApiBuilder): OpenApiBuilder;
  with<K extends keyof OperatorParams>(
    key: K,
    val: OperatorParams[K],
  ): OperatorVisitor<OperatorParams>;
}

export interface RootParams {
  readonly openApiVersion: OpenApiVersions;
  readonly info: OpenApiInfo;
}

export interface RouteParams {
  /**
   * Relative route, path templates are allowed.
   *
   * Usage: "/pets", "/pets/{id}"
   */
  readonly route: string;
  readonly type: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
  readonly description: string;
  readonly summary: string;
}

export interface SchemaParams {}
