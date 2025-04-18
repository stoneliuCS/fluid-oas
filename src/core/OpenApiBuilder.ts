import type {
  OperatorVisitor,
  OperatorParams,
  MetadataParams,
} from "./OpenApiBuilderTypes";

/**
 * OpenApiBuilder is a completely functional DSL for creating elegant OpenAPI definitions in pure TypeScript.
 */
export class OpenApiBuilder {
  public readonly metadata?: Partial<MetadataParams>;

  public constructor(metadata?: Partial<MetadataParams>) {
    if (this.metadata) {
      Object.assign(this.metadata, metadata);
    } else {
      this.metadata = metadata;
    }
  }

  /**
   * Adds the specified OPENAPI schema, metadata, or route to this OpenAPIBuilder
   */
  public accept(operator: OperatorVisitor<OperatorParams>): OpenApiBuilder {
    return operator.operate(this);
  }

  /**
   * Generates a fully fledged OpenApi Documentation from this OpenApiBuilder.
   */
  public toOpenApiDocument(route: string): void {}

  /**
   * Generates complete Zod validation schemas based off this OpenApiBuilder.
   */
  public toZodTypes(route: string): void {}
}
