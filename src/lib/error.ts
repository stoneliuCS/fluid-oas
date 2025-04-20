export class BadURIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadURIError";
    Object.setPrototypeOf(this, BadURIError.prototype);
  }
}
