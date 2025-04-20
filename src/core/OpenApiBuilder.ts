import type { OpenApiMetadata } from "./OpenApiMetadata";

export class OpenApiBuilder {

  private readonly metadata : OpenApiMetadata;

  public constructor(metadata : OpenApiMetadata) {
    this.metadata = metadata;
  }

  public toZod(visitor : unknown ) {
    this.metadata.toZod(visitor)
  }

  public toOpenApi() {
    this.metadata.toOpenApiSpecification();
  }
}
