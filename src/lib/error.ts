export class BadPathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadPathError";
    Object.setPrototypeOf(this, BadPathError.prototype);
  }
}

export class PropertyNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenApiPropertyNotFound";
    Object.setPrototypeOf(this, PropertyNotFound.prototype);
  }
}
