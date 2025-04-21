export class BadPathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadPathError";
    Object.setPrototypeOf(this, BadPathError.prototype);
  }
}

export class MetadataNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenApiMetadataNotFound";
    Object.setPrototypeOf(this, MetadataNotFound.prototype);
  }
}
