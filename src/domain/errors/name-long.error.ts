export class NameLongError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NameLongError";
    this.message = message || "This name is too long!";
  }
}
