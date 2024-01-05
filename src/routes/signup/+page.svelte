<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<button>Continue</button>
</form>
<a href="/login">login</a>

{#if form?.message}
	<p>{form.message}</p>
{/if}
