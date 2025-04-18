readonly type OpenApiVersions = "3.1.1";

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
