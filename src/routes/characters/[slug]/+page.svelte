<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { getCharacter, updateCharacterWithHash } from "$models/character";
	import { onMount } from "svelte";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";

  let CharacterSheet: any
  let characterName: string = ""
  let compendiumFields: {
    [key: string]: Field[]
  } = {}
  
  onMount(async () => {

    $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem"}))

    characterName = $characterStore.name

    if ($characterStore.expand.rpgSystem) {
      CharacterSheet = (await import(`../../../data/systems/${$characterStore.expand.rpgSystem.identifier}/components/CharacterSheet.svelte`)).default

      const compendiumFieldsRaw = $characterStore.expand.rpgSystem.data.fields.compendium

      compendiumFieldsRaw.map((field: Field) => {
        if (!compendiumFields[field.type]) {
          compendiumFields[field.type] = []
        }
        compendiumFields[field.type].push(field)
      })

      editMode.set(false)
    }
  })


  $: $characterStore, saveCharacter()

  async function saveCharacter() {
    if ($characterStore && $characterStore.id) {
      try {
        await updateCharacterWithHash($characterStore.id, $characterStore)
      }
      catch (e) {
        console.error(e)
      }
    }
  }

  function toggleEditMode() {
    editMode.set(!$editMode)
  }


</script>

<div class="flex flex-col">
	<h1 class="h1 text-3xl m-auto my-3">{characterName}</h1>

  <hr />

  <div class="flex items-center justify-center mt-4">
    <button class="btn {$editMode ? "variant-filled-error" : "variant-filled-secondary"}" on:click={toggleEditMode}>edit</button>
  </div>

  <!-- Character Sheet -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="mt-4">
    {#if CharacterSheet}
      <svelte:component this={CharacterSheet} />
    {/if}
  </div>
</div>
