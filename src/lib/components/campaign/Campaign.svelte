<script lang="ts">
  import { page } from "$app/stores"
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte"
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignNotesResponse, CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { headerBanner } from "$lib/stores";
	import { getCampaignCharacterRequests, getCampaignImage } from "$models/campaign"
	import { getToastStore, type DrawerSettings, getDrawerStore } from "@skeletonlabs/skeleton"
	import CampaignNoteAdd from "$lib/components/campaign/CampaignNoteAdd.svelte";
	import { getCampaignNotes } from "$models/campaign_notes";
	import CampaignNote from "$lib/components/campaign/CampaignNote.svelte";
	import CampaignAlert from "$lib/components/campaign/CampaignAlert.svelte";
	import ScenesManagerCaller from "../scenes/ScenesManagerCaller.svelte";

  // @ts-ignore
  import GiPlayButton from 'svelte-icons/gi/GiPlayButton.svelte'
  // @ts-ignore
  import MdShare from 'svelte-icons/md/MdShare.svelte'
  // @ts-ignore
	import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte'
  // @ts-ignore
  import GiSteelDoor from 'svelte-icons/gi/GiSteelDoor.svelte'

  const drawerStore = getDrawerStore()

  // Ref to: getCampaignWithRpgSystemCharsAndNotes
  export let campaign: CampaignsResponse
  let characters: CharactersResponse[] = campaign.expand.characters
  let campaignNotes: CampaignNotesResponse[] = campaign.expand["campaign_notes(campaign)"].sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime()
  })
  

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
        campaignId: campaign.id,
      },
      width: "w-96",
      position: "right",
    };
    drawerStore.open(characterRequestsDrawerSettings);
  }

</script>

<div class="flex flex-col">

  <h1 class="h2 mx-auto mt-6">{campaign.name}</h1>
  <h6 class="h6 mx-auto my-6">{rpgSystem.name}</h6>

  <div class="flex flex-wrap justify-center space-x-3">
    {#if campaign.creator === $currentUser?.id}
      <a class="btn w-10 h-10 p-2 variant-ghost-warning" href="/campaigns/{$page.params.campaignId}/edit"><FaPencilAlt /></a>
      <button
        on:click={openCampaignRequestsDrawer}
        class="btn w-10 h-10 p-2 variant-ghost-secondary"><MdShare /></button>

      <ScenesManagerCaller
        {campaign}
        classes="btn w-10 h-10 p-2 variant-ghost-success" >
        <GiSteelDoor />
      </ScenesManagerCaller>
    {/if}
    <a class="btn w-10 h-10 p-2 variant-ghost-warning" href="/campaigns/{$page.params.campaignId}/game"><GiPlayButton /></a>
  </div>

  <article class="mt-6 text-center">{campaign.description}</article>

  <div class="flex flex-wrap justify-center mb-3">
    {#each characters as character}
    <button class="btn" on:click|stopPropagation={() => openCharacterSheetDrawerHandler(character)}>
      <CharacterItem {character} />
    </button>
    {/each}
  </div>

  <div class="flex flex-wrap justify-evenly">
    {#if isUserGm}
      <div class="mb-6">
        <CampaignAlert campaignId={campaign.id} />
      </div>
    {/if}
    
    <div class="w-96">
      {#if isUserGm}
        <CampaignNoteAdd campaignId={campaign.id} on:campaignNoteAdded={campaignNoteAddedHandler} />
      {/if}
    
      {#if campaignNotes !== undefined}
        <div class="my-6">
          {#each campaignNotes as campaignNote(campaignNote.id)}
            {#if !(!isUserGm && campaignNote.type === "gm") && campaignNote.type !== "alert"}
            <CampaignNote {campaignNote} on:campaignNoteRemoved={campaignNoteRemovedHandler}/>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
