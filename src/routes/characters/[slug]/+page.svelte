<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { deleteCharacter, getCharacter, getCharacterAvatar, getCharacterTabs, updateCharacterWithHash } from "$models/character";
	import { onMount, onDestroy } from "svelte";
  import { characterStore, fieldErrors, editMode } from "$lib/stores"
	import type { Field, FieldError } from "$lib/types";

  // Icons
  import Icon from "svelte-icons-pack"
  import FaSolidSkull from "svelte-icons-pack/fa/FaSolidSkull";

	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { goto } from "$app/navigation";
	import CharacterAvatar from "$lib/components/CharacterAvatar.svelte";
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import { toastShow, toastShowError } from "$lib/toast";

  import { crossfade, fade } from "svelte/transition"
  import { backOut } from 'svelte/easing';
	import MediaQuery, { createMediaStore } from "svelte-media-queries";

  let CharacterSheet: any
  let characterName: string = ""
  let compendiumFields: {
    [key: string]: Field[]
  } = {}
  let characterAvatarUrl: string = ""
  let characterId: string = ""

  let activeTabName: string = "general"
  let tabsContent: { [key: string]: Field[] } = {general: []}
  let tabs: {[key: string]: Field}

  // Animation
  export const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        css: (t) => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `
      };
    }
  })
  
  onMount(async () => {

    // @todo Think about preloading character via server instead as it loads as undefined first.
    $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem"}))

    characterName = $characterStore.name
    characterId = $characterStore.id

    // Dynamically load component
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


  const unsubscribeCharacterStore = characterStore.subscribe((character: CharactersResponse) => {
    
    console.log("----------------")
    console.log(character)

    if (character !== undefined) {
      characterAvatarUrl = getCharacterAvatar(character)

      tabs = getCharacterTabs(character)
      tabsContent = {general: []}
  
      // Cleanup tabsContent and Create tabs placeholders
      Object.keys(tabs).forEach((tabName: string) => {
        tabsContent[tabs[tabName].name] = []
      })
  
      character.fields.forEach((field: Field) => {
        if (field.group && field.type !== "tab") {
  
          // If tab doens't exist add fields to "general" tab.
          let tabExists = (tabs[field.group] !== undefined)? true : false
          let tabNameToAdd = "general"
  
          if (tabExists) {
            tabNameToAdd = field.group
          }
          
          if (tabsContent[field.group] === undefined) {
            tabsContent[field.group] = []
          }
          tabsContent[tabNameToAdd] = [...tabsContent[field.group], field]
        }
      })

      // Reorder all objects inside tabsContent by weight property.
      Object.keys(tabsContent).forEach((key: string) => {
        tabsContent[key].sort((a: Field, b: Field) => {
          return a.weight - b.weight
        })
      })
    }
  })


  // Show errors.
  fieldErrors.subscribe((errors: FieldError[]) => {
    
    if (errors.length > 0) {
      errors.forEach((fieldError: FieldError) => {
        let message = `${fieldError.fieldId !== "" ? "Field " + fieldError.fieldId + ": " : ""}` + fieldError.message
        toastShowError(message)
      })

      // Reset the store after showing errors.
      fieldErrors.reset()
    }
  })

  function deleteCharacterPrompt() {

    const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: `Are you sure you want to remove character <span class="text-error-900">${characterName}</span>? This action cannot be undone.`,
        response: async (r: boolean) => {
          if (r === true) {
            await deleteCharacter($characterStore.id)

            toastShow(`Character <span class="text-error-900">${characterName}</span> has been removed`)

            goto("/characters")
          }
        }
      };
      modalStore.trigger(modal);
  }

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

  function characterRename() {
    characterStore.rename(characterName)
  }


  const query = {
    "mobile": "(max-width: 480px)",
    "tablet": "(min-width: 480px) and (max-width: 768px)",
    "largeTablet": "(min-width: 768px) and (max-width: 1200px)",
    "desktop": "(min-width: 1200px)",
    "other": [
      "(min-width: 1200px)",
      "(max-height: 900px)"
    ],
    "themes": {
      "dark": "(prefers-color-scheme: dark)",
      "light": "(prefers-color-scheme: light)"
    }
  } //

  const matches = createMediaStore(query) //The type of the store will completely repeat the query

  onDestroy(() => {
    matches.destroy()
    unsubscribeCharacterStore()
    fieldErrors.reset()
  }) //Stop events for calculation

</script>

{#key $editMode}
<div 
  out:fade={{ duration: 500 }}
  in:fade={{ duration: 500 }}
  class="flex flex-col items-center my-3"
  >
  <CharacterAvatar characterId={characterId} avatarUrl={characterAvatarUrl} />
	<h1 class="h1 text-3xl m-auto my-3 flex">
    {#if $editMode}
      <input type="text" class="input" bind:value={characterName} on:focusout={characterRename}/>
    {:else}
      <span>{characterName}</span>
    {/if}
    {#if $editMode}
    <button class="btn-icon btn-icon-m variant-filled-error mx-3" on:click={deleteCharacterPrompt}><Icon src={FaSolidSkull} /></button>
    {/if}
  </h1>

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
  <div class="mt-4 w-full">
    {#if CharacterSheet}
      <MediaQuery query='(max-width: 1200px)' let:matches>

        <!-- Tabs -->
        {#if matches}
        <div class="tabs tabs-boxed w-72">
          {#each Object.keys(tabs) as tabName}
          <a
            href="/"
            class="tab p-1 {tabName === activeTabName ? "tab-active bg-neutral-900/90" : "bg-neutral-900/50"}"
            on:click|preventDefault={() => activeTabName = tabName}
            >{tabs[tabName].label}</a>
          {/each}
        </div>
        {/if}

        <!-- Character Sheet content -->
        {#if $characterStore !== undefined}
        <svelte:component this={CharacterSheet} {matches} {tabs} {tabsContent} {activeTabName} />
        {/if}

      </MediaQuery>
    {/if}
  </div>
</div>
{/key}
