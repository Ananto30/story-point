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
  <p>Use this app to vote without being biased. Steps -</p>
  <ul class="uk-list uk-list-decimal">
    <li>Create a room.</li>
    <li>Share the room name with fellows.</li>
    <li>Start voting and see the results after the timer.</li>
  </ul>
  <p>
    <i>
      <b>To create a room, just join a room with your preffered room name</b>
      . (Please try to make unique room name or you will be an intruder 🥷)
    </i>
  </p>
  <h3 class="uk-card-title uk-text-center">Join a room</h3>
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
