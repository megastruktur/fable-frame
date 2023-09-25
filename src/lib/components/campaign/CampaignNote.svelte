<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
	import { CampaignNotesTypeOptions, type CampaignNotesResponse } from "$lib/pocketbase-types.d";
	import { toastShow } from "$lib/toast";
	import { deleteCampaignNote, updateCampaignNotes } from "$models/campaign_notes";
	import { SlideToggle, getModalStore, type ModalSettings, getToastStore } from "@skeletonlabs/skeleton";
	import { marked } from "marked";
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

<div class="w-96 md:w-100 my-3 flex flex-col">

  {#if !editMode}
    <div class="blockquote not-italic prose prose-invert">
      {@html marked.parse(note)}
    </div>
  {:else}
    <textarea class="textarea w-full my-6" bind:value={note}></textarea>
    <div class="flex items-center">
      <SlideToggle name="is-gm-note" bind:checked={isGmNote}>is GM-only?</SlideToggle>
      <button class="ml-6 btn variant-outline-primary" on:click={() => editMode = false}>Cancel</button>
      <button class="ml-6 btn variant-outline-success" on:click={updateNote}>Update</button>
    </div>
  {/if}

  {#if isCreator && !editMode}

  <div class="my-3">
    <button class="btn btn-icon btn-sm" on:click={() => editMode = true}>
      <Icon src={BsPencil} />
    </button>
    <button class="ml-3" on:click={deleteNoteModal}>
      <Icon src={BsTrash} />
    </button>
  </div>
  {/if}
</div>
