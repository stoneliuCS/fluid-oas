import type { OpenApiMetadata } from "./OpenApiMetadata";

export class OpenApiBuilder {

  private readonly metadata : OpenApiMetadata;

  public constructor(metadata : OpenApiMetadata) {
    this.metadata = metadata;
  }

  public toZod() {
    throw new Error("Not Supported Yet.")
  }

  public toOpenApi() {
    throw new Error("Not Supported Yet.")
  }
}
