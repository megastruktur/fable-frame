<script lang="ts">
	import type { CharacterNotesResponse } from "$lib/pocketbase-types"
	import { characterNotesStore } from "$lib/stores"
	import type { CharacterNote } from "$lib/types"
	import { onDestroy } from "svelte"
	import Icon from "svelte-icons-pack"
	import BsPlus from "svelte-icons-pack/bs/BsPlus"
	import BsX from "svelte-icons-pack/bs/BsX"
	import BsPencil from "svelte-icons-pack/bs/BsPencil"
	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";

  let characterNotesData: CharacterNote[]
  let isAddingNewNote = false
  let addingNewNoteText: string = ""
  let elm: any
  let editNoteId = ""

  const unsubscribeCharacterNotesStore = characterNotesStore.subscribe((characterNotes: CharacterNotesResponse) => {

    if (characterNotes !== undefined) {
      characterNotesData = characterNotes.data
    }

  })

  $: {
    if (elm !== undefined && elm !== null) {
      elm.focus()
    }
  }

  function onAddNewClick() {
    isAddingNewNote = true
  }

  function addNote() {
    // Add only if not empty
    if (addingNewNoteText !== "") {
      let note: CharacterNote = {
        note: addingNewNoteText
      }
      addingNewNoteText = ""
      characterNotesStore.addNote(note)
      characterNotesStore.save()
    }
    isAddingNewNote = false
  }
  
  function deleteNoteModal(noteId: string) {
    const deleteNoteModal: ModalSettings = {
      type: 'confirm',
      // Data
      title: 'Remove note',
      body: 'Are you sure you wish remove the note?',
      // TRUE if confirm pressed, FALSE if cancel pressed
      response: (r: boolean) => {
        if (r) {
          characterNotesStore.deleteNote(noteId)
          characterNotesStore.save()
        }
      },
    };
    modalStore.trigger(deleteNoteModal);

  }

  function updateNote(note: CharacterNote) {
    characterNotesStore.updateNote(note)
    characterNotesStore.save()
    editNoteId = ""
  }

  function clickEditNote(noteId: string) {
    editNoteId = noteId
  }

  onDestroy(() => {
    unsubscribeCharacterNotesStore()
  })

</script>

<div class="m-4">
  <h2 class="h2 text-center">Character Notes</h2>

  <div class="flex flex-col">

    {#if !isAddingNewNote}
    <button class="btn btn-circle hover:bg-surface-800"
      on:click={onAddNewClick}>
      <Icon size="40" color="" src={BsPlus} />
    </button>
    {/if}

    {#if isAddingNewNote}
    <textarea class="textarea my-3"
      bind:this={elm}
      bind:value={addingNewNoteText}
      on:focusout={addNote}/>
    {/if}

    {#if $characterNotesStore !== undefined && $characterNotesStore.id !== "" && $characterNotesStore.data}
      {#each $characterNotesStore.data as note}
      {#if note}
        <div class="flex flex-row justify-between mt-3">
          <div class="flex flex-row mb-3 w-full">


            <!-- Edit note and Note visual -->
            {#if note.id === editNoteId}
              <textarea class="textarea"
                bind:value={note.note}
                bind:this={elm}
                on:focusout={() => updateNote(note)}
                />
            {:else}

              <button class="btn btn-circle hover:bg-surface-800"
                on:click={() => clickEditNote(note.id)}>
                <Icon size="20" color="" src={BsPencil} />
              </button>

              <div>
                <div class="text-sm">{new Date(note.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</div>
                <div class="h3">{note.note}</div>
              </div>
            {/if}

          </div>
          <div>
            <button class="btn btn-circle hover:bg-surface-800"
              on:click={() => deleteNoteModal(note.id)}>
              <Icon size="40" color="" src={BsX} />
            </button>
          </div>
        </div>
      {/if}

      <hr />
      {/each}

    {/if}
  </div>
</div>
