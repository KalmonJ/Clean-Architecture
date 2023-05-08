export class InvalidPhoneNumberError extends Error {
  super() {
    this.message = "Invalid phone number";
    this.name = "InvalidPhoneNumberError";
  }
}
