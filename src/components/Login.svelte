<script lang="ts">
  import { LoginOutcome, RegisterOutcome } from "../types";
  import { login, register, validUsername } from "../lib/dashboard";
  import { updateUser } from "../main";

  enum Mode {
    LOGIN,
    REGISTER,
  }

  let MODE: Mode = Mode.LOGIN;
  let VALID_USERNAME: boolean = false;

  $: VALID_USERNAME = MODE === Mode.LOGIN || validUsername(username);

  let username: string;
  let password: string;

  async function handleSubmit() {
    switch (MODE) {
      case Mode.LOGIN: {
        let status = await login({ username, password });
        switch (status) {
          case LoginOutcome.Sucess:
            updateUser();
            break;
          case LoginOutcome.NotFound:
            MODE = Mode.REGISTER;
            break;
        }
        break;
      }
      case Mode.REGISTER: {
        let status = await register({ username, password });
        switch (status) {
          case RegisterOutcome.Sucess:
            MODE = Mode.LOGIN;
            handleSubmit();
            break;
        }
      }
    }
  }
</script>

<div class="flex flex-col gap-4 bg-base-200 rounded-box p-4">
  <div class="tabs tabs-boxed">
    <button
      class="tab {MODE === Mode.LOGIN ? 'tab-active' : ''}"
      on:click={() => (MODE = Mode.LOGIN)}>Login</button
    >
    <button
      class="tab {MODE === Mode.REGISTER ? 'tab-active' : ''}"
      on:click={() => (MODE = Mode.REGISTER)}>Register</button
    >
  </div>
  <input
    type="text"
    class="input input-bordered {!VALID_USERNAME
      ? 'input-error'
      : ''} w-full max-w-xs"
    placeholder="Username"
    bind:value={username}
  />

  <input
    type="password"
    class="input input-bordered w-full max-w-xs"
    placeholder="Password"
    bind:value={password}
  />
  <button
    class="btn {username && password && VALID_USERNAME
      ? 'btn-primary'
      : 'btn-disabled'}"
    on:click={handleSubmit}>Submit</button
  >
</div>
