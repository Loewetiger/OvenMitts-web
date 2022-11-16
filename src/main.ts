import "./app.css";
import App from "./App.svelte";
import { USER_STORE } from "./stores";
import { BASE_URL } from "./types";

const app = new App({
  target: document.getElementById("app"),
});

export default app;

export async function updateUser() {
  const response = await fetch(`${BASE_URL}/user`, {
    credentials: "same-origin",
  });
  switch (response.status) {
    case 200:
      let u = await response.json();
      USER_STORE.set(u);
      break;
    default:
      USER_STORE.set(null);
      break;
  }
}
