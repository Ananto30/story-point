<script lang="ts">
	import Room from './Room.svelte';
	import RoomJoin from './RoomJoin.svelte';
	import type { SocketIO } from './types';

	let room: string;
	let name: string;
	let socket: SocketIO;
</script>

<div class="mx-auto p-8 bg-gray-100 min-h-screen">
	<div class="container mx-auto">
		<h1 class="text-lg font-bold text-gray-800">The Story Pointing 🤦‍♂️</h1>

		<div>
			{#if !room}
				<RoomJoin bind:room bind:name bind:socket />
			{:else}
				<Room bind:room bind:name bind:socket />
			{/if}
		</div>

		<p class="text-gray-500 text-sm bottom-0 right-0 fixed p-4">
			Made with ❤️ by
			<a class="underline" href="https://github.com/Ananto30">Azizul</a>
		</p>
	</div>
</div>
