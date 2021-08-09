export class DatabaseError extends Error {
  code = "DatabaseError";

  constructor(message = "Sorry, something went wrong") {
    super(message);
  }
}
