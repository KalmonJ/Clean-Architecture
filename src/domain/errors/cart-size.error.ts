export class CartSizeError extends Error {
  super(message: "The car must have a maximo of 10 items") {
    this.name = "CartSizeError";
    this.message = message;
  }
}
