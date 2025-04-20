import type { OpenApiServer } from "../types/OpenApiBuilderTypes";
import type { OpenApiMetadata } from "./OpenApiMetadata";

export class OpenApiRoute {
  private readonly url: string;
  private readonly metadata?: OpenApiMetadata;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly servers?: OpenApiServer[];

  public constructor(
    url: string,
    metadata?: OpenApiMetadata,
    summary?: string,
    description?: string,
    servers?: OpenApiServer[],
  ) {
    //TODO: Verify that this url is in valid string form.
    this.url = url;
    if (metadata) {
      this.metadata = metadata;
    }
    if (summary) {
      this.summary = summary;
    }
    if (description) {
      this.description = description;
    }
    if (servers) {
      this.servers = servers;
    }
  }
}
