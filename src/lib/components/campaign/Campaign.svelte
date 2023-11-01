<script lang="ts">
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte"
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignNotesResponse, CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { headerBanner } from "$lib/stores";
	import { getCampaignCharacterRequests, getCampaignImage } from "$models/campaign"
	import { type DrawerSettings, getDrawerStore } from "@skeletonlabs/skeleton"
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
	import CampaignNotes from "./CampaignNotes.svelte";
	import { activateScene } from "$models/scenes";

  const drawerStore = getDrawerStore()

  // Ref to: getCampaignWithRpgSystemCharsAndNotes
  export let campaign: CampaignsResponse

  let isUserGm: boolean = campaign.creator === $currentUser?.id

  let characters: CharactersResponse[] = campaign.expand.characters
  let campaignNotesAll: CampaignNotesResponse[] = campaign.expand["campaign_notes(campaign)"].sort((a, b) => {
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

  function filterCampaignNotes() {

    campaignAlerts = []
    campaignNotes = []
    campaignNpc = []

    campaignNotesAll.forEach(note => {

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
      <a class="btn w-10 h-10 p-2 variant-ghost-warning" href="/campaigns/{campaign.id}/edit"><FaPencilAlt /></a>
      <button
        on:click={openCampaignRequestsDrawer}
        class="btn w-10 h-10 p-2 variant-ghost-secondary"><MdShare /></button>

      <ScenesManagerCaller
        {campaign}
        classes="btn w-10 h-10 p-2 variant-ghost-success" >
        <GiSteelDoor />
      </ScenesManagerCaller>
    {/if}
    {#if campaign.activeScene !== undefined && campaign.activeScene !== ""}
      <a class="btn w-10 h-10 p-2 variant-ghost-warning" href="/campaigns/{campaign.id}/game"><GiPlayButton /></a>
    {/if}
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
