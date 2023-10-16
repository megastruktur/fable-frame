<script lang="ts">
	import type { CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getSceneImage } from "$models/scenes";
	import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
	import GiPerson from 'svelte-icons/gi/GiPerson.svelte'
  import GiBookPile from 'svelte-icons/gi/GiBookPile.svelte'
	import CampaignChatWindow from "$lib/components/campaign-chat/CampaignChatWindow.svelte";
	import DiceRoller from "../dice/DiceRoller.svelte";

  export let scene: ScenesResponse
  export let campaign: CampaignsResponse

  let sceneImage = getSceneImage(scene)
  let campaignCharactersIds: string[]

  const drawerStore = getDrawerStore();

  async function openCharactersDrawer() {

    if (campaignCharactersIds === undefined) {
      campaignCharactersIds = campaign.characters
    }

    const characterDrawerSettings: DrawerSettings = {
      id: `campaign-character-list`,
      meta: {
        campaignCharactersIds: campaignCharactersIds
      },
      width: "w-96",
      position: "right",
    };
    drawerStore.open(characterDrawerSettings);
  }
  
  async function openCampaignNotesDrawer() {

    const campaignNotesDrawerSettings: DrawerSettings = {
      id: `campaign-notes-list`,
      meta: {
        campaignId: campaign.id
      },
      width: "w-96",
      position: "left",
    };
    drawerStore.open(campaignNotesDrawerSettings);
  }

</script>


<div class="h-full w-full relative bg-contain bg-center bg-no-repeat overflow-hidden"
  style="background-image: url('{sceneImage}')">

  <div class="bg-surface-900/70 py-2">
    <h1 class="h1 text-center">{scene.name}</h1>
  </div>

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
  <CampaignChatWindow
    {campaign} characters={campaign.expand.characters} />
</div>
