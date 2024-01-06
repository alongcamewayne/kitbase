<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	const passwords = ['', ''];
	let username = '';

	$: mismatch = isMismatch(passwords[0], passwords[1]);

	function isMismatch(str1: string, str2: string) {
		if (!str2.length) return false;
		return str1 !== str2;
	}
</script>

<h1>Sign up</h1>

<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" bind:value={username} required /><br />

	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		bind:value={passwords[0]}
		required /><br />

	<label for="confirmation">Confirm Password</label>
	<input
		type="password"
		name="confirmation"
		id="confirmation"
		bind:value={passwords[1]}
		required /><br />
	{#if mismatch}<p>passwords don't match</p>{/if}

	<button disabled={!passwords[1] || mismatch}>Continue</button>
</form>

<a href="/login">login</a>

{#if form?.message}
	<p>{form.message}</p>
{/if}
