<script lang="ts">
	import { createCampaignNote } from "$models/campaign_notes";
	import { SlideToggle } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";

  export let campaignId: string

  let noteText: string
  let isGmNote: boolean

  const dispatch = createEventDispatcher()

  async function createNote() {
    const campaignNoteCreated = await createCampaignNote(campaignId, noteText, isGmNote)

    dispatch('campaignNoteAdded');

    noteText = ""
    isGmNote = false
  }
</script>

<div class="flex flex-col items-center">
  
  <textarea class="textarea w-96 my-6" bind:value={noteText}></textarea>
  <div class="flex items-center">
    <SlideToggle name="is-gm-note" bind:checked={isGmNote}>is GM-only?</SlideToggle>
    <button class="ml-6 btn variant-outline-success" on:click={createNote}>Create</button>
  </div>
</div>
