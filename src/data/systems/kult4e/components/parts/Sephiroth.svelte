<script lang="ts">
	import type { Field } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import CharacterMove from './K4eCharacterMove.svelte';

	export let field: Field;
	export let editMode: boolean = false;
  export let element: any

	const modalStore = getModalStore();

	let skillValue: number = parseInt(field.value || '0');

	const dispatch = createEventDispatcher();

	function fieldIncrement() {
		skillValue = skillValue + 1;
		field.value = `${skillValue}`;
		fieldUpdateEventDispatch();
	}

	function fieldDecrement() {
		skillValue = skillValue - 1;
		field.value = `${skillValue}`;
		fieldUpdateEventDispatch();
	}

	function fieldUpdateEventDispatch() {
		dispatch('fieldUpdate', {
			field: field
		});
	}

	function openMoveModal(move: string) {
		if (!editMode) {
			const modalComponent: ModalComponent = {
				ref: CharacterMove,
				props: {
					move: move
				}
			};
			const modal: ModalSettings = {
				type: 'component',
				component: modalComponent
			};

			modalStore.trigger(modal);
		}
	}

  let speed = 50;
	let size = "6rem";
	let font = 0.7;
	let text = `${field.name} • ${field.description}`;
	let repeat = 1;
	let separator = ' • ';

	let array: string[] = [];
	$: array = [...Array(repeat)]
    .map(_ => [...text]
    .concat([...separator]))
    .flat();
</script>

<style>
	@keyframes rotation {
		0%   { transform: rotate(0turn); }
		100% { transform: rotate(1turn); }
	}
	.seal {
		position: relative;
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
		animation: rotation var(--speed) linear infinite;
		font-size: var(--font);
    /* border-color: #690A1D;
    border-width: 2px; */
	}
	.char {
		width: 1em;
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%) rotate(var(--angle, 0deg));
		text-align: center;
		text-transform: uppercase;
	}
</style>

{#if field !== undefined}


	<div class="relative" bind:this={element}>


    <button
      on:click={() => openMoveModal(field.data?.move)}
      class="relative bg-surface-700 rounded-full shadow-md shadow-black">
      <div
        class="seal" style="--size: {size}; --speed: {speed * 1000}ms; --font: {font}em">
        {#each array as char, index}
          <div class="char" style="--angle: {`${1 / array.length * index}turn`}">{char}</div>
        {/each}
  
        
      </div>


      <div
        class="absolute bg-surface-700 top-5 left-0 right-0 flex items-center justify-center mx-auto rounded-full w-14 h-14 border-2 border-primary-900 text-3xl"
      >
        <div class="flex">
          {#if editMode}
            <button class="w-15 h-15" on:click={fieldDecrement}>
							<div class="i-[lets-icons--arrow-drop-left]"></div>
            </button>
          {/if}

          {skillValue}

          {#if editMode}
            <button class="w-15 h-15" on:click={fieldIncrement}>
              <div class="i-[lets-icons--arrow-drop-right]"></div>
            </button>
          {/if}
        </div>
      </div>
    </button>
  </div>


{/if}
