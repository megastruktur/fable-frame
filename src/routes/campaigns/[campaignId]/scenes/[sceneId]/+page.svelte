<script lang="ts">
	import { page } from "$app/stores";
	import type { ScenesResponse } from "$lib/pocketbase-types";
	import { getCampaign } from "$models/campaign";
	import { getScene, getSceneImage } from "$models/scenes";
	import { ProgressBar, getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
	import GiPerson from 'svelte-icons/gi/GiPerson.svelte'

  let scene: ScenesResponse
  let sceneImage: string
  let campaignCharactersIds: string[]

  const drawerStore = getDrawerStore();

  async function loadData() {
    scene = await getScene($page.params.sceneId)
    sceneImage = getSceneImage(scene)
  }

  async function openCharactersDrawer() {

    if (campaignCharactersIds === undefined) {
      const campaign = await getCampaign($page.params.campaignId)
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
    console.log(characterDrawerSettings)
    drawerStore.open(characterDrawerSettings);
  }
  
</script>

<div>
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
        class="btn btn-icon fixed right-0 top-2/4"
        on:click={openCharactersDrawer}
      >
        <GiPerson />
      </button>
      
      <!-- Campaign Notes -->
      <!-- Character Notes (?) -->
      <!-- Chat -->
      <!-- Dice -->
    </div>
  {/await}
</div>
