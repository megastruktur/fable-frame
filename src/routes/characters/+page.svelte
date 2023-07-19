<!-- Characters Page -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	import type { CharactersResponse, RpgSystemsResponse } from '$lib/pocketbase-types';
	import { createNewCharacter, getAllCharacters } from '$models/character';
	import { getAllRpgSystems } from '$models/rpg_system';

	const enabledSystemsPromise = getAllRpgSystems({ status: true });
	const getMyCharactersPromise = getAllCharacters({
		creator: currentUser.id,
		expand: 'rpgSystem'
	})
	function getRpgSystemImage(dbRecord: RpgSystemsResponse) {
		return pb.files.getUrl(dbRecord, dbRecord.image, { thumb: '100x100' });
	}
	function getCharacterAvatar(dbRecord: CharactersResponse) {
		if (dbRecord.avatar)
			return pb.files.getUrl(dbRecord, dbRecord.avatar, { thumb: '100x100' })
		else {
			return ""
		}
	}

	async function createAndRedirect(systemId: string) {
		const character = await createNewCharacter(systemId);
		goto('/characters/' + character.id)
	}
</script>

<div class="flex flex-col">

	<h1 class="text-3xl m-auto my-3">Your Characters</h1>
	<hr />
	<br />

	<!-- My Characters section -->
	<div class="flex items-center justify-center">
		{#await getMyCharactersPromise}
			Loading Characters
		{:then myCharacters} 
			{#each myCharacters as character}

			<a href="/characters/{character.id}"
				class="card w-52 card-hover shadow-xl">
				<header>
					{#if character.avatar}
					<img src={getCharacterAvatar(character)} alt={character.name} />
					{/if}
				</header>
				<div class="p-4 space-y-4">
					<h3 class="h3">{character.name}</h3>
					<article>{character.expand.rpgSystem.name}</article>
				</div>
			</a>
			{/each}
		{/await}
	</div>

	<div class="flex items-center justify-center">
		<div class="divider">OR</div>
	</div>

	<!-- Create Character section -->
	<div class="flex items-center justify-center">
		{#await enabledSystemsPromise}
			Loading RPG Systems...
		{:then rpgSystems}
			{#each rpgSystems as rpgSystem}

			<button type="button" on:click={() => createAndRedirect(rpgSystem.id)} class="card w-52 card-hover">
				<header>
					<img class="" src={getRpgSystemImage(rpgSystem)} alt={rpgSystem.name} />
				</header>
				<div class="p-4 space-y-4">
					<h3 class="h3">{rpgSystem.name}</h3>
					<article>{rpgSystem.description}</article>
				</div>
			</button>
			{/each}
		{/await}
	</div>
</div>
