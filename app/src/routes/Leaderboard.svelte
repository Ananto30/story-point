<script lang="ts">
	import { fade } from 'svelte/transition';
	import { roomConfig } from './store.js';
	import type { UserPoint } from './types';

	export let leaderboard: UserPoint[];

	$: leaderboard.sort((a: UserPoint, b: UserPoint) => {
		if (
			$roomConfig.pointingSystem === 'Fibonacci series' &&
			typeof a.point === 'number' &&
			typeof b.point === 'number'
		) {
			return a.point - b.point;
		} else if (
			$roomConfig.pointingSystem === 'T-shirt sizing' &&
			typeof a.point === 'string' &&
			typeof b.point === 'string'
		) {
			return (
				$roomConfig.tShirtPointing.indexOf(a.point) - $roomConfig.tShirtPointing.indexOf(b.point)
			);
		} else {
			return 0;
		}
	});
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
