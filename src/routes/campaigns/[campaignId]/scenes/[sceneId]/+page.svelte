<script lang="ts">
	import { page } from "$app/stores";
	import type { CampaignNotesResponse, CampaignsResponse, ScenesResponse } from "$lib/pocketbase-types";
	import { getCampaign } from "$models/campaign";
	import { getScene, getSceneImage } from "$models/scenes";
	import { ProgressBar, getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
	import GiPerson from 'svelte-icons/gi/GiPerson.svelte'
  import GiBookPile from 'svelte-icons/gi/GiBookPile.svelte'

  let scene: ScenesResponse
  let sceneImage: string
  let campaignCharactersIds: string[]
  let campaign: CampaignsResponse
  let campaignNotes: CampaignNotesResponse

  const drawerStore = getDrawerStore();

  async function loadData() {
    scene = await getScene($page.params.sceneId)
    sceneImage = getSceneImage(scene)
  }

  async function openCharactersDrawer() {

    if (campaignCharactersIds === undefined) {

      if (campaign === undefined) {
        campaign = await getCampaign($page.params.campaignId)
      }
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
    if (campaign === undefined) {
      campaign = await getCampaign($page.params.campaignId)
    }

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

<div class="">
  {#await loadData()}
    <ProgressBar />
  {:then}
    <div class="w-screen h-screen bg-contain bg-center relative bg-no-repeat"
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
      <!-- Dice -->
    </div>
  {/await}
</div>
