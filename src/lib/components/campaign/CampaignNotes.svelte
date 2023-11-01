<script lang="ts">
	import type { CampaignNotesResponse } from "$lib/pocketbase-types";
	import CampaignNote from "$lib/components/campaign/CampaignNote.svelte";
	import CampaignNoteAdd from "$lib/components/campaign/CampaignNoteAdd.svelte";

  export let campaignId: string
  export let campaignNotes: CampaignNotesResponse[] = []
  export let isUserGm: boolean = false

  function campaignNoteAddedHandler(e: any) {
    campaignNotes = [...campaignNotes, e.detail.note]
  }

  function campaignNoteRemovedHandler(e: any) {
    campaignNotes = campaignNotes.filter(note => note.id!== e.detail.note.id)
  }
</script>

<div>
  {#if isUserGm}
    <CampaignNoteAdd campaignId={campaignId} on:campaignNoteAdded={campaignNoteAddedHandler} />
  {/if}

  {#if campaignNotes !== undefined}
    <div class="my-6">
      {#each campaignNotes as campaignNote(campaignNote.id)}
        <CampaignNote {campaignNote} on:campaignNoteRemoved={campaignNoteRemovedHandler}/>
      {/each}
    </div>
  {/if}
</div>
