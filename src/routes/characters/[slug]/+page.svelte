<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { deleteCharacter, getCharacter, getCharacterAvatar, getCharacterTabs, updateCharacterWithHash } from "$models/character";
	import { onMount, onDestroy } from "svelte";
  import { characterStore, fieldErrors, editMode, characterNotesStore, headerBanner } from "$lib/stores"
	import type { Field, FieldError } from "$lib/types";

	import { type DrawerSettings, drawerStore, ProgressBar } from "@skeletonlabs/skeleton";
	import CharacterAvatar from "$lib/components/characters/CharacterAvatar.svelte";
	import type { CampaignResponse, CharactersResponse } from "$lib/pocketbase-types";
	import { toastShowError } from "$lib/toast";

  import { fade } from "svelte/transition"
	import MediaQuery, { createMediaStore } from "svelte-media-queries";
	import { getCharacterNotesByCharacterId } from "$models/character_notes";
	import { getCampaignImage } from "$models/campaign";

  let CharacterSheet: any
  let characterName: string = ""
  let compendiumFields: {
    [key: string]: Field[]
  } = {}
  let characterAvatarUrl: string = ""
  let characterId: string = ""
  let campaign: CampaignResponse

  let activeTabName: string = "general"
  let tabsContent: { [key: string]: Field[] } = {general: []}
  let tabs: {[key: string]: Field}
  

  async function getData() {

    // @todo Think about preloading character via server instead as it loads as undefined first.
    $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem,campaign"}))

    if ($characterStore.expand.campaign !== undefined) {

      campaign = $characterStore.expand.campaign
      let campaignImage = getCampaignImage(campaign)

      if (campaignImage !== "") {
        headerBanner.set(campaignImage)
      }
    }

    // Load Character Notes
    $characterNotesStore = (await getCharacterNotesByCharacterId($page.params.slug))

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
  }

  // onMount(async () => {


  //   // @todo Think about preloading character via server instead as it loads as undefined first.
  //   $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem,campaign"}))

  //   if ($characterStore.expand.campaign !== undefined) {

  //     campaign = $characterStore.expand.campaign
  //     let campaignImage = getCampaignImage(campaign)

  //     if (campaignImage !== "") {
  //       headerBanner.set(campaignImage)
  //     }
  //   }

  //   // Load Character Notes
  //   $characterNotesStore = (await getCharacterNotesByCharacterId($page.params.slug))

  //   characterName = $characterStore.name
  //   characterId = $characterStore.id

  //   // Dynamically load component
  //   if ($characterStore.expand.rpgSystem) {
  //     CharacterSheet = (await import(`../../../data/systems/${$characterStore.expand.rpgSystem.identifier}/components/CharacterSheet.svelte`)).default

  //     const compendiumFieldsRaw = $characterStore.expand.rpgSystem.data.fields.compendium

  //     compendiumFieldsRaw.map((field: Field) => {
  //       if (!compendiumFields[field.type]) {
  //         compendiumFields[field.type] = []
  //       }
  //       compendiumFields[field.type].push(field)
  //     })

  //     editMode.set(false)
  //   }
  // })

  const unsubscribeCharacterStore = characterStore.subscribe((character: CharactersResponse) => {
    
    console.log("-------- Character --------")
    console.log(character)

    if (character !== undefined) {
      characterAvatarUrl = getCharacterAvatar(character)

      tabs = getCharacterTabs(character)
      tabsContent = {general: []}
  
      // Cleanup tabsContent and Create tabs placeholders
      Object.keys(tabs).forEach((tabName: string) => {
        tabsContent[tabName] = []
      })
  
      character.fields.forEach((field: Field) => {
        if (field.group && field.type !== "tab") {
  
          // If tab doens't exist add fields to "general" tab.
          let tabExists = (tabs[field.group] !== undefined) ? true : false
          let tabNameToAdd = "general"
  
          if (tabExists) {
            tabNameToAdd = field.group
          }

          tabsContent[tabNameToAdd] = [...tabsContent[tabNameToAdd], field]
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
    characterNotesStore.reset()
    characterStore.reset()
  }) //Stop events for calculation


  async function openCharacterNotesDrawer() {

    // Character Notes Drawer
    const characterNotesDrawerSettings: DrawerSettings = {
      id: "character-notes",
      position: "right",
    }

    drawerStore.open(characterNotesDrawerSettings)
  }

</script>

{#await getData()}
  <div class="flex justify-center">
    <ProgressBar />
  </div>
{:then}

  {#key $editMode}
  <div
    out:fade={{ duration: 500 }}
    in:fade={{ duration: 500, delay: 500 }}
    class="flex flex-col items-center mb-3"
    >
    <div class="mt-3">
      <CharacterAvatar characterName={$characterStore.name} characterId={characterId} avatarUrl={characterAvatarUrl} editMode={$editMode} />
    </div>

    <h1 class="h2 my-3">
      {#if $editMode}
        <input type="text" class="input h2 text-center" bind:value={characterName} on:focusout={characterRename}/>
      {:else}
        <span>{characterName}</span>
      {/if}
    </h1>

    <hr />

    <div class="flex items-center justify-center mt-4">
      <button class="btn uppercase {$editMode ? "variant-filled-tertiary" : "variant-filled-secondary"}" on:click={toggleEditMode}>{$editMode ? "cancel" : "edit"}</button>
      <!-- cancel edit button -->
      {#if $editMode}
        <button class="btn uppercase variant-filled-success ml-3" on:click={saveChanges}>save</button>
      {/if}
      <button class="btn variant-filled-warning ml-3" on:click={openCharacterNotesDrawer}>notes</button>
    </div>

    <!-- Character Sheet -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="mt-4 w-full">
      {#if CharacterSheet}
        <MediaQuery query='(max-width: 1200px)' let:matches>

          <!-- Tabs -->
          {#if matches}
          <div class="flex flex-wrap justify-center mb-2">
            {#each Object.keys(tabs) as tabName}
            <button
              class="btn btn-sm {tabName === activeTabName ? "tab-active bg-neutral-900/90" : "bg-neutral-900/50"}"
              on:click|preventDefault={() => activeTabName = tabName}
              >{tabs[tabName].label}</button>
            {/each}
          </div>
          {/if}

          <!-- Character Sheet content -->
          {#if $characterStore !== undefined}

          <div class="flex flex-wrap justify-center">
            <svelte:component this={CharacterSheet} {matches} {tabs} {tabsContent} {activeTabName} editMode={$editMode}/>
          </div>
          {/if}

        </MediaQuery>
      {/if}
    </div>
  </div>
  {/key}
{/await}
