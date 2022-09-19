export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  BAD_GATEWAY = 502,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  CONFLICT = 409,
}

export class ApiError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

  }
}
