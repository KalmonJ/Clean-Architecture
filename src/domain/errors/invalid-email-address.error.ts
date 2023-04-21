export class InvalidEmailAddressError extends Error {
  super(message: "Invalid email address!") {
    this.message = message;
    this.name = "InvalidEmailAddressError";
  }
}
