<!-- Characters Page -->
<script lang="ts">
	import CharacterCard from '$lib/components/CharacterCard.svelte';
	import { getAllCharacters } from '$models/character';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	const getMyCharactersPromise = getAllCharacters({
		expand: 'rpgSystem'
	})
</script>

<div class="flex flex-col">

	<h1 class="text-3xl m-auto my-3">Your Characters</h1>
	<hr />
	<br />

	<!-- My Characters section -->
	<div class="flex items-center justify-center flex-wrap">
		{#await getMyCharactersPromise}
			<ProgressRadial value={undefined} />
		{:then myCharacters} 
			{#each myCharacters as character}
			<CharacterCard {character} />
			{/each}
		{/await}
	</div>
</div>
