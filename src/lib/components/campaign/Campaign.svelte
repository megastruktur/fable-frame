<script lang="ts">
  import { page } from "$app/stores"
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte"
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignNotesResponse, CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { headerBanner } from "$lib/stores";
	import { getCampaignCharacterRequests, getCampaignImage } from "$models/campaign"
	import { getToastStore, type DrawerSettings, getDrawerStore } from "@skeletonlabs/skeleton"
  import { clipboard } from '@skeletonlabs/skeleton'
	import { toastShow } from "$lib/toast";
	import CampaignNoteAdd from "$lib/components/campaign/CampaignNoteAdd.svelte";
	import { getCampaignNotes } from "$models/campaign_notes";
	import CampaignNote from "$lib/components/campaign/CampaignNote.svelte";
	import CampaignAlert from "$lib/components/character-notes/CampaignAlert.svelte";
	import { getCampaignScenes } from "$models/scenes";

  const toastStore = getToastStore()
  const drawerStore = getDrawerStore()

  // Ref to: getCampaignWithRpgSystemCharsAndNotes
  export let campaign: CampaignsResponse
  let characters: CharactersResponse[] = campaign.expand.characters
  let campaignNotes: CampaignNotesResponse[] = campaign.expand["campaign_notes(campaign)"]
  let rpgSystem: RpgSystemsResponse = campaign.expand.rpgSystem
  let isUserGm: boolean = campaign.creator === $currentUser?.id

  headerBanner.set(getCampaignImage(campaign))

  async function campaignNoteAddedHandler() {
    campaignNotes = await getCampaignNotes($page.params.campaignId)
  }

  function campaignNoteRemovedHandler(e: any) {
    if (e.detail.campaignNoteId !== undefined) {
      campaignNotes = campaignNotes.filter(note => note.id!== e.detail.campaignNoteId)
    }
  }

  function openCharacterSheetDrawerHandler(character: CharactersResponse) {
    const characterSheetDrawerSettings: DrawerSettings = {
      id: `character-sheet`,
      meta: {
        character: character,
        rpgSystem: rpgSystem,
        campaign: campaign,
      },
      width: "w-96",
      position: "right",
    };

    drawerStore.open(characterSheetDrawerSettings);
  }

  async function openCampaignRequestsDrawer() {
    const characterRequests = await getCampaignCharacterRequests(campaign.id)

    const characterRequestsDrawerSettings: DrawerSettings = {
      id: `campaign-requests`,
      meta: {
        characters: characterRequests,
      },
      width: "w-96",
      position: "right",
    };
    drawerStore.open(characterRequestsDrawerSettings);
  }

  async function openScenesManagerDrawer() {

    const scenes = await getCampaignScenes(campaign.id)
    const scenesManagerDrawerSettings: DrawerSettings = {
      id: `scenes-manager`,
      meta: {
        scenes: scenes,
        campaign: campaign,
      },
      width: "w-96",
      position: "right",
    };

    drawerStore.open(scenesManagerDrawerSettings);
  }

</script>

<div class="flex flex-col">

  <h1 class="h2 mx-auto mt-6">{campaign.name}</h1>
  <h6 class="h6 mx-auto my-6">{rpgSystem.name}</h6>

  <div class="flex flex-wrap justify-center">
    {#if campaign.creator === $currentUser?.id}
      <a class="btn variant-ghost-warning mx-3" href="/campaigns/{$page.params.campaignId}/edit">EDIT</a>
      <button
        on:click={openCampaignRequestsDrawer}
        class="btn variant-ghost-secondary mx-3">CAMPAIGN REQUESTS</button>
      <button class="btn variant-ghost-success mx-3" use:clipboard={`${$page.url.origin}/campaigns/${$page.params.campaignId}/request`} on:click={() => toastShow("Invite link copied", toastStore)}>INVITE</button>
      <button
        on:click={openScenesManagerDrawer}
        class="btn variant-ghost-success mx-3">Scenes Manager</button>
    {/if}
    <a class="btn variant-ghost-warning mx-3" href="/campaigns/{$page.params.campaignId}/game">GAME</a>
  </div>

  <article class="mt-6 text-center">{campaign.description}</article>

  <div class="flex flex-wrap justify-center">
    {#each characters as character}
    <button class="btn" on:click|stopPropagation={() => openCharacterSheetDrawerHandler(character)}>
      <CharacterItem {character} />
    </button>
    {/each}
  </div>

  {#if isUserGm}
    <div class="mx-auto">
      <CampaignAlert campaignId={campaign.id} />
    </div>
  {/if}
  
  {#if isUserGm}
    <CampaignNoteAdd campaignId={campaign.id} on:campaignNoteAdded={campaignNoteAddedHandler} />
  {/if}

  {#if campaignNotes !== undefined}
  <div class="flex flex-col items-center my-6">
    {#each campaignNotes as campaignNote(campaignNote.id)}
      {#if !(!isUserGm && campaignNote.type === "gm") && campaignNote.type !== "alert"}
      <CampaignNote {campaignNote} on:campaignNoteRemoved={campaignNoteRemovedHandler}/>
      {/if}
    {/each}
  </div>
  {/if}
</div>
