<!-- All Characters -->
<script lang="ts">
	import { getCharacterAvatar, getCharacterTabs, getCharacterWithSystemAndCampaign, updateCharacterWithHash } from "$models/character";
	import { onDestroy, onMount } from "svelte";
  import { fieldErrors, headerBanner } from "$lib/stores"
	import type { Field, FieldError } from "$lib/types";

	import { type DrawerSettings, ProgressBar, getDrawerStore, getToastStore } from "@skeletonlabs/skeleton";
	import CharacterAvatar from "$lib/components/characters/CharacterAvatar.svelte";
	import type { CampaignsResponse, CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { toastShowError } from "$lib/toast";

  import { fade } from "svelte/transition"
	import MediaQuery, { createMediaStore } from "svelte-media-queries";
	import { getCampaignImage } from "$models/campaign";
	import { currentUser } from "$lib/pocketbase";
	import { addCharacterField, removeCharacterField, updateCharacterField, createCharacterField, updateSaveCharacterField } from "$lib/characterFieldsOperations";
	import { getRpgSystemImage } from "$models/rpg_system";
	import CircleIconButton from "../global/CircleIconButton.svelte";

  const toastStore = getToastStore()

  export let character: CharactersResponse
  export let rpgSystem: RpgSystemsResponse
  export let campaign: CampaignsResponse
  export let compactVersion: boolean = false

  let CharacterSheet: any
  let characterName: string = ""
  let compendiumFields: {
    [key: string]: Field[]
  } = {}
  let characterAvatarUrl: string = ""

  let activeTabName: string = "general"
  let tabsContent: { [key: string]: Field[] } = {general: []}
  let tabs: {[key: string]: Field}
  let editMode: boolean = false

  const drawerStore = getDrawerStore()
  
  async function getData() {

    // Set BG image
    let backgoundImage: string = ""
    if (character.expand?.campaign !== undefined) {

      campaign = character.expand.campaign
      backgoundImage = getCampaignImage(campaign)

    }
    else if (rpgSystem !== undefined) {
      backgoundImage = getRpgSystemImage(rpgSystem)
    }
    console.log(backgoundImage)

    if (backgoundImage !== "") {
      headerBanner.set(backgoundImage)
    }

    characterName = character.name

    // Dynamically load component
    if (rpgSystem !== undefined) {
      CharacterSheet = (await import(`../../../data/systems/${rpgSystem.identifier}/components/CharacterSheet.svelte`)).default

      const compendiumFieldsRaw = rpgSystem.data.fields.compendium

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
    characterPrepare()
  })

  function characterPrepare() {
    console.log("-------- Character --------")
    console.log(character)

    if (character !== undefined) {
      characterTabsPrepare()
    }
  }

  function characterTabsPrepare() {
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
        characterTabsPrepare()
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
      characterTabsPrepare()
      characterName = character.name
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
      width: "w-80",
      meta: {
        characterId: character.id,
      }
    }

    drawerStore.open(characterNotesDrawerSettings)
  }

  async function fieldUpdate({detail: {field, saveField}} : {detail: {field: Field, saveField: boolean | undefined}}) {

    if (saveField !== undefined && saveField) {
      character = await updateSaveCharacterField(character.id, field)
    }
    else {
      character = updateCharacterField(character, field)
    }
    console.log("On Field Update")
  }

  async function fieldRemove({detail: {field}} : {detail: {field: Field}}) {
    character = removeCharacterField(character, field)

    if (field.type !== "tab") {
      if (field.group !== undefined) {
        let tabname = "general"
        if (tabsContent[field.group] !== undefined) {
          tabname = field.group
        }
        tabsContent[tabname] = tabsContent[tabname].filter((f: Field) => f.id !== field.id)
      }
    }
    else {
    // Move all nested fields to General tab
      if (field.name !== "general") {
        tabsContent["general"] = [...tabsContent["general"], ...tabsContent[field.name]]

        delete tabsContent[field.name]
        delete tabs[field.name]
      }
      }
    console.log("On Field Remove")
  }

  async function fieldAdd({detail: {field, saveField}} : {detail: {field: Field, saveField: boolean | undefined}}) {

    console.log("Field Add")
    
    // Detach field from initial object
    field = JSON.parse(JSON.stringify(field))

    const characterUpdated = await createCharacterField(character.id, field, saveField)

    if (characterUpdated !== undefined) {
      const characterUpdatedFields = characterUpdated.fields
      character.fields = [...characterUpdatedFields]
    }

    if (field.group !== undefined) {
      if (field.type !== "tab") {
        // If group is not a tabname - add to General tab.
        let tabname = "general"
        if (tabsContent[field.group] !== undefined) {
          tabname = field.group
        }
        tabsContent[tabname] = [...tabsContent[tabname], field]
      }
      else {
        tabsContent[field.name] = []
        tabs[field.name] = field
      }
    }
    console.log("On Field Add")
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
      class="mb-3"
      >
      <div class="flex flex-col mt-3 items-center">

        <!-- Avatar -->
        <div class="">
          <CharacterAvatar characterName={character.name} characterId={character.id} avatarUrl={characterAvatarUrl} {editMode} on:avatarSet={avatarSetHandler} />
        </div>
  
        <!-- Name -->
        <div class="flex flex-col flex-wrap">
          {#if editMode}
            <input type="text" class="input h2 text-center" bind:value={characterName} on:focusout={characterRename}/>
          {:else}
  
            <div class="h2 flex">
              {#if compactVersion}
                <a href="/characters/{character.id}">{characterName}</a>
              {:else}
                <span>{characterName}</span>
              {/if}
            </div>
          {/if}
        </div>

        <!-- Campaign -->
        {#if campaign !== undefined}
          <a class="btn variant-ghost-tertiary text-wrap" href="/campaigns/{campaign.id}">{campaign.name}</a>
        {/if}

        <!-- Controls -->
        {#if $currentUser.id === character.creator}
          <div class="flex flex-wrap mt-4 space-x-3">

            <CircleIconButton
              on:click={toggleEditMode}
              icon={editMode ? "i-[material-symbols--cancel]" : "i-[fa--pencil]"}
              color={editMode ? "variant-ghost-error" : "variant-ghost-secondary"}
              />

            <!-- cancel edit button -->
            {#if editMode}
              <CircleIconButton
                on:click={saveChanges}
                icon="i-[material-symbols--save]"
                color="variant-ghost-success"
                />
            {:else}
              <CircleIconButton
                on:click={openCharacterNotesDrawer}
                icon="i-[material-symbols--note]"
                color="variant-ghost-warning"
                />
            {/if}
          </div>
        {/if}
      </div>


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
                class="btn btn-sm rounded-none {tabName === activeTabName ? "tab-active variant-filled-tertiary" : "variant-ghost-tertiary"}"
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
