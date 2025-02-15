<script lang="ts">
	import { fade } from 'svelte/transition';
	import { roomConfig } from './store';
	import type { SocketIO } from './types';

	export let socket: SocketIO;
	export let showConfig: boolean;

	let ps = $roomConfig.pointingSystem;
	let mt = $roomConfig.maxTimerSeconds;

	let initialPs = ps;
	let initialMt = mt;
	let hasUnsavedChanges = false;

	socket.on('roomConfig', (data) => {
		$roomConfig = data;
		ps = $roomConfig.pointingSystem;
		mt = $roomConfig.maxTimerSeconds;
		initialPs = ps;
		initialMt = mt;
		hasUnsavedChanges = false;
	});

	$: hasUnsavedChanges = ps !== initialPs || mt !== initialMt;

	function updatePointSystem(event: { currentTarget: { value: string } }) {
		ps = event.currentTarget.value;
	}

	function submit() {
		$roomConfig.pointingSystem = ps;
		$roomConfig.maxTimerSeconds = mt;
		socket.emit('roomConfigChange', $roomConfig);
		showConfig = false;
		hasUnsavedChanges = false;
	}
</script>

<div in:fade class="bg-white shadow-md rounded-xl p-6 w-full max-w-80">
	<h5 class="text-md font-semibold text-gray-800 mb-4">Room Configuration</h5>
	<form class="space-y-4">
		<div>
			<label class="block text-sm font-medium text-gray-700" for="pointingSystem">
				Pointing system
			</label>
			<select
				name="pointingSystem"
				class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				bind:value={ps}
				on:change={updatePointSystem}
			>
				{#each $roomConfig.allowedPointingSystem as ps}
					<option value={ps}>{ps}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700" for="pointingTime">
				Pointing time (in seconds)
			</label>
			<input
				name="pointingTime"
				class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				type="number"
				bind:value={mt}
			/>
		</div>
		{#if hasUnsavedChanges}
			<div class="text-red-500 text-sm">You have unsaved changes.</div>
		{/if}
		<div>
			<button
				class="w-full border hover:bg-gray-800 hover:text-white font-semibold py-2 px-4 rounded-lg transition hover:cursor-pointer"
				on:click|preventDefault={submit}
			>
				Save
			</button>
		</div>
	</form>
</div>
