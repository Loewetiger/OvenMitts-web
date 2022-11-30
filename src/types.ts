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

export class UserModify {
  username?: string;
  display_name?: string;
  stream_title?: string;
  old_password?: string;
  new_password?: string;
  permissions?: string;

  constructor() {}

  for(username: string) {
    this.username = username;
    return this;
  }

  setDisplayName(display_name: string) {
    this.display_name = display_name;
    return this;
  }

  setStreamTitle(stream_title: string) {
    this.stream_title = stream_title;
    return this;
  }

  setPassword(old_password: string, new_password: string) {
    this.old_password = old_password;
    this.new_password = new_password;
    return this;
  }

  setPermissions(permissions: string) {
    this.permissions = permissions;
    return this;
  }

  toString() {
    return JSON.stringify(this);
  }

  async send() {
    await fetch(BASE_URL.extend("user/update"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: this.toString(),
    });
  }
}

export const BASE_URL = new URLe("__BASE_URL__");
export const WS_URL = new URLe("__WS_URL__");
