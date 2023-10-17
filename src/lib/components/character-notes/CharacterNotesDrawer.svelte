<script lang="ts">
	import type { CharacterNotesResponse } from "$lib/pocketbase-types"
	import type { CharacterNote } from "$lib/types"
  // @ts-ignore
	import Icon from "svelte-icons-pack"
	import BsPlus from "svelte-icons-pack/bs/BsPlus"
	import BsX from "svelte-icons-pack/bs/BsX"
	import BsPencil from "svelte-icons-pack/bs/BsPencil"
	import { type ModalSettings, getModalStore, ProgressBar } from "@skeletonlabs/skeleton";
	import { currentUser } from "$lib/pocketbase";
	import { marked } from "marked";
	import { getCharacterNotesByCharacterId, updateCharacterNotes } from "$models/character_notes";
	import { addCharacterNote, removeCharacterNote, updateCharacterNote } from "$lib/characterNotesOperations";
	import { receive, send } from "$lib/animation";

  export let characterId: string

  let isAddingNewNote = false
  let addingNewNoteText: string = ""
  let elm: any
  let editNoteId = ""
  let characterNotes: CharacterNotesResponse

  const modalStore = getModalStore()

  $: {
    if (elm !== undefined && elm !== null) {
      elm.focus()
    }
  }

  function onAddNewClick() {
    isAddingNewNote = true
  }

  async function addNote() {
    // Add only if not empty
    if (addingNewNoteText !== "") {
      let note: CharacterNote = {
        note: addingNewNoteText
      }
      addingNewNoteText = ""
      characterNotes = await updateCharacterNotes(characterNotes.id, addCharacterNote(characterNotes, note))
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
      response: async (r: boolean) => {
        if (r) {
          characterNotes = await updateCharacterNotes(characterNotes.id, removeCharacterNote(characterNotes, noteId))
        }
      },
    };
    modalStore.trigger(deleteNoteModal);

  }

  async function updateNote(note: CharacterNote) {
    characterNotes = await updateCharacterNotes(characterNotes.id, updateCharacterNote(characterNotes, note))
    editNoteId = ""
  }

  function clickEditNote(noteId: string) {
    editNoteId = noteId
  }

  async function loadData() {
    characterNotes = await getCharacterNotesByCharacterId(characterId)
  }

</script>

{#await loadData()}
  <ProgressBar />
{:then}

  {#if $currentUser?.id === characterNotes.creator}
  <div class="m-4 w-96">
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

      {#if characterNotes !== undefined && characterNotes.id !== "" && characterNotes.data}
        {#each characterNotes.data as note(note.id)}
          <div class="flex flex-row justify-between mt-3"
            in:receive={{ key: note.id }} out:send={{ key: note.id }}>
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
                  <div class="prose prose-invert">{@html marked.parse(note.note)}</div>
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

          <hr />
        {/each}

      {/if}
    </div>
  </div>
  {/if}
{/await}
