<script lang="ts">
	import type { CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getSceneImage } from "$models/scenes";
	import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

  // @ts-ignore
	import GiPerson from 'svelte-icons/gi/GiPerson.svelte'
  // @ts-ignore
  import GiBookPile from 'svelte-icons/gi/GiBookPile.svelte'
  // @ts-ignore
  import MdChat from 'svelte-icons/md/MdChat.svelte'
	import { currentUser } from "$lib/pocketbase";
	import CampaignAlert from "../character-notes/CampaignAlert.svelte";

  export let scene: ScenesResponse
  export let campaign: CampaignsResponse

  let isGM = campaign.creator === $currentUser?.id || false
  let sceneImage = getSceneImage(scene)

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
      campaignCharactersIds: isGM ? campaign.characters : campaign.expand.characters.filter(c => c.creator === $currentUser?.id).map(c => c.id)
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

</script>


<div class="h-full w-full bg-contain bg-center bg-no-repeat overflow-hidden"
  style="background-image: url('{sceneImage}')">

  
  <div class="bg-surface-900/70 py-2">
    <h2 class="h2 text-center flex justify-center space-x-3">
      <p>{scene.name}</p>
      <a class="btn btn-sm m-0 variant-ghost-secondary" href="/campaigns/{campaign.id}">{campaign.name}</a>
    </h2>
  </div>

  <!-- Alerts -->
  {#if isGM}
    <div class="fixed right-3 bottom-3">
      <CampaignAlert campaignId={campaign.id} />
    </div>
  {/if}

  <!-- Characters -->
  <button
    class="btn btn-icon variant-outline-primary fixed right-2 top-2/4 p-1"
    on:click={openCharactersDrawer}
  >
    <GiPerson />
  </button>

  <!-- Campaign Notes -->
  <button
    class="btn btn-icon variant-outline-primary fixed left-2 top-2/4 p-1"
    on:click={openCampaignNotesDrawer}
  >
    <GiBookPile />
  </button>
  
  <!-- Character Notes (?) -->
  <!-- Chat -->
  <button
    class="btn btn-icon variant-outline-primary fixed left-2 top-1/4 p-1"
    on:click={openCampaignChatDrawer}
  >
    <MdChat />
  </button>
</div>
