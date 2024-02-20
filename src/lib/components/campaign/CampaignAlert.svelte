<script lang="ts">
	import { receive, send } from "$lib/animation";
	import type { CampaignNotesResponse } from "$lib/pocketbase-types";
	import { createCampaignAlert, deleteCampaignNote, toggleCampaignNoteActive } from "$models/campaign_notes";
	import { flip } from "svelte/animate";

  export let campaignId: string
  export let campaignAlerts: CampaignNotesResponse[]

  let campaignAlertText: string = ""

  async function createCampaignAlertHandler() {

    if (campaignAlertText !== "") {
      const alert = await createCampaignAlert(campaignId, campaignAlertText)
      campaignAlerts = [alert, ...campaignAlerts]
      campaignAlertText = ""
    }
  }

  async function toggleCampaignAlertHandler(alert: CampaignNotesResponse) {

    // Sort campaignAlerts that all alerts with active = false are in the end
    const updatedAlert = await toggleCampaignNoteActive(alert)
    campaignAlerts = campaignAlerts.map(a => (a.id === updatedAlert.id? updatedAlert : a)).sort((a, b) => {
      if (a.active &&!b.active) return -1
      if (!a.active && b.active) return 1
      return 0
    })
  }

  async function deleteCampaignAlertHandler(alert: CampaignNotesResponse) {
    await deleteCampaignNote(alert.id)
    campaignAlerts = campaignAlerts.filter(a => a.id!== alert.id)
  }

</script>

<div class="flex flex-col items-center w-72 pt-3 pb-4">

  <form class="mb-3" on:submit|preventDefault={createCampaignAlertHandler}>
    <input class="input"
      placeholder="Important note here"
      type="text"
      on:focusout={createCampaignAlertHandler}
      bind:value={campaignAlertText} />
  </form>
  {#if campaignAlerts !== undefined}
    <ul class="list max-h-80 overflow-y-auto px-3">
      {#each campaignAlerts as alert(alert.id)}
        <li class="list-item justify-between" 
        animate:flip
        in:receive={{ key: alert.id }}
        out:send={{ key: alert.id }}>
          <button 
            class="{alert.active ? "" : "line-through opacity-25"} flex space-x-2"
            on:click={() => toggleCampaignAlertHandler(alert) }
            >
            <div class="w-6 h-6 text-warning-900 text-3xl">
              <i class="i-[material-symbols--warning]" />
            </div>
            <div class="w-56">{alert.note}</div>
            
          </button>
          <button
            on:click={() => deleteCampaignAlertHandler(alert)} class="text-error-900">✕</button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
