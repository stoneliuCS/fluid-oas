export class BadPathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadPathError";
    Object.setPrototypeOf(this, BadPathError.prototype);
  }
}

export class IllegalArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IllegalArgumentError";
    Object.setPrototypeOf(this, PropertyNotFoundError.prototype);
  }
}

export class PropertyNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenApiPropertyNotFoundError";
    Object.setPrototypeOf(this, PropertyNotFoundError.prototype);
  }
}
