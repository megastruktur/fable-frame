<script lang="ts">
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte"
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignNotesResponse, CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { headerBanner } from "$lib/stores";
	import { getCampaignCharacterRequests, getCampaignImage } from "$models/campaign"
	import { type DrawerSettings, getDrawerStore } from "@skeletonlabs/skeleton"
	import CampaignAlert from "$lib/components/campaign/CampaignAlert.svelte";
	import ScenesManagerCaller from "../scenes/ScenesManagerCaller.svelte";

	import CampaignNotes from "./CampaignNotes.svelte";

  const drawerStore = getDrawerStore()

  // Ref to: getCampaignWithRpgSystemCharsAndNotes
  export let campaign: CampaignsResponse

  let isUserGm: boolean = campaign.creator === $currentUser?.id

  let characters: CharactersResponse[] = campaign.expand.characters
  let campaignNotesAll: CampaignNotesResponse[] = campaign.expand["campaign_notes(campaign)"]?.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime()
  })

  let campaignNotes: CampaignNotesResponse[] = []
  let campaignAlerts: CampaignNotesResponse[] = []
  let campaignNpc: CampaignNotesResponse[] = []
  filterCampaignNotes()
  

  let rpgSystem: RpgSystemsResponse = campaign.expand.rpgSystem

  headerBanner.set(getCampaignImage(campaign))

  function openCharacterSheetDrawerHandler(character: CharactersResponse) {
    const characterSheetDrawerSettings: DrawerSettings = {
      id: `campaign-character-list`,
      meta: {
        characters: [character],
        rpgSystem: rpgSystem,
        campaign: campaign,
      },
      width: "w-auto",
      position: "right",
    };

    drawerStore.open(characterSheetDrawerSettings);
  }

  function openCampaignEditDrawerHandler(character: CharactersResponse) {
    const characterSheetDrawerSettings: DrawerSettings = {
      id: `campaign-edit`,
      meta: {
        campaign: campaign,
      },
      width: "w-auto",
      position: "left",
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

  function filterCampaignNotes() {

    campaignAlerts = []
    campaignNotes = []
    campaignNpc = []

    campaignNotesAll?.forEach(note => {

      let shouldReturn = true
      let isAlert = false
      let isNpc = false

      note.type.forEach(t => {
        if (t === "gm" && !isUserGm) {
          shouldReturn = false
        }
        if (t === "alert") {
          isAlert = true
        }
        if (t === "npc") {
          isNpc = true
        }
      })

      if (shouldReturn) {
        if (isAlert) {
          campaignAlerts = [...campaignAlerts, note]
        }
        else if (isNpc) {
        }
        else {
          campaignNotes = [...campaignNotes, note]
        }
      }

    })
  }

</script>

<div class="flex flex-col">

  <h1 class="h2 mx-auto mt-6">{campaign.name}</h1>
  <h6 class="h6 mx-auto my-6">{rpgSystem.name}</h6>

  <div class="flex flex-wrap justify-center space-x-3">
    {#if campaign.creator === $currentUser?.id}
      <button
        on:click={openCampaignEditDrawerHandler}
        class="btn w-10 h-10 p-2 variant-ghost-warning"
        >
        <div class="text-5xl i-fa-pencil"></div>
      </button>
      <button
        on:click={openCampaignRequestsDrawer}
        class="btn w-10 h-10 p-2 variant-ghost-secondary">
        <div class="i-material-symbols-share text-5xl">
      </button>

      <ScenesManagerCaller
        {campaign}
        classes="btn w-10 h-10 p-2 variant-ghost-success" >
        <div class="i-game-icons-steel-door text-5xl"></div>
      </ScenesManagerCaller>
    {/if}
    {#if campaign.activeScene !== undefined && campaign.activeScene !== ""}
      <a class="btn w-10 h-10 p-2 variant-ghost-warning" href="/campaigns/{campaign.id}/game">
        <div class="i-mdi-play text-5xl">
      </a>
    {/if}
  </div>

  <article class="mt-6 text-center">{campaign.description}</article>

  <div class="flex flex-wrap justify-center mb-3">
    {#if characters && characters.length > 0}
      {#each characters as character}
        <button class="btn" on:click|stopPropagation={() => openCharacterSheetDrawerHandler(character)}>
          <CharacterItem {character} />
        </button>
      {/each}
    {/if}
  </div>

  <div class="flex flex-wrap justify-evenly">
    {#if isUserGm}
      <div class="mb-6">
        <CampaignAlert bind:campaignAlerts={campaignAlerts} campaignId={campaign.id} />
      </div>
    {/if}
    
    <div class="w-96">
      <CampaignNotes
        {isUserGm}
        campaignId={campaign.id}
        bind:campaignNotes={campaignNotes} />
    </div>
  </div>
</div>
