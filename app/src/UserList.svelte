<script>
  import { fade } from 'svelte/transition'
  export let users
</script>

<style>
  h5 {
    font-weight: 600;
  }
</style>

<div
  class="uk-margin-remove-top uk-card uk-card-default uk-card-body
  uk-width-1-4@s uk-align-center">
  <div>
    <h5>Users in the room</h5>
    <ul class="uk-list uk-list-disc uk-list-primary">
      {#each users as user}
        <li transition:fade>{user}</li>
      {/each}
    </ul>
  </div>
</div>
