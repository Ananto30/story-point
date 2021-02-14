<script>
  import { fade } from 'svelte/transition'
  import { roomConfig } from './store.js'

  export let socket
  export let showConfig
  let ps

  function onChange(event) {
    ps = event.currentTarget.value
  }

  function submit() {
    $roomConfig.pointingSystem = ps
    socket.emit('roomConfigChange', $roomConfig)
    showConfig = false
  }
</script>

<style>
  h5 {
    font-weight: 600;
  }
</style>

<div
  in:fade
  class="uk-card uk-card-default uk-card-body uk-width-1-4@s uk-align-center">
  <h5>Room Configuration</h5>
  <form class="uk-form-stacked">
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-text">
        Pointing system
      </label>
      <div class="uk-form-controls">
        <select
          class="uk-select"
          bind:value={$roomConfig.pointingSystem}
          on:blur={onChange}>
          {#each $roomConfig.allowedPointingSystem as ps}
            <option value={ps}>{ps}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="form-stacked-text">
        Pointing time (in seconds)
      </label>
      <div class="uk-form-controls">
        <input
          class="uk-input"
          id="form-stacked-text"
          type="number"
          bind:value={$roomConfig.maxTimerSeconds} />
      </div>
    </div>
    <div class="uk-margin">
      <button
        class="uk-button uk-width-1-1 uk-button-default uk-button-small"
        on:click|preventDefault={submit}>
        Save
      </button>
    </div>
  </form>
</div>
