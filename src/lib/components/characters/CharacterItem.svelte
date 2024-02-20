<script lang="ts">
	import type { CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { toastShow } from "$lib/toast";
	import { getCharacterAvatar } from "$models/character";
	import { getRpgSystemImage } from "$models/rpg_system";
	import { clipboard, getToastStore } from "@skeletonlabs/skeleton";
	import SquareCard from "../global/SquareCard.svelte";
	import { createEventDispatcher } from "svelte";
	import { truncateText } from "$lib/utils";

  const toastStore = getToastStore()
  const dispatch = createEventDispatcher()

  export let character: CharactersResponse
  export let rpgSystem: RpgSystemsResponse
  export let classes: string = ""
  export let renderActionButtons: boolean = false

  let bgCharacterImage = getBgCharacterImage()

  // Get the Avatar. If Avatar is not set - take Campaign image.
  function getBgCharacterImage(): string {

    let image: string = ""

    image = getCharacterAvatar(character)
    if (image === "") {
      image = getRpgSystemImage(rpgSystem)
    }

    return image
  }


	function getCharacterJson(): string {

    const exportObject = {
      rpgSystem: character.rpgSystem,
      fields: character.fields,
    }

    return JSON.stringify(exportObject)
	}

  function cloneCharacterEvent(): void {
    dispatch("cloneCharacter", {
      characterId: character.id,
    })
  }

  function deleteCharacterPromptEvent(): void {
    dispatch("deleteCharacter", {
      characterId: character.id,
    })
  }
  
</script>

<SquareCard
  imageUrl={bgCharacterImage}
  title={character.name}
  link="/characters/{character.id}"
  subtitle={rpgSystem !== undefined ? rpgSystem.name : ""}
  {classes}
  >
  <svelte:fragment slot="actionButtons">
    {#if renderActionButtons}
      <button class="btn btn-icon btn-icon-sm variant-ghost-warning" on:click={cloneCharacterEvent}>
        <i class="i-[la--clone-solid] text-3xl" />
      </button>
      <button class="btn btn-icon btn-icon-sm variant-ghost-success"
        on:click={() => toastShow("Character copied to clipboard", toastStore)}
        use:clipboard={getCharacterJson()}>
        <i class="i-[mdi--export] text-2xl" />
      </button>
      <button
        class="btn btn-icon btn-icon-sm variant-ghost-error"
        on:click={deleteCharacterPromptEvent}>
        <i class="i-[material-symbols--delete] text-3xl" />
      </button>
    {/if}

  </svelte:fragment>

  <svelte:fragment slot="linkButtons">
    {#if character.expand?.campaign !== undefined}
      <article class="mt-3">
        <a class="btn variant-ghost-warning text-wrap" href="/campaigns/{character.expand.campaign.id}">{truncateText(character.expand.campaign.name, 25)}</a>
      </article>
    {/if}
  </svelte:fragment>
</SquareCard>
