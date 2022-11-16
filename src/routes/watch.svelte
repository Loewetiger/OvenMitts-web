<script lang="ts">
  import OvenPlayer from "ovenplayer";
  import { BASE_URL, WS_URL } from "../types";
  import { onDestroy, onMount } from "svelte";
  import { writable } from "svelte/store";
  import Sidebar from "../components/Sidebar.svelte";
  import { MENU_STORE } from "../stores";

  type Stream = {
    username: string;
    display_name: string;
    title?: string;
  };

  export let params: { id: string | undefined };

  const STORE_VOLUME = localStorage.getItem("ovenmitts");
  export const VOLUME = writable(STORE_VOLUME);
  VOLUME.subscribe((val) => localStorage.setItem("ovenmitts", val));

  let player_element: HTMLDivElement;
  let PLAYER: any | undefined = undefined;
  let INTERVAL: NodeJS.Timer;
  let CURRENT_STREAM: Stream;
  let STREAMS: Stream[] = [];
  let MENU: boolean = false;

  $: if (CURRENT_STREAM) {
    console.log(CURRENT_STREAM);
  }
  $: MENU_STORE.set(MENU);

  MENU_STORE.subscribe((val) => {
    MENU = val;
  });

  onMount(() => {
    // Create a player, if it doesn't exist
    if (!PLAYER) {
      let volume: number, mute: boolean;
      try {
        let vol = JSON.parse(STORE_VOLUME);
        volume = vol.volume;
        mute = vol.muted;
      } catch {
        volume = 50;
        mute = true;
      }
      PLAYER = OvenPlayer.create(player_element, {
        autoStart: true,
        mute: mute,
        volume: volume,
        webrtcConfig: {
          timeoutMaxRetry: 4,
          connectionTimeout: 10000,
        },
      });
    }
    PLAYER.on("volumeChanged", (vol) => {
      VOLUME.set(JSON.stringify(vol));
    });

    // Populate the streams array
    INTERVAL = setInterval(() => {
      updateUsers();
    }, 10000);

    updateUsers().then((streams) => {
      if (params.id) {
        select_stream_callback(streams.find((s) => s.username === params.id));
      }
    });
  });

  onDestroy(() => {
    clearInterval(INTERVAL);
  });

  async function updateUsers(): Promise<Stream[]> {
    let data = fetch(`${BASE_URL}/streams`)
      .then((res) => res.json())
      .then((data) => {
        STREAMS = data;
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return data;
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.code) {
      case "KeyF":
        PLAYER.toggleFullScreen();
        break;
      case "KeyM":
        PLAYER.setMute(!PLAYER.getMute());
        break;
    }
  }

  function setPlayer(username: string) {
    PLAYER?.load([
      {
        type: "webrtc",
        file: `${WS_URL}/${username}`,
      },
    ]);
  }

  function select_stream_callback(event: Stream) {
    CURRENT_STREAM = event;
    MENU = false;
    setPlayer(event.username);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="drawer drawer-mobile">
  <input
    id="sidebar"
    bind:checked={MENU}
    type="checkbox"
    class="drawer-toggle"
  />
  <div class="drawer-content">
    <div>
      <div id="ovenplayer" bind:this={player_element} />
      <h1 class="text-lg p-4 pb-0">
        {CURRENT_STREAM ? CURRENT_STREAM.display_name : ""}
      </h1>
      <h2 class="text-md pb-20 lg:pb-4 p-4 pt-0">
        {CURRENT_STREAM && CURRENT_STREAM.title ? CURRENT_STREAM.title : ""}
      </h2>
    </div>
  </div>

  <div class="drawer-side">
    <label for="sidebar" class="drawer-overlay" />
    <aside class="bg-base-200">
      <div class="w-full lg:w-80">
        {#if STREAMS.length === 0}
          <p class="text-center p-4">Nobody is currently streaming</p>
        {:else}
          <p class="text-base-content p-4 uppercase pb-0">Now streaming</p>
        {/if}
        {#await STREAMS then streams}
          <Sidebar {streams} callback={select_stream_callback} />
        {/await}
      </div>
    </aside>
  </div>
</div>
