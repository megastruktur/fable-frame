<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { getCharacter, updateCharacterWithHash } from "$models/character";
	import { onMount } from "svelte";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";
  import toast from "svelte-french-toast";
  import fieldDragStart from "$lib/fieldDragStart"

  let CharacterSheet: any
  let characterName: string = ""
  let compendiumFields: {
    [key: string]: Field[]
  } = {}
  
  onMount(async () => {

    $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem"}))

    characterName = $characterStore.name
    /* @vite-ignore */
    CharacterSheet = (await import(`../../../data/systems/${$characterStore.expand.rpgSystem.identifier}/components/CharacterSheet.svelte`)).default

    const compendiumFieldsRaw = $characterStore.expand.rpgSystem.data.fields.compendium

    compendiumFieldsRaw.map((field: Field) => {
      if (!compendiumFields[field.type]) {
        compendiumFields[field.type] = []
      }
      compendiumFields[field.type].push(field)
    })

    editMode.set(false)
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

  function comendiumDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer) {
      const json = event.dataTransfer.getData("text/plain")
      const field = JSON.parse(json)
      try {
        characterStore.addField(field)
        toast.success(`Field added: ${field.name}`)
        console.log(`Field "${field.name}" added`)
      }
      catch (e) {
        console.error(e)
      }
    }
  }


</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-3">{characterName}</h1>


  <div class="flex items-center justify-center">
    <label for="compendium-drawer" class="drawer-button btn btn-accent">Open compendium</label>
    <button class="btn {$editMode ? "btn-error" : "btn-neutral"}" on:click={toggleEditMode}>edit</button>
  </div>

  <!-- Character Sheet -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div>
    <svelte:component this={CharacterSheet} />
  </div>

  <!-- Compendium drawer -->
  <div class="drawer drawer-end">
    <input id="compendium-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label
        for="compendium-drawer"
        class="drawer-overlay"
        on:dragenter={() => console.log("Drag Enter")}
        on:drop={event => comendiumDrop(event)}
        on:dragover={(ev) => { ev.preventDefault() }}
        ></label>

      <ul
        class="menu p-4 w-80 h-full bg-base-200 text-base-content"
      >
        {#each Object.entries(compendiumFields) as [fieldType, fields]}
        <div class="collapse bg-base-200">
          <input type="checkbox" /> 
          <div class="collapse-title text-xl font-medium">
            {fieldType}
          </div>
          <div class="flex w-60 flex-wrap collapse-content justify-between">
            <!-- {console.log(fields)} -->
            {#each fields as field}
              <button
                type="button"
                class="flex btn btn-ghost"
                draggable={true}
                on:dragstart={event => fieldDragStart(event, field)}
              >{field.name}</button>
            {/each}
          </div>
        </div>
        {/each}
      </ul>
    </div>
  </div>
</div>
