export type GConstructor<T = { toJSON(): unknown }> = new (...args: any[]) => T;
export type OpenApiExtensionString = `x-${string}`;
export type OpenApiSchemaOrContent = "schema" | "content";
