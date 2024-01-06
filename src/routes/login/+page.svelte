<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let username = '';
	let password = '';

	export let form: ActionData;
</script>

<h1>Sign in</h1>

<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" bind:value={username} required /><br />

	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		bind:value={password}
		required /><br />

	<button type="submit" disabled={!username || !password}>Continue</button>
</form>

<a href="/signup">Create account</a>

{#if form?.message}
	<p>{form.message}</p>
{/if}
