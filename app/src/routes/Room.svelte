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

<div in:fade class="uk-flex uk-flex-wrap uk-flex-wrap-stretch uk-flex-around">
	<div class="uk-card uk-card-default uk-card-body uk-width-2-3@s uk-align-center">
		<h4 class="uk-text-center">
			This is room
			<span style="color: #ff4000cb;">{room}</span>
		</h4>

		{#if timer === 0}
			<div in:fade>
				<hr />
				<p>
					In this room, you with your fellow co-workers (who thinks story point should be less than
					1) can point on a single story and then view everyones points (the leaderboard) 👇.
				</p>
				<p>
					If you click `start`, all the people in the room will be taken to the pointing menu,
					<b>so ask them before you press `start`</b>
					.
				</p>
				<p>
					<i>
						In this room you will get
						<b>{$roomConfig.maxTimerSeconds} seconds</b>
						to point the story and the pointing system will be based on
						<b>{$roomConfig.pointingSystem}</b>
						.
					</i>
				</p>
				<hr />

				<h5 class="uk-text-center uk-margin-remove-top">
					To start a voting session, press
					<button class="uk-button uk-button-default" on:click={startSession}> Start! </button>
				</h5>
			</div>
		{:else}
			<Pointing bind:point bind:timer bind:optionMapper />
		{/if}
	</div>

	<UserList bind:users />

	{#if timer === 0}
		<Leaderboard bind:leaderboard />
		<RoomConfig bind:socket bind:showConfig />
	{/if}
</div>

<style>
	h4 {
		font-weight: 800;
	}
	h5 {
		font-weight: 600;
	}
</style>
