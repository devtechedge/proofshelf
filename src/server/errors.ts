export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class RoundAlreadyPlayedError extends HttpError {
  constructor() {
    super(409, "This round has already been recorded. Try review mode instead.");
  }
}
