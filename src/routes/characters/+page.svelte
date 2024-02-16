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
	async function cloneSelectedCharacter(characterId: string) {
		const character = await cloneCharacter(characterId)

		toastShow(`Character <span class="text-secondary-100">${character.name}</span> has been cloned`, toastStore)

		myCharacters = [...myCharacters, character]
		myCharactersFiltered = myCharacters
	}

  function deleteCharacterPrompt(characterId: string) {

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

	function getCharacterJson(characterId: string): string {
		const characterExport = myCharacters.find(c => c.id === characterId)

		if (characterExport !== undefined) {
			const exportObject = {
				rpgSystem: characterExport.rpgSystem,
				fields: characterExport.fields,
			}

			return JSON.stringify(exportObject)
		}
		return ""
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
						<CharacterItem character={character} rpgSystem={character.expand.rpgSystem} />
					</a>


					<div class="p-2 absolute top-0">
						<div class="flex space-x-2">
							<button class="btn btn-icon btn-icon-sm variant-ghost-warning" on:click={() => cloneSelectedCharacter(character.id)}>
								<i class="i-[la--clone-solid] text-3xl" />
							</button>
							<button class="btn btn-icon btn-icon-sm variant-ghost-success"
								on:click={() => toastShow("Character copied to clipboard", toastStore)}
								use:clipboard={getCharacterJson(character.id)}>
								<i class="i-[mdi--export] text-2xl" />
							</button>
							<button
								class="btn btn-icon btn-icon-sm variant-ghost-error"
								on:click={() => deleteCharacterPrompt(character.id)}>
								<i class="i-[material-symbols--delete] text-3xl" />
							</button>
						</div>
						<div class="arrow bg-surface-100-800-token" />
					</div>
				</div>
				{/each}
				<a class="card card-hover w-72 h-72 overflow-hidden bg-surface-800 flex items-center justify-center"
					href="/characters/create">
					<i class="i-[gridicons--plus] text-6xl" />
				</a>
			</div>
		{/await}
	</div>
</div>

