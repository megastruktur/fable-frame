<!-- Characters Page -->
<script lang="ts">
	import type { CharactersResponse } from '$lib/pocketbase-types';
	import { toastShow } from '$lib/toast';
	import { cloneCharacter, deleteCharacter, getAllCharacters } from '$models/character';
	import { ProgressRadial, type PopupSettings, popup, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import { flip } from 'svelte/animate';
	import { crossfade, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Icon from 'svelte-icons-pack';
	import BsPlus from 'svelte-icons-pack/bs/BsPlus';
	import CharacterItem from '$lib/components/characters/CharacterItem.svelte';

	const modalStore = getModalStore()

	const charOperationsMenu: PopupSettings = {
		event: 'focus-click',
		target: 'charOperationsPopup',
		placement: 'bottom',
		closeQuery: '.list-option'
	};


	// Async load Characters and store in variable.
	let myCharacters: CharactersResponse[]
	async function loadMyCharacters() {
		myCharacters = await getAllCharacters({
			expand: 'rpgSystem'
		})
	}

	// Character Operations
	let operationsOnCharacterId: string
	async function cloneSelectedCharacter() {
		const character = await cloneCharacter(operationsOnCharacterId)

		toastShow(`Character <span class="text-secondary-100">${character.name}</span> has been cloned`)

		myCharacters = [...myCharacters, character]
	}

  function deleteCharacterPrompt() {

		const character = myCharacters.find(c => c.id === operationsOnCharacterId)

		if (character) {
			const modal: ModalSettings = {
				type: 'confirm',
				title: 'Please Confirm',
				body: `Are you sure you want to remove character <span class="text-error-900">${character.name}</span>? This action cannot be undone.`,
				response: async (r: boolean) => {
					if (r === true) {

						await deleteCharacter(character.id)

						toastShow(`Character <span class="text-error-900">${character.name}</span> has been removed`)

						// Update reactively so the element refreshes.
						myCharacters = myCharacters.filter(c => c.id!== character.id)

					}
				}
			};
			modalStore.trigger(modal);
		}
	}

	// Animations
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 300,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

</script>

<div class="flex flex-col" transition:fade>

	<h1 class="text-3xl m-auto my-3">Your Characters</h1>
	<hr />
	<br />

	<!-- My Characters section -->
	<div class="flex items-center justify-center flex-wrap">
		{#await loadMyCharacters()}
			<ProgressRadial value={undefined} />
		{:then _}
			<ul class="list-nav">
				{#each myCharacters as character(character.id)}
				<li
					animate:flip
					in:receive={{ key: character.id }}
					out:send={{ key: character.id }}
					class="flex justify-between items-center">
					<a class="list-option w-full" href="/characters/{character.id}">
						<CharacterItem character={character} />
					</a>
					<span>
						<button
							class="btn-icon btn-icon-sm"
							on:click={() => operationsOnCharacterId = character.id}
							use:popup={charOperationsMenu}
							>⋮</button>
					</span>
				</li>
				{/each}
				<li>
					<a class="btn btn-circle hover:bg-surface-800 w-full" href="/characters/create">
						<Icon size="40" color="" src={BsPlus} />
					</a>
				</li>
			</ul>
		{/await}
	</div>
</div>

<div class="card w-48 shadow-xl py-2" data-popup="charOperationsPopup">
	<ul class="list-nav px-2">
		<li class="list-option" on:keyup on:click={cloneSelectedCharacter}>Clone</li>
		<li class="list-option bg-error-900" on:keyup on:click={deleteCharacterPrompt}>Remove</li>
	</ul>
	<div class="arrow bg-surface-100-800-token" />
</div>
