<script lang="ts">
  import StreamCard from "./StreamCard.svelte";

  export let streams: {
    username: string;
    display_name: string;
    title?: string;
  }[] = [];
  export let callback;
</script>

<ul class="menu p-4 text-base-content">
  {#each streams as stream}
    <StreamCard {...stream} {callback} />
  {/each}
</ul>
