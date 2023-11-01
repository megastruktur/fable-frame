<script lang="ts">
	import type { CampaignNotesResponse, CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getSceneImage } from "$models/scenes";
	import { getDrawerStore, type DrawerSettings, ProgressBar } from "@skeletonlabs/skeleton";

  // @ts-ignore
  import GiBookPile from 'svelte-icons/gi/GiBookPile.svelte'
  // @ts-ignore
  import MdChat from 'svelte-icons/md/MdChat.svelte'
  // @ts-ignore
  import GiSteelDoor from 'svelte-icons/gi/GiSteelDoor.svelte'

	import { currentUser } from "$lib/pocketbase";
	import CampaignAlert from "../campaign/CampaignAlert.svelte";
	import ScenesManagerCaller from "./ScenesManagerCaller.svelte";
	import PersonSimpleIcon from "../icons/PersonSimpleIcon.svelte";
	import { getCampaignAlerts } from "$models/campaign_notes";

  export let scene: ScenesResponse
  export let campaign: CampaignsResponse

  let isGM = campaign.creator === $currentUser?.id || false
  let sceneImage = getSceneImage(scene)
  let campaignAlerts: CampaignNotesResponse[] = []

  const drawerStore = getDrawerStore();

  const campaignChatDrawerSettings: DrawerSettings = {
    id: `campaign-chat`,
    meta: {
      campaignWithCharacters: campaign
    },
    width: "w-96",
    position: "left",
  };

  const characterDrawerSettings: DrawerSettings = {
    id: `campaign-character-list`,
    meta: {
      rpgSystem: campaign.expand.rpgSystem,
      campaign: campaign,
      characters: isGM ? campaign.expand.characters : campaign.expand.characters.filter(c => c.creator === $currentUser?.id)
    },
    width: "w-96",
    position: "right",
  };

  const campaignNotesDrawerSettings: DrawerSettings = {
    id: `campaign-notes-list`,
    meta: {
      campaignId: campaign.id
    },
    width: "w-96",
    position: "left",
  };

  async function openCharactersDrawer() {
    drawerStore.open(characterDrawerSettings);
  }
  
  async function openCampaignNotesDrawer() {
    drawerStore.open(campaignNotesDrawerSettings);
  }

  async function openCampaignChatDrawer() {
    drawerStore.open(campaignChatDrawerSettings);
  }

  async function getCampaignAlertsHandler() {
    campaignAlerts = await getCampaignAlerts(campaign.id)
  }

</script>


<div class="h-full w-full bg-contain bg-center bg-no-repeat overflow-hidden"
  style="background-image: url('{sceneImage}')">

  
  <div class="bg-surface-900/70 py-2">
    <h2 class="h2 text-center flex justify-center space-x-3">
      <p>{scene.name}</p>
      <a class="btn btn-sm m-0 variant-ghost-secondary" href="/campaigns/{campaign.id}">{campaign.name}</a>
    </h2>
  </div>

  <!-- Left Icons -->
  <div
    class="fixed left-0 top-2/4 flex flex-col space-y-3 p-3
      bg-surface-600/80 rounded-r-2xl shadow-md">

    <!-- Campaign Notes -->
    <button
      class="btn btn-icon text-secondary-400"
      on:click={openCampaignNotesDrawer}
    >
      <GiBookPile />
    </button>
    
    <!-- Chat -->
    <button
      class="btn btn-icon text-secondary-400"
      on:click={openCampaignChatDrawer}
    >
      <MdChat />
    </button>
  
    {#if isGM}
      <ScenesManagerCaller
        {campaign}
        position="left"
        classes="btn btn-icon text-secondary-400">
        <GiSteelDoor />
      </ScenesManagerCaller>
    {/if}

  </div>

  <!-- Right icons -->
  <div class="fixed right-0 top-1/4 flex flex-col space-y-3 p-3
  bg-surface-600/80 rounded-l-2xl shadow-md">
  
    <!-- Characters -->
    <button
      class="btn btn-icon text-secondary-400"
      on:click={openCharactersDrawer}
    >
      <PersonSimpleIcon />
    </button>
  </div>


  <!-- Alerts -->
  {#if isGM}
    <div class="fixed right-3 bottom-3">
      {#await getCampaignAlertsHandler()}
        <ProgressBar />
      {:then}
        <CampaignAlert bind:campaignAlerts={campaignAlerts} campaignId={campaign.id} />
      {/await}
    </div>
  {/if}

</div>
