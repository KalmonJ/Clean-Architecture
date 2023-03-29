export class InvalidPhoneNumberError extends Error {
  super(message: "Invalid phone number") {
    this.message = message;
    this.name = "InvalidPhoneNumberError";
  }
}
