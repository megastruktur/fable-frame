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


  $: $characterStore

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

  
  async function toggleEditMode() {

    // If toggling from edit mode to non-edit - save the character
    if ($editMode) {
      console.log(`Resetting character, loading from DB`)
      $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem"}))
    }

    editMode.set(!$editMode)
  }

  function saveChanges() {
    saveCharacter()
    editMode.set(false)
  }


</script>

<div class="flex flex-col">
	<h1 class="h1 text-3xl m-auto my-3">{characterName}</h1>

  <hr />

  <div class="flex items-center justify-center mt-4">
    <button class="btn uppercase {$editMode ? "variant-filled-tertiary" : "variant-filled-secondary"}" on:click={toggleEditMode}>{$editMode ? "cancel" : "edit"}</button>
    <!-- cancel edit button -->
    {#if $editMode}
      <button class="btn uppercase variant-filled-success ml-3" on:click={saveChanges}>save</button>
    {/if}
  </div>

  <!-- Character Sheet -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="mt-4">
    {#if CharacterSheet}
      <svelte:component this={CharacterSheet} />
    {/if}
  </div>
</div>
