<script lang="ts">
	import CharacterItem from "$lib/components/characters/CharacterItem.svelte"
	import { currentUser } from "$lib/pocketbase";
	import type { CampaignNotesResponse, CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { headerBanner } from "$lib/stores";
	import { getCampaignCharacterRequests, getCampaignImage, getCampaignWithRpgSystemCharsAndNotes, subscribeToCampaign } from "$models/campaign"
	import { type DrawerSettings, getDrawerStore } from "@skeletonlabs/skeleton"
	import CampaignAlert from "$lib/components/campaign/CampaignAlert.svelte";
	import ScenesManagerCaller from "../scenes/ScenesManagerCaller.svelte";

	import CampaignNotes from "./CampaignNotes.svelte";
	import CircleIconButton from "../global/CircleIconButton.svelte";
	import SquareCard from "../global/SquareCard.svelte";
	import { getBgCharacterImage } from "$models/character";
	import { onDestroy, onMount } from "svelte";
	import type { UnsubscribeFunc } from "pocketbase";


  let unsubscribeFromCampaign: UnsubscribeFunc

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
        campaign: campaign,
        rpgSystem: rpgSystem,
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

  async function campaignSub({action, record}: {action: string, record: any}) {

    if (action === "update") {
      campaign = await getCampaignWithRpgSystemCharsAndNotes(campaign.id)
    }
  }

  onMount(async () => {
    unsubscribeFromCampaign = await subscribeToCampaign(campaign.id, campaignSub)
  })

  onDestroy(() => {
    unsubscribeFromCampaign()
  })

  $: {
    if ($headerBanner !== getCampaignImage(campaign)) {
      headerBanner.set(getCampaignImage(campaign))
    }
  }

</script>

<div class="flex flex-col">

  <h1 class="h2 mx-auto mt-6">{campaign.name}</h1>
  <h6 class="h6 mx-auto my-6">{rpgSystem.name}</h6>

  <!-- Controls -->
  <div class="flex flex-wrap justify-center space-x-3">
    {#if campaign.creator === $currentUser?.id}
    
      <CircleIconButton
        on:click={openCampaignEditDrawerHandler}
        icon="i-[fa--pencil]"
        color="variant-ghost-warning"
      />

      <CircleIconButton
        on:click={openCampaignRequestsDrawer}
        icon="i-[material-symbols--share]"
        color="variant-ghost-secondary"
      />

      <ScenesManagerCaller
        {campaign}
        classes="btn btn-icon variant-ghost-success" >
      </ScenesManagerCaller>
    {/if}
    {#if campaign.activeScene !== undefined && campaign.activeScene !== ""}

      <CircleIconButton
        link="/campaigns/{campaign.id}/game"
        icon="i-[mdi--play]"
        color="variant-ghost-warning"
      />
    {/if}
  </div>

  <article class="mt-6 text-center">{campaign.description}</article>

  <div class="flex flex-wrap justify-center mb-3">
    {#if characters && characters.length > 0}
      {#each characters as character}
        {@const characterImage = getBgCharacterImage(character, rpgSystem)}
        <button class="btn" on:click|stopPropagation={() => openCharacterSheetDrawerHandler(character)}>
          <SquareCard
            imageUrl={characterImage}
            title={character.name}
            subtitle={rpgSystem !== undefined ? rpgSystem.name : ""}
            />
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
