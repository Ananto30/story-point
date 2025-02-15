<script lang="ts">
	import { fade } from 'svelte/transition';

	export let users: string[] = [];

	function getAvatarUrl(user: string): string {
		return `https://api.dicebear.com/9.x/lorelei/svg?seed=${user}`;
	}
</script>

<div class="bg-white shadow-md rounded-xl p-6 w-full flex flex-col gap-4">
	<h5 class="font-semibold text-gray-900">Users in the room</h5>
	<ul class="space-y-4">
		{#each users as user}
			<li transition:fade class="flex items-center space-x-4">
				<img src={getAvatarUrl(user)} alt="Avatar" class="w-10 h-10 rounded-full" />
				<span class="text-gray-700">{user}</span>
			</li>
		{:else}
			<li transition:fade class="text-gray-400 text-sm">No users</li>
		{/each}
	</ul>
</div>
