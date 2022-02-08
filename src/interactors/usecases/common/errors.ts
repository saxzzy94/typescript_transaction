export class ApplicationError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.constructor.name;
    this.message = message;
  }
}
