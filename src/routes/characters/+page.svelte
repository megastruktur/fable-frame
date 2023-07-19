<!-- Characters Page -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	import type { CharactersResponse } from '$lib/pocketbase-types';
	import { getAllCharacters } from '$models/character';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	const getMyCharactersPromise = getAllCharacters({
		expand: 'rpgSystem'
	})
	function getCharacterAvatar(dbRecord: CharactersResponse) {
		if (dbRecord.avatar)
			return pb.files.getUrl(dbRecord, dbRecord.avatar, { thumb: '100x100' })
		else {
			return ""
		}
	}
</script>

<div class="flex flex-col">

	<h1 class="text-3xl m-auto my-3">Your Characters</h1>
	<hr />
	<br />

	<!-- My Characters section -->
	<div class="flex items-center justify-center">
		{#await getMyCharactersPromise}
			<ProgressRadial value={undefined} />
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
</div>
