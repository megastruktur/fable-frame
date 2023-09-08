<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import LogoutButton from "./LogoutButton.svelte";
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<h2 class="h2 p-4">Navigation</h2>
	<hr />

	<ul class="mt-3">
		<li><a on:click={drawerClose} href="/">Homepage</a></li>
		<li><a on:click={drawerClose} href="/news">News</a></li>

		{#if $currentUser}
		<li><a on:click={drawerClose} href="/characters">Characters</a></li>
		<li><a on:click={drawerClose} class="mb-3" href="/campaigns">My Campaigns</a></li>
		<li><a on:click={drawerClose} class="btn variant-filled-success" href="/characters/create">Create Character</a></li>
		<li><LogoutButton /></li>
		{:else}
			<li><a on:click={drawerClose} class="btn variant-filled-success" href="/login">Login</a></li>
		{/if}
	</ul>
</nav>
