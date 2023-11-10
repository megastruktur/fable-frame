<script lang="ts">
  
  // @ts-ignore
  import MdArrowDropDown from 'svelte-icons/md/MdArrowDropDown.svelte'
	import type { Field } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import CharacterMove from "./K4eCharacterMove.svelte";

  export let form: "circle" | "square" = "circle";
  export let field: Field
  export let editMode: boolean = false
  
  const modalStore = getModalStore()

  let skillValue: number = parseInt(field.value || "0")

  const dispatch = createEventDispatcher()

  function fieldIncrement() {
    skillValue = skillValue + 1
    field.value = `${skillValue}`
    fieldUpdateEventDispatch()
  }

  function fieldDecrement() {
    skillValue = skillValue - 1
    field.value = `${skillValue}`
    fieldUpdateEventDispatch()
  }

  function fieldUpdateEventDispatch() {
    dispatch("fieldUpdate", {
      field: field
    })
  }


  function openMoveModal(move: string) {

    if (!editMode) {

      const modalComponent: ModalComponent = {
        ref: CharacterMove,
        props: {
          move: move
        }
      }
      const modal: ModalSettings = {
        type: "component",
        component: modalComponent,
      }

      modalStore.trigger(modal)

    }
  }

</script>

{#if field !== undefined}

<div class="w-28 relative">

  <div class="flex items-center justify-between relative">

    
    <div class="flex items-center justify-center mx-auto
    {form === "circle" ? "rounded-full w-14 h-14" : "rotate-45 w-10 h-10"}
    border-4 border-primary-900">
    
      <div class="flex {form === "square" ? "-rotate-45" : ""}">
        {#if editMode}
          <button
            class="w-15 h-15 rotate-90"
            on:click={fieldDecrement}>
            <MdArrowDropDown />
          </button>
        {/if}
      
        {skillValue}

        {#if editMode}
          <button
            class="w-15 h-15 -rotate-90"
            on:click={fieldIncrement}>
            <MdArrowDropDown />
          </button>
        {/if}

      </div>


    </div>

  </div>
  
  <button
    class="text-center text-xs w-full"
    on:click={() => openMoveModal(field.data?.move)}>
    <div class="capitalize font-bold">{field.name}</div>
    <div class="capitalize">{field.description}</div>
  </button>

</div>
{/if}
