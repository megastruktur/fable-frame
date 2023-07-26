<!-- All Characters -->
<script lang="ts">
  import { page } from "$app/stores"
	import { deleteCharacter, getCharacter, getCharacterAvatar, updateCharacterWithHash } from "$models/character";
	import { onMount } from "svelte";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";

  // Icons
  import Icon from "svelte-icons-pack"
  import FaSolidSkull from "svelte-icons-pack/fa/FaSolidSkull";

	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import { goto } from "$app/navigation";
	import CharacterAvatar from "$lib/components/CharacterAvatar.svelte";
	import type { CharactersResponse } from "$lib/pocketbase-types";
	import toastShow from "$lib/toastShow";

  import { fade } from "svelte/transition"

  let CharacterSheet: any
  let characterName: string = ""
  let compendiumFields: {
    [key: string]: Field[]
  } = {}
  let characterAvatarUrl: string = ""
  let characterId: string = ""
  
  onMount(async () => {

    $characterStore = (await getCharacter($page.params.slug, {expand: "rpgSystem"}))

    characterName = $characterStore.name
    characterId = $characterStore.id

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

  characterStore.subscribe((character: CharactersResponse) => {
    if ($characterStore !== undefined) {
      characterAvatarUrl = getCharacterAvatar($characterStore)
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


</script>

{#key $editMode}
<div 
  in:fade={{ duration: 300, delay: 300 }}
  out:fade={{ duration: 300 }}
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
  <div class="mt-4">
    {#if CharacterSheet}
      <svelte:component this={CharacterSheet} />
    {/if}
  </div>
</div>
{/key}
