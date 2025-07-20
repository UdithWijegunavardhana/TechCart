// TODO: improve sagas to use them

export enum ApiRequestStatus {
  NONE = 'NONE',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum HttpCodes {
  REFRESH_TOKEN_ERROR = 400,
  INVALID_TOKEN = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  CONTENT_UNAVAILABLE = 404,
}