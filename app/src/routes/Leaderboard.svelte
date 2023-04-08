<script>
	import { fade } from 'svelte/transition';
	import { roomConfig } from './store.js';

	/**
	 * @type {any[]}
	 */
	export let leaderboard;

	$: sortedLeaderboard = leaderboard.sort(
		(/** @type {{ point: number; }} */ a, /** @type {{ point: number; }} */ b) => {
			if (roomConfig.pointingSystem === 'Fibonacci series') {
				return a.point - b.point;
			} else {
				return tShirtPointing.indexOf(a.point) - tShirtPointing.indexOf(b.point);
			}
		}
	);
</script>

<div
	in:fade
	id="leaderboard"
	class="uk-card uk-card-default uk-card-body uk-width-2-3@s uk-align-center"
>
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
							<td>{user.point ? user.point : 'Not voted'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="uk-position-center">Empty...</p>
		{/if}
	</div>
</div>

<style>
	h5 {
		font-weight: 600;
	}
</style>
