<script lang="ts">
  export let username: string;
  export let display_name: string;
  export let title: string | undefined = undefined;

  export let callback;

  function handleStreamClick(username: string) {
    window.location.href = "#/" + username;
    callback({ username: username, display_name: display_name, title: title });
  }
</script>

<li
  on:click={() => handleStreamClick(username)}
  on:keypress={() => handleStreamClick(username)}
>
  <div class="flex-col items-start gap-2">
    <p class="font-semibold truncate">{display_name}</p>
    {#if title}
      <p class="font-light truncate">{title}</p>
    {/if}
  </div>
</li>
