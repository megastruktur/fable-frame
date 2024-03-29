<script lang="ts">
	import type { CampaignNotesResponse, CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getSceneImage } from "$models/scenes";
	import { getDrawerStore, type DrawerSettings, ProgressBar } from "@skeletonlabs/skeleton";

	import { currentUser } from "$lib/pocketbase";
	import CampaignAlert from "../campaign/CampaignAlert.svelte";
	import ScenesManagerCaller from "./ScenesManagerCaller.svelte";
	import { getCampaignAlerts } from "$models/campaign_notes";
	import { headerBanner, pageName } from "$lib/stores";
	import ImageCanvasPan from "../global/ImageCanvasPan.svelte";
	import { getCampaignImage } from "$models/campaign";
	import Draggable from "../global/Draggable.svelte";

  export let scene: ScenesResponse
  export let campaign: CampaignsResponse

  let isGM = campaign.creator === $currentUser?.id || false
  let sceneImage = getSceneImage(scene)
  let campaignAlerts: CampaignNotesResponse[] = []

	pageName.set(`Scene: ${scene.name}`)

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
    width: "w-auto",
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

  $: {
    if ($headerBanner !== getCampaignImage(campaign)) {
      headerBanner.set(getCampaignImage(campaign))
    }
  }

</script>

<div class="bg-contain bg-center bg-no-repeat">

  <ImageCanvasPan
    classes="absolute top-0 left-0 z-0"
    imageUrl={sceneImage} height={window.innerHeight} />

  <!-- Buttons -->
  <div
    class="fixed bottom-0 w-full justify-center flex">

    <div
      class="justify-center flex space-x-3 p-3
        bg-surface-600/80 rounded-t-2xl shadow-md">
      <!-- Campaign Notes -->
      <button
        class="btn btn-icon text-secondary-400"
        on:click={openCampaignNotesDrawer}
      >
        <div class="i-[game-icons--book-pile] text-5xl"></div>
      </button>
      
      <!-- Chat -->
      <button
        class="btn btn-icon text-secondary-400"
        on:click={openCampaignChatDrawer}
      >
        <div class="i-[material-symbols--chat] text-5xl"></div>
      </button>
    
      <!-- Scenes Manager -->
      {#if isGM}
        <ScenesManagerCaller
          {campaign}
          position="left"
          classes="btn btn-icon text-secondary-400 text-5xl">
        </ScenesManagerCaller>
      {/if}
  
      <!-- Characters -->
      <button
        class="btn btn-icon text-secondary-400"
        on:click={openCharactersDrawer}
      >
        <div class="i-[ri--profile-line] text-5xl"></div>
      </button>
    </div>

  </div>


  <!-- Alerts -->
  {#if isGM}
    {#await getCampaignAlertsHandler()}
      <ProgressBar />
    {:then}
      <Draggable title="Important">
        <CampaignAlert bind:campaignAlerts={campaignAlerts} campaignId={campaign.id} />
      </Draggable>
    {/await}
  {/if}

</div>
