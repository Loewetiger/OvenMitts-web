import { BASE_URL, RegisterOutcome } from "../types";
import { LoginOutcome } from "../types";

export function validUsername(username: string): boolean {
  const RE = new RegExp("^[a-zA-Z0-9_]{4,25}$");
  return RE.test(username);
}

interface creds {
  username: string;
  password: string;
}

export async function login(creds: creds): Promise<LoginOutcome> {
  let res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  switch (res.status) {
    case 200:
      return LoginOutcome.Sucess;
    case 401:
      return LoginOutcome.InvalidCredentials;
    case 404:
      return LoginOutcome.NotFound;
    default:
      return LoginOutcome.ServerError;
  }
}

export async function register(creds: creds): Promise<RegisterOutcome> {
  let res = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    body: JSON.stringify(creds),
  });

  switch (res.status) {
    case 200:
      return RegisterOutcome.Sucess;
    case 409:
      return RegisterOutcome.UsernameTaken;
    case 400:
      return RegisterOutcome.InvalidUsername;
    default:
      return RegisterOutcome.ServerError;
  }
}

export async function logout() {
  await fetch(`${BASE_URL}/user/logout`, {
    method: "POST",
    credentials: "same-origin",
  });
}
