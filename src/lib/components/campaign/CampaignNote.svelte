<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import { CampaignNotesTypeOptions, type CampaignNotesResponse } from "$lib/pocketbase-types.d";
	import { toastShow } from "$lib/toast";
	import { deleteCampaignNote, getCampaignNotesImage, updateCampaignNotes } from "$models/campaign_notes";
	import { SlideToggle, getModalStore, type ModalSettings, getToastStore } from "@skeletonlabs/skeleton";
	import { marked } from "marked";
	import { createEventDispatcher } from "svelte";
	import CircleIconButton from "../global/CircleIconButton.svelte";

  export let campaignNote: CampaignNotesResponse

  const isCreator = $currentUser?.id === campaignNote.creator
  let editMode = false
  let note = campaignNote.note
  let isGmNote = campaignNote.type.find(t => t === CampaignNotesTypeOptions.gm) !== undefined || false
  let imageUrl = getCampaignNotesImage(campaignNote)

  const modalStore = getModalStore()
  const toastStore = getToastStore()

  async function updateNote() {
    const campaignNoteCreated = await updateCampaignNotes(campaignNote.id, {
      note: note,
      type: isGmNote ? [CampaignNotesTypeOptions.gm] : [CampaignNotesTypeOptions.public]
    })

    editMode = false
  }


  const dispatch = createEventDispatcher()

  function deleteNoteModal() {

    const modal: ModalSettings = {
				type: 'confirm',
				title: 'Please Confirm',
				body: `Are you sure you want to remove the note? This action cannot be undone.`,
				response: async (r: boolean) => {
					if (r === true) {

						await deleteCampaignNote(campaignNote.id)
						toastShow(`Note has been removed`, toastStore)

            dispatch('campaignNoteRemoved', {
              note: campaignNote
            });

					}
				}
			};
			modalStore.trigger(modal);
    
  }

  function togglePlayerVisilibility() {
    if (isGmNote) {
      isGmNote = false
    }
    else {
      isGmNote = true
    }
    updateNote()
  }

</script>

<div class="card p-3 shadow-md">

  {#if !editMode}
    <div class="relative">
      {#if isCreator}
        <CircleIconButton
          on:click={togglePlayerVisilibility}
          icon={!isGmNote ? "i-[fa6-solid--eye]" : "i-[fa6-solid--eye-slash]"}
          color={!isGmNote ? "text-white variant-ghost-success" : "text-gray-400 variant-ghost-surface"}
          classes="absolute top-0 right-0"
        />
      {/if}

      {#if imageUrl !== undefined && imageUrl !== null && imageUrl !== ""}
        <img src={imageUrl} alt="Note" />
      {/if}
      <div class="prose prose-invert">
        {@html marked.parse(note)}
      </div>
    </div>
  {:else}
    <textarea class="textarea my-6" bind:value={note}></textarea>
    <div class="flex items-center">
      <SlideToggle name="is-gm-note" bind:checked={isGmNote}>is GM-only?</SlideToggle>
      <button class="ml-6 btn variant-outline-primary" on:click={() => editMode = false}>Cancel</button>
      <button class="ml-6 btn variant-outline-success" on:click={updateNote}>Update</button>
    </div>
  {/if}

  {#if isCreator && !editMode}
    <hr />
    <div class="my-3 flex justify-around">
      <CircleIconButton
        icon="i-[material-symbols--delete]"
        color="variant-ghost-error"
        on:click={deleteNoteModal}
      />
      <CircleIconButton
        icon="i-[fa--pencil]"
        color="variant-ghost-warning"
        on:click={() => editMode = true}
      />
    </div>
  {/if}
</div>
