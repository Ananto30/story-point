<script>
  export let name
  export let room
  export let socket

  let roomName
  let userName

  function submit() {
    room = roomName
    name = userName
    socket = io('', { query: 'room=' + room + '&user=' + name })
  }
</script>

<div
  class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center">
  <h3 class="uk-card-title">Join a room</h3>
  <p>
    Just enter a room, it doesn't matter which room you enter until you want to
    doom them.
  </p>

  <div class="uk-width-1-2@l uk-align-center">
    <form>
      <div class="uk-margin">
        <input
          class="uk-input "
          type="text"
          placeholder="Your name"
          required
          bind:value={userName} />
      </div>

      <div class="uk-margin">
        <input
          class="uk-input "
          type="text"
          placeholder="Room name"
          required
          bind:value={roomName} />
      </div>

      <div class="uk-margin">
        <button
          class="uk-button uk-width-1-1 uk-button-default"
          on:click={submit}>
          Join
        </button>
      </div>
    </form>
  </div>
</div>
