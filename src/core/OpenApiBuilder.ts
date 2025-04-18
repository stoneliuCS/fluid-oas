import type { OperatorVisitor, OperatorParams } from "./OpenApiOperator";

/**
 * The ApiBuilder defines a fluent interface for creating a complete TypeSafe
 * REST API by expressing schema's in an OPENAPI interface.
 */
export class OpenApiBuilder {

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
