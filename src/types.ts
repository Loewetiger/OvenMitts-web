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

class URLe {
  uri: string;

  constructor(uri: string) {
    this.uri = uri.endsWith("/") ? uri.slice(0, -1) : uri;
  }

  extend(segment: string): string {
    return this.uri + "/" + segment;
  }

  toString() {
    return this.uri;
  }
}

export const BASE_URL = new URLe("__BASE_URL__");
export const WS_URL = new URLe("__WS_URL__");
