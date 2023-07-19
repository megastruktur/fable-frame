<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { getCharacter, updateCharacterWithHash } from "$models/character";
	import { onMount } from "svelte";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";
  import fieldDragStart from "$lib/fieldDragStart"
  import { Drawer, Toast, drawerStore, toastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';

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
        const t: ToastSettings = {
          message: `Field added: ${field.name}`,
        };
        toastStore.trigger(t);
        console.log(`Field "${field.name}" added`)
      }
      catch (e) {
        console.error(e)
      }
    }
  }


</script>

<div class="flex flex-col">
	<h1 class="h1 text-3xl m-auto my-3">{characterName}</h1>

  <hr />
  <br />

  <div class="flex items-center justify-center">
    <button class="btn variant-outline-primary" on:click={() => drawerStore.open()}>Open compendium</button>
    <button class="btn {$editMode ? "variant-filled-error" : "variant-filled-secondary"}" on:click={toggleEditMode}>edit</button>
  </div>

  <!-- Character Sheet -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div>
    <svelte:component this={CharacterSheet} />
  </div>

  <!-- Compendium drawer -->
  <Drawer>
    <!-- <label
      for="compendium-drawer"
      class="drawer-overlay"
      on:dragenter={() => console.log("Drag Enter")}
      on:drop={event => comendiumDrop(event)}
      on:dragover={(ev) => { ev.preventDefault() }}
      ></label> -->

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
  </Drawer>
</div>
