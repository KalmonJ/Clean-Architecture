export class InvalidCredentials extends Error {
  super(message: "Invalid email or password") {
    this.name = "InvalidCredentials";
    this.message = message;
  }
}
