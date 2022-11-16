export interface User {
  id: string;
  username: string;
  display_name: string;
  stream_key: string;
  stream_title?: string;
}

export enum LoginOutcome {
  Sucess,
  InvalidCredentials,
  NotFound,
  ServerError,
}

export enum RegisterOutcome {
  Sucess,
  UsernameTaken,
  InvalidUsername,
  ServerError,
}

export const WS_URL = "__WS_URL__";
export const BASE_URL = "__BASE_URL__";
