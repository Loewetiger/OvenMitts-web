<script lang="ts">
  import { USER_STORE } from "../stores";
  import Login from "../components/Login.svelte";
  import { logout } from "../lib/dashboard";
  import { updateUser } from "../main";
  import type { User } from "../types";

  let USER: User | null;

  let displayname: string;
  let streamtitle: string;

  USER_STORE.subscribe((val: User | null) => {
    USER = val;
    displayname = val?.display_name;
    streamtitle = val?.stream_title;
  });
</script>

<div class="flex flex-col items-center justify-start h-screen">
  {#if USER}
    <div class="form-control w-full max-w-xs mt-2">
      <label for="display-name" class="label"
        ><span class="label-text">Display Name</span></label
      >
      <input
        id="display-name"
        type="text"
        class="input input-bordered"
        placeholder="Display Name"
        bind:value={displayname}
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label for="stream-title" class="label">
        <span class="label-text">Stream Title</span>
      </label>
      <input
        id="stream-title"
        type="text"
        class="input input-bordered"
        placeholder="Stream Title"
        bind:value={streamtitle}
      />
    </div>
    <div class="pt-4 pb-4 flex flex-row w-full max-w-xs">
      <button
        class="btn btn-primary normal-case"
        disabled={!(
          // check whether the user has changed anything
          (
            displayname !== USER?.display_name ||
            streamtitle !== USER?.stream_title
          )
        )}>Update</button
      >
      <div class="flex-auto" />
      <button
        class="btn btn-neutral normal-case"
        on:click={async () => {
          await logout();
          await updateUser();
        }}>Log out</button
      >
    </div>
    <div class="form-control w-full max-w-xs">
      <label for="stream-key" class="label">
        <span class="label-text">Stream Key</span>
      </label>
      <input
        id="stream-key"
        type="text"
        value={USER.stream_key}
        class="input input-bordered blur-sm hover:blur-none"
        disabled
      />
    </div>
  {:else}
    <div class="m-auto">
      <Login />
    </div>
  {/if}
</div>
