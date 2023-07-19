<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import LogoutButton from "./LogoutButton.svelte";
</script>

<nav class="list-nav">
	<ul>
		<li><a href="/">Homepage</a></li>

		{#if $currentUser}
		<li><a href="/characters">Characters</a></li>
		<li><a href="/campaigns">Campaigns</a></li>
		<li><a class="btn variant-filled-success" href="/characters/create">Create Character</a></li>
		<li><LogoutButton /></li>
		{:else}
			<li><a href="/login">Login</a></li>
		{/if}
	</ul>
</nav>
