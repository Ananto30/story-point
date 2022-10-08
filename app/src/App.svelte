<script>
  import Room from "./Room.svelte";
  import RoomJoin from "./RoomJoin.svelte";
  let room;
  let name;
  let socket;
</script>

<div class="uk-container">
  <br />
  <h1 class="uk-heading-line uk-text-center">
    <span>The Story Pointing 🤦‍♂️</span>
  </h1>

  {#if !room}
    <RoomJoin bind:room bind:name bind:socket />
  {:else}
    <Room bind:room bind:name bind:socket />
  {/if}

  <p class="uk-text-center uk-text-meta uk-margin-bottom">
    Made with ❤️ by
    <u>
      <a href="https://github.com/Ananto30">Ananto</a>
    </u>
  </p>
</div>

<style>
  h1 {
    color: #ff4000cb;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 64px;
  }
</style>
