<script lang="ts">
	import type { ScenesResponse } from "$lib/pocketbase-types"
	import { getSceneImage } from "$models/scenes";
	import { type ModalComponent, type PopupSettings, type ModalSettings, getModalStore } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
	import SceneEdit from './SceneEdit.svelte';
	import SquareCard from "../global/SquareCard.svelte";

  // BsCheckLg

  export let scene: ScenesResponse
  export let classes: string = ""
  export let isAcivated = false

  const dispatch = createEventDispatcher()
  const modalStore = getModalStore()

  let sceneImage = getSceneImage(scene)

  if (sceneImage === "") {
    sceneImage = "/images/fantasy-background-campaign.jpg"
  }

  const sceneOperationsPopup: PopupSettings = {
		event: 'focus-click',
		target: `sceneOperationsPopup-${scene.id}`,
		placement: 'bottom',
		closeQuery: '.list-option'
	};
  

  async function activateSceneHandler() {
    if (isAcivated) {
      dispatch("deactivateScene", {
        sceneId: scene.id,
        campaignId: scene.campaign
      })
    }
    else {
      dispatch("activateScene", {
        sceneId: scene.id,
        campaignId: scene.campaign
      })
    }
  }

  function deleteScenePromptHandler() {
    dispatch("deleteScenePrompt", {
      sceneId: scene.id,
    })
  }

  async function sceneEditModalHandler() {
    
    const SceneEditModalComponent: ModalComponent = {
      ref: SceneEdit,
      props: {
        campaignId: scene.campaign,
        sceneId: scene.id
      },
    }
    
    const sceneEditModal: ModalSettings = {
      type: 'component',
      component: SceneEditModalComponent,
      response: async ({scene, action}: {scene: ScenesResponse | null, action: string} = {scene: null, action: ""}) => {
        if (scene !== undefined && scene !== null) {
          if (action === "update") {
            dispatch("updatedScene", {
              scene: scene
            })
            sceneImage = getSceneImage(scene)
          }
        }
      },
    }
    modalStore.trigger(sceneEditModal);
  }


</script>

<SquareCard
  classes={classes}
  link="/campaigns/{scene.campaign}/scenes/{scene.id}"
  title="{scene.name}"
  imageUrl="{sceneImage}"
  >
  <svelte:fragment slot="actionButtons">

    <button class="btn btn-icon btn-icon-sm {isAcivated ? "text-white" : "text-gray-400"}" on:click|stopPropagation={activateSceneHandler}>
      {#if isAcivated}
        <i class="i-[fa6-solid--eye] text-5xl" />
      {:else}
        <i class="i-[fa6-solid--eye-slash] text-5xl" />
      {/if}
    </button>

    <button class="btn btn-icon btn-icon-sm" on:click={sceneEditModalHandler}>
      <i class="i-[fa--pencil] text-2xl" />
    </button>
    
    <button class="btn btn-icon btn-icon-sm"  on:click={deleteScenePromptHandler}>
      <i class="i-[material-symbols--delete] text-2xl" />
    </button>

  </svelte:fragment>
</SquareCard>


