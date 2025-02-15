<script lang="ts">
	export let name: string;
	export let room: string;
	export let socket: any;

	let roomName = '';
	let userName = '';

	function submit() {
		if (!userName || !roomName) return alert('Please enter your name and room name');
		room = roomName;
		name = userName;
		socket = io('', { query: `room=${room}&user=${name}` });
	}
</script>

<div class="h-screen">
	<div class="bg-white shadow-md rounded-2xl p-8 max-w-lg m-auto">
		<h2 class="text-2xl font-bold text-gray-900 text-center">Unbiased Voting</h2>
		<p class="text-gray-600 text-center mt-2">
			Use this app to vote anonymously. Follow these steps:
		</p>
		<ul class="list-decimal list-inside text-gray-700 mt-4 space-y-1">
			<li>Create a room.</li>
			<li>Share the room name with others.</li>
			<li>Start voting and view results after the timer.</li>
		</ul>

		<div class="mt-6 p-4 bg-gray-100 rounded-lg">
			<h3 class="text-lg font-semibold text-gray-800">Create a Room</h3>
			<p class="text-gray-600 text-sm mt-1">Enter a unique room name to avoid intrusions 🥷</p>
		</div>

		<h3 class="text-xl font-bold text-gray-900 text-center mt-6">Join a Room</h3>
		<form class="mt-6 space-y-4">
			<input
				class="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none"
				type="text"
				placeholder="Your Name"
				required
				bind:value={userName}
			/>

			<input
				class="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none"
				type="text"
				placeholder="Room Name"
				required
				bind:value={roomName}
			/>

			<button
				type="button"
				class="w-full border hover:bg-gray-800 hover:text-white font-semibold rounded-lg p-3 transition hover:cursor-pointer"
				on:click={submit}
			>
				Join Room
			</button>
		</form>
	</div>
</div>
