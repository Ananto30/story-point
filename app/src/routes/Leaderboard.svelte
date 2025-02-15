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

<div in:fade id="leaderboard" class="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl">
	<h5 class="text-lg font-bold text-gray-800 mb-4">Leaderboard 😐</h5>
	{#if leaderboard.length > 0}
		<table class="min-w-full bg-white">
			<thead>
				<tr>
					<th
						class="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
					>
						#
					</th>
					<th
						class="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
					>
						User
					</th>
					<th
						class="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
					>
						Point
					</th>
				</tr>
			</thead>
			<tbody>
				{#each leaderboard as user, i}
					<tr class="hover:bg-gray-100">
						<td class="py-2 px-4 border-b border-gray-200">{i + 1}</td>
						<td class="py-2 px-4 border-b border-gray-200">{user.name}</td>
						<td class="py-2 px-4 border-b border-gray-200"
							>{user.point ? user.point : 'Not voted'}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p class="text-center text-gray-500">Empty...</p>
	{/if}
</div>
