<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<h1>Profile</h1>
<p>User id: {data.user.id}</p>
<p>Username: {data.user.username}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>
