export class GreaterThanError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "GreaterThanError";
    this.message = message || "";
  }
}
