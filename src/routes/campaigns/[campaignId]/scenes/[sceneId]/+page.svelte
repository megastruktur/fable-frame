<script lang="ts">
	import { page } from "$app/stores";
	import type { CampaignNotesResponse, CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getCampaign } from "$models/campaign";
	import { getScene, getSceneImage } from "$models/scenes";
	import { ProgressBar, getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
	import GiPerson from 'svelte-icons/gi/GiPerson.svelte'
  import GiBookPile from 'svelte-icons/gi/GiBookPile.svelte'
	import CampaignChatWindow from "$lib/components/campaign-chat/CampaignChatWindow.svelte";

  let scene: ScenesResponse
  let sceneImage: string
  let campaignCharactersIds: string[]
  let campaign: CampaignsResponse
  let campaignNotes: CampaignNotesResponse

  const drawerStore = getDrawerStore();

  async function loadData() {
    scene = await getScene($page.params.sceneId)
    campaign = await getCampaign($page.params.campaignId, {
      expand: "characters"
    })
    sceneImage = getSceneImage(scene)
  }

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

<div class="h-screen w-screen absolute top-0">
  {#await loadData()}
    <ProgressBar />
  {:then}
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
      <!-- Dice -->
    </div>
  {/await}
</div>
