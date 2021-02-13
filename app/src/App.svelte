<script>
  import Room from './Room.svelte'
  import RoomPrompt from './RoomPrompt.svelte'
  let room
  let name
  let socket
</script>

<style>
  h1 {
    color: #ff4000cb;
    text-transform: uppercase;
    /* font-size: 4em; */
    /* font-weight: 100; */
  }
</style>

<div class="uk-container">
  <br />
  <h1 class="uk-heading-line uk-text-center">
    <span>The Story Pointing 🤦‍♂️</span>
  </h1>

  {#if !room}
    <RoomPrompt bind:room bind:name bind:socket />
  {:else}
    <Room bind:room bind:name bind:socket />
  {/if}

</div>
