export class UserNotFound extends Error {
  super(message: "User not found!") {
    this.name = "UserNotFound";
    this.message = message;
  }
}
