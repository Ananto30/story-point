<script lang="ts">
	import { fade } from 'svelte/transition';
	import { roomConfig } from './store';
	import RoomConfig from './RoomConfig.svelte';
	import Pointing from './Pointing.svelte';
	import UserList from './UserList.svelte';
	import Leaderboard from './Leaderboard.svelte';
	import type { SocketIO, UserPoint } from './types';

	export let room: string;
	export let name: string;
	export let socket: SocketIO;

	let point: string | number = '';
	let timer = 0;
	let showConfig = false;
	let leaderboard: UserPoint[] = [];
	let users: string[] = [];

	let optionMapper = {
		'Fibonacci series': $roomConfig.fibonacciPointing,
		'T-shirt sizing': $roomConfig.tShirtPointing
	};

	socket.on('users', (data: string[]) => {
		users = data;
	});

	socket.on('timer', (data: number) => {
		timer = data;
	});

	socket.on('leaderboard', (data: UserPoint[]) => {
		leaderboard = data;
	});

	socket.on('endSession', () => {
		socket.emit('vote', { name: name, point: point });
		point = '';
		setTimeout(() => {
			let element = document.querySelector('#leaderboard');
			if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}, 1000);
	});

	function startSession() {
		socket.emit('startSession', undefined);
	}
</script>

<div in:fade class="flex w-full justify-between items-start gap-6 py-6">
	<!-- left -->
	<div class="w-full max-w-xs flex flex-col gap-6">
		<div class="bg-white shadow-md rounded-xl p-6 w-full flex flex-col gap-2">
			<h4 class="text-md font-semibold text-gray-800">Room</h4>
			<div class="text-orange-600 text-xl font-semibold">
				{room}
			</div>
		</div>
		{#if timer === 0}
			<RoomConfig bind:socket bind:showConfig />
		{/if}
	</div>

	<!-- middle -->
	<div class="w-full flex flex-col gap-6">
		<div class="bg-white shadow-md rounded-xl p-8 w-full max-w-3xl flex flex-col gap-6 mx-auto">
			{#if timer === 0}
				<div in:fade class="p-4 bg-gray-100 rounded-lg flex flex-col gap-4">
					<p class="text-gray-700 leading-relaxed">
						In this room, you and your fellow co-workers can vote on a single story and view
						everyone's points below. 👇
					</p>
					<p class="text-gray-700 leading-relaxed">
						If you click <b>Start</b>, all members will be taken to the voting menu.
						<b>Make sure they are ready before you press start!</b>
					</p>
				</div>
				<div class="p-4 bg-green-100 rounded-lg">
					<p class="">
						You have <b>{$roomConfig.maxTimerSeconds} seconds</b> to vote using the
						<b>{$roomConfig.pointingSystem}</b> system.
					</p>
				</div>
				<button
					class="bg-white border hover:bg-gray-800 hover:text-white font-semibold py-2 px-4 rounded-lg transition hover:cursor-pointer"
					on:click={startSession}
				>
					Start Voting Session
				</button>
			{:else}
				<Pointing bind:point bind:timer bind:optionMapper />
			{/if}
		</div>

		{#if timer === 0 && leaderboard.length > 0}
			<Leaderboard bind:leaderboard />
		{/if}
	</div>

	<!-- right -->
	<div class="w-full max-w-sm">
		<UserList bind:users />
	</div>
</div>
