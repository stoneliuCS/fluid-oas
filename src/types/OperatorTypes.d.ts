export type OperatorParams = MetadataParams | RouteParams | SchemaParams;

export interface OperatorVisitor<OperatorParams> {
  operate(builder: OpenApiBuilder): OpenApiBuilder;
  with<K extends keyof OperatorParams>(
    key: K,
    val: OperatorParams[K],
  ): OperatorVisitor<OperatorParams>;
}

export interface MetadataParams {
  readonly openApiVersion: OpenApiVersions;
  readonly info: OpenApiInfo;
}

export interface RouteParams {
  readonly apiRoute: string;
  readonly type: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
}

export interface SchemaParams {}
