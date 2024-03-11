<script lang="ts">
	import type { CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { toastShow } from "$lib/toast";
	import { getBgCharacterImage } from "$models/character";
	import { clipboard, getToastStore } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
	import { truncateText } from "$lib/utils";
	import SquareCard from "../global/SquareCard.svelte";
	import CircleIconButton from "../global/CircleIconButton.svelte";
  import { Base64 } from 'js-base64';

  const toastStore = getToastStore()
  const dispatch = createEventDispatcher()

  export let character: CharactersResponse
  export let rpgSystem: RpgSystemsResponse
  export let classes: string = ""
  export let renderActionButtons: boolean = false

  let bgCharacterImage = getBgCharacterImage(character, rpgSystem)

	function getCharacterExport(): string {

    const exportObject = {
      rpgSystem: character.rpgSystem,
      fields: character.fields,
    }

    // Base64 encode the JSON object
    return Base64.encode(JSON.stringify(exportObject))
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
      <CircleIconButton
        on:click={cloneCharacterEvent}
        icon="i-[la--clone-solid]"
        color="variant-ghost-warning"
      />
      <button
        use:clipboard={getCharacterExport()}
        >
        <CircleIconButton
          on:click={() => toastShow("Character copied to clipboard", toastStore)}
          icon="i-[mdi--export]"
          color="variant-ghost-success"
        />
      </button>

      <CircleIconButton
        on:click={deleteCharacterPromptEvent}
        icon="i-[material-symbols--delete]"
        color="variant-ghost-error"
      />
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
