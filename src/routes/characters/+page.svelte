<!-- Characters Page -->
<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton';
	import type { CharactersResponse } from '$lib/pocketbase-types';
	import { toastShow } from '$lib/toast';
	import { cloneCharacter, deleteCharacter, getMyCharacters } from '$models/character';
	import { ProgressRadial, type PopupSettings, popup, type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import CharacterItem from '$lib/components/characters/CharacterItem.svelte';
	import { receive, send } from '$lib/animation';
	import { pageName } from '$lib/stores';
	import SearchFilter from '$lib/components/SearchFilter.svelte';
	import SquareCard from '$lib/components/global/SquareCard.svelte';

	pageName.set("Characters")

	const modalStore = getModalStore()
	const toastStore = getToastStore()

	// Async load Characters and store in variable.
	let myCharacters: CharactersResponse[]
	let myCharactersFiltered: CharactersResponse[]

	async function loadMyCharacters() {
		myCharacters = await getMyCharacters({
			expand: 'rpgSystem,campaign'
		})
		myCharactersFiltered = myCharacters
	}

	// Character Operations
	async function cloneSelectedCharacterHandler({detail: {characterId}} : {detail: {characterId: string}} | any) {

		if (characterId !== undefined && characterId !== null) {
			const character = await cloneCharacter(characterId)
	
			toastShow(`Character <span class="text-secondary-100">${character.name}</span> has been cloned`, toastStore)
	
			myCharacters = [...myCharacters, character]
			myCharactersFiltered = myCharacters
		}
	}

  function deleteCharacterPromptHandler({detail: {characterId}} : {detail: {characterId: string}} | any) {

		if (characterId !== undefined && characterId !== null) {
			const character = myCharacters.find(c => c.id === characterId)

			if (character) {
				const modal: ModalSettings = {
					type: 'confirm',
					title: 'Please Confirm',
					body: `Are you sure you want to remove character <span class="text-error-900">${character.name}</span>? This action cannot be undone.`,
					response: async (r: boolean) => {
						if (r === true) {

							await deleteCharacter(character.id)

							toastShow(`Character <span class="text-error-900">${character.name}</span> has been removed`, toastStore)

							// Update reactively so the element refreshes.
							myCharacters = myCharacters.filter(c => c.id!== character.id)
							myCharactersFiltered = myCharacters
						}
					}
				};
				modalStore.trigger(modal);
			}
		}
	}

</script>

<div class="flex flex-col" transition:fade>

	<!-- My Characters section -->
	<div class="flex items-center justify-center flex-wrap">
		{#await loadMyCharacters()}
			<ProgressRadial value={undefined} />
		{:then _}
			<SearchFilter class="mb-6" items={myCharacters} bind:filteredItems={myCharactersFiltered} />
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				{#each myCharactersFiltered as character(character.id)}

					<div
						animate:flip
						in:receive={{ key: character.id }}
						out:send={{ key: character.id }}
						class="flex justify-between items-center relative">

						<a class="card card-hover" href="/characters/{character.id}">
							<CharacterItem
								renderActionButtons={true}
								on:cloneCharacter={cloneSelectedCharacterHandler}
								on:deleteCharacter={deleteCharacterPromptHandler}
								character={character} rpgSystem={character.expand.rpgSystem} />
						</a>
					</div>

				{/each}

        <SquareCard
          link="/characters/create"
          isAddButton={true}
        />
			</div>
		{/await}
	</div>
</div>

