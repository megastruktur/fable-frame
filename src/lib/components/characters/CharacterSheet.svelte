<!-- All Characters -->
<script lang="ts">
	import { getCharacterAvatar, getCharacterTabs, getCharacterWithSystemAndCampaign, updateCharacterWithHash } from "$models/character";
	import { onDestroy, onMount } from "svelte";
  import { fieldErrors, headerBanner } from "$lib/stores"
	import type { Field, FieldError } from "$lib/types";

	import { type DrawerSettings, ProgressBar, getDrawerStore, getToastStore } from "@skeletonlabs/skeleton";
	import CharacterAvatar from "$lib/components/characters/CharacterAvatar.svelte";
	import type { CampaignsResponse, CharactersResponse } from "$lib/pocketbase-types";
	import { toastShowError } from "$lib/toast";

  import { fade } from "svelte/transition"
	import MediaQuery, { createMediaStore } from "svelte-media-queries";
	import { getCampaignImage } from "$models/campaign";
	import { currentUser } from "$lib/pocketbase";
	import { addCharacterField, removeCharacterField, updateCharacterField } from "$lib/characterFieldsOperations";

  const toastStore = getToastStore()

  export let character: CharactersResponse
  export let compactVersion: boolean = false

  let CharacterSheet: any
  let characterName: string = ""
  let compendiumFields: {
    [key: string]: Field[]
  } = {}
  let characterAvatarUrl: string = ""
  let campaign: CampaignsResponse

  let activeTabName: string = "general"
  let tabsContent: { [key: string]: Field[] } = {general: []}
  let tabs: {[key: string]: Field}
  let editMode: boolean = false

  const drawerStore = getDrawerStore()
  
  async function getData() {

    if (character.expand.campaign !== undefined) {

      campaign = character.expand.campaign
      let campaignImage = getCampaignImage(campaign)

      if (campaignImage !== "") {
        headerBanner.set(campaignImage)
      }
    }

    characterName = character.name

    // Dynamically load component
    if (character.expand.rpgSystem) {
      CharacterSheet = (await import(`../../../data/systems/${character.expand.rpgSystem.identifier}/components/CharacterSheet.svelte`)).default

      const compendiumFieldsRaw = character.expand.rpgSystem.data.fields.compendium

      compendiumFieldsRaw.map((field: Field) => {
        if (!compendiumFields[field.type]) {
          compendiumFields[field.type] = []
        }
        compendiumFields[field.type].push(field)
      })

      editMode = false
    }
  }

  onMount(() => {
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
        toastShowError(message, toastStore)
      })

      // Reset the store after showing errors.
      fieldErrors.reset()
    }
  })

  async function saveCharacter() {
    if (character && character.id) {
      try {
        await updateCharacterWithHash(character.id, character)
      }
      catch (e) {
        console.error(e)
      }
    }
  }

  
  async function toggleEditMode() {

    // If toggling from edit mode to non-edit - save the character
    if (editMode) {
      console.log(`Resetting character, loading from DB`)
      character = await getCharacterWithSystemAndCampaign(character.id)
    }

    editMode = !editMode
  }

  function saveChanges() {
    saveCharacter()
    editMode = false
  }

  function characterRename() {
    character.name = characterName
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
    fieldErrors.reset()
  }) //Stop events for calculation


  async function openCharacterNotesDrawer() {

    // Character Notes Drawer
    const characterNotesDrawerSettings: DrawerSettings = {
      id: "character-notes",
      position: "right",
      width: "w-96",
      meta: {
        characterId: character.id,
      }
    }

    drawerStore.open(characterNotesDrawerSettings)
  }

  async function fieldUpdate({detail: {field}} : {detail: {field: Field}}) {
    character = updateCharacterField(character, field)
    console.log("On Field Update")
  }

  async function fieldRemove({detail: {field}} : {detail: {field: Field}}) {
    character = removeCharacterField(character, field)
    console.log("On Field Remove")
  }

  async function fieldAdd({detail: {field}} : {detail: {field: Field}}) {
    character = addCharacterField(character, field)
    console.log("On Field Add")
  }

  async function avatarSet({detail: {avatar}} : {detail: {avatar: string}}) {
    character.avatar = avatar
  }

  function avatarSetHandler({detail: {avatar}} : {detail: {avatar: string}}) {
    character.avatar = avatar
    characterAvatarUrl = getCharacterAvatar(character)
  }

</script>

{#await getData()}
  <div class="flex justify-center">
    <ProgressBar />
  </div>
{:then}

{#if $currentUser !== null}
  {#key editMode}
    <div
      out:fade={{ duration: 500 }}
      in:fade={{ duration: 500, delay: 500 }}
      class="flex flex-col items-center mb-3"
      >
      <div class="mt-3">
        <CharacterAvatar characterName={character.name} characterId={character.id} avatarUrl={characterAvatarUrl} {editMode} on:avatarSet={avatarSetHandler} />
      </div>

      <h1 class="h2 my-3 items-center flex">
        {#if editMode}
          <input type="text" class="input h2 text-center" bind:value={characterName} on:focusout={characterRename}/>
        {:else}
          <span>{characterName}</span>
          {#if campaign !== undefined}
            <a class="btn ml-3 variant-ghost-tertiary" href="/campaigns/{campaign.id}">{campaign.name}</a>
          {/if}
        {/if}
      </h1>

      {#if $currentUser.id === character.creator}
        <div class="flex items-center justify-center mt-4">
          <button class="btn uppercase {editMode ? "variant-filled-tertiary" : "variant-filled-secondary"}" on:click={toggleEditMode}>{editMode ? "cancel" : "edit"}</button>
          <!-- cancel edit button -->
          {#if editMode}
            <button class="btn uppercase variant-filled-success ml-3" on:click={saveChanges}>save</button>
          {/if}
          <button class="btn variant-filled-warning ml-3" on:click={openCharacterNotesDrawer}>NOTES</button>
        </div>
      {/if}

      <!-- Character Sheet -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="mt-4 w-full">
        {#if CharacterSheet}
          <MediaQuery query='(max-width: 1200px)' let:matches>

            <!-- Tabs -->
            {#if matches || compactVersion}
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
            {#if character !== undefined}

            <div class="flex flex-wrap justify-center">
              <svelte:component this={CharacterSheet} {compactVersion} {matches} {tabs} {tabsContent} {activeTabName} editMode={editMode}
              character={character}
              on:fieldUpdate={fieldUpdate}
              on:fieldRemove={fieldRemove}
              on:fieldAdd={fieldAdd}
              />
            </div>
            {/if}

          </MediaQuery>
        {/if}
      </div>
    </div>
    {/key}
  {/if}
{/await}
