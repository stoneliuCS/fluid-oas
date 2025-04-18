type OpenApiVersions = "3.0" | "3.1";

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

interface RouteParams {
  readonly apiRoute: string;
  readonly type: "POST" | "PUT" | "PATCH" | "GET" | "DELETE";
}

interface SchemaParams {}

interface OpenApiInfo {
  readonly title: string;
  readonly version: string;
  readonly summary?: string;
  readonly description?: string;
  readonly termsOfService?: string; //TODO: Make this validate valid URIs
  readonly contact?: OpenApiContact;
  readonly license?: OpenApiLicense;
}

interface OpenApiContact {
  readonly name: string;
  readonly url: string; //TODO: Same here
  readonly email: string;
}

interface OpenApiLicense {
  readonly name: string;
  readonly identifier?: string;
  readonly url?: string; //TODO: Same here
}
