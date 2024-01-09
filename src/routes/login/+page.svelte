<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let username = '';
	let password = '';

	export let form: ActionData;
</script>

<div class="flex min-h-[100dvh] items-center justify-center bg-zinc-300">
	<div
		class="flex flex-col items-center border bg-white p-10 shadow-lg shadow-zinc-400/50">
		<h1>Sign in</h1>

		<form method="post" use:enhance class="my-2 flex min-w-64 flex-col gap-2">
			<div class="flex flex-col">
				<label for="username" class="text-sm">Username</label>
				<input name="username" id="username" bind:value={username} required />
			</div>

			<div class="flex flex-col">
				<label for="password" class="text-sm">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					bind:value={password}
					required />
			</div>

			<button
				type="submit"
				disabled={!username || !password}
				class="w-full bg-zinc-800 py-2 text-center text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-500"
				>Sign in</button>
		</form>

		<a href="/signup" class="text-sm">Create account</a>

		{#if form?.message}
			<p>{form.message}</p>
		{/if}
	</div>
</div>
