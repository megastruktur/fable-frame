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

    <button class="btn btn-icon text-2xl {isAcivated ? "text-white variant-ghost-success" : "text-gray-400 variant-ghost-surface"}" on:click|stopPropagation={activateSceneHandler}>
      {#if isAcivated}
        <i class="i-[fa6-solid--eye]" />
      {:else}
        <i class="i-[fa6-solid--eye-slash]" />
      {/if}
    </button>

    <button class="btn btn-icon variant-ghost-secondary text-2xl" on:click={sceneEditModalHandler}>
      <i class="i-[fa--pencil]" />
    </button>
    
    <button class="btn btn-icon variant-ghost-error text-2xl"  on:click={deleteScenePromptHandler}>
      <i class="i-[material-symbols--delete]" />
    </button>

  </svelte:fragment>
</SquareCard>


