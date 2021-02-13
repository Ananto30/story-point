<script>
  export let leaderboard
</script>

<style>
  h5 {
    font-weight: 600;
  }
</style>

<div
  class="uk-card uk-card-default uk-card-body uk-width-2-3@s uk-align-center">
  <div>
    <h5>Pointing Leader Board 😐</h5>
    <hr />
    {#if leaderboard.length > 0}
      <table class="uk-table uk-table-small uk-table-divider">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          {#each leaderboard as user, i}
            <tr>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.point}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="uk-position-center">Empty...</p>
    {/if}
  </div>
</div>
