<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import LogoutButton from "./LogoutButton.svelte";
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a on:click={drawerClose} href="/">Homepage</a></li>

		{#if $currentUser}
		<li><a on:click={drawerClose} href="/characters">Characters</a></li>
		<li><a on:click={drawerClose} href="/campaigns">Campaigns</a></li>
		<li><a on:click={drawerClose} class="btn variant-filled-success" href="/characters/create">Create Character</a></li>
		<li><LogoutButton /></li>
		{:else}
			<li><a on:click={drawerClose} class="btn variant-filled-success" href="/login">Login</a></li>
		{/if}
	</ul>
</nav>
