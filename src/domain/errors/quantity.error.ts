export class QuantityError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "QuantityError";
  }
}
