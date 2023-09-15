<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import { CampaignNotesTypeOptions, type CampaignNotesResponse } from "$lib/pocketbase-types.d";
	import { toastShow } from "$lib/toast";
	import { deleteCampaignNote, updateCampaignNotes } from "$models/campaign_notes";
	import { SlideToggle, getModalStore, type ModalSettings, getToastStore } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
	import Icon from "svelte-icons-pack";
  import BsPencil from "svelte-icons-pack/bs/BsPencil";
  import BsTrash from "svelte-icons-pack/bs/BsTrash";

  export let campaignNote: CampaignNotesResponse

  const isCreator = $currentUser?.id === campaignNote.creator
  let editMode = false
  let note = campaignNote.note
  let isGmNote = campaignNote.type === CampaignNotesTypeOptions.gm

  const modalStore = getModalStore()
  const toastStore = getToastStore()

  async function updateNote() {
    const campaignNoteCreated = await updateCampaignNotes(campaignNote.id, {
      note: note,
      type: isGmNote ? CampaignNotesTypeOptions.gm : CampaignNotesTypeOptions.public
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
              campaignNoteId: campaignNote.id
            });

					}
				}
			};
			modalStore.trigger(modal);
    
  }

</script>

<div class="w-96 my-3 flex flex-wrap">

  {#if !editMode}
    <div class="blockquote not-italic {isCreator ? "w-2/3" : ""} ">
      {note}
    </div>
  {:else}
    <textarea class="textarea w-96 my-6" bind:value={note}></textarea>
    <div class="flex items-center">
      <SlideToggle name="is-gm-note" bind:checked={isGmNote}>is GM-only?</SlideToggle>
      <button class="ml-6 btn variant-outline-primary" on:click={() => editMode = false}>Cancel</button>
      <button class="ml-6 btn variant-outline-success" on:click={updateNote}>Update</button>
    </div>
  {/if}

  {#if isCreator && !editMode}
  <button class="" on:click={() => editMode = true}>
    <Icon src={BsPencil} />
  </button>
  <button class="ml-3" on:click={deleteNoteModal}>
    <Icon src={BsTrash} />
  </button>
  {/if}
</div>
