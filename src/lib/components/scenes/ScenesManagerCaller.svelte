<script lang="ts">
	import type { CampaignsResponse } from "$lib/pocketbase-types";
	import { getCampaignScenes } from "$models/scenes";
	import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
	import CircleIconButton from "../global/CircleIconButton.svelte";


  export let campaign: CampaignsResponse
  export let classes: string = ""
  export let position: "left" | "right" | "top" | "bottom" = "right"

  const drawerStore = getDrawerStore()

  async function openScenesManagerDrawer() {

    const scenes = await getCampaignScenes(campaign.id)
    const scenesManagerDrawerSettings: DrawerSettings = {
      id: `scenes-manager`,
      meta: {
        scenes: scenes,
        campaign: campaign,
      },
      width: "w-80",
      position: position,
    };

    drawerStore.open(scenesManagerDrawerSettings);
  }
</script>

<CircleIconButton
  on:click={openScenesManagerDrawer}
  icon="i-[game-icons--steel-door]"
  color={classes}
  />
