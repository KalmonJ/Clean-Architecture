export class NegativePriceError extends Error {
  super(message: "The value must be greater than or equal to zero") {
    this.name = "NegativePriceError";
    this.message = message;
  }
}
