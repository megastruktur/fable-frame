<script lang="ts">
	import { goto } from "$app/navigation";
  import type { RpgSystemsResponse } from "$lib/pocketbase-types";
	import { pageName } from "$lib/stores";
	import type { Field } from "$lib/types";
	import { createNewCharacterByCharacterData } from "$models/character";
	import { getRpgSystem } from "$models/rpg_system";
  import { Base64 } from 'js-base64';

  let characterName: string = ""
  let selectedSystem: RpgSystemsResponse
  let importedCharacter: string = ""
  let characterStub: {rpgSystem: string, fields: Field[]}
  let validatedImport: boolean = false

	pageName.set("Import Character")

	async function createAndRedirect() {
    const data = {
      name: characterName,
      rpgSystem: characterStub.rpgSystem,
      fields: characterStub.fields
    }
		const character = await createNewCharacterByCharacterData(data);
		goto('/characters/' + character.id)
	}

  async function validateProceed(): Promise<boolean> {
    if (importedCharacter !== "" && characterName !== "") {
      try {
        characterStub = JSON.parse(Base64.decode(importedCharacter))

        selectedSystem = await getImportCharacterRpgSystem(characterStub)

        if (selectedSystem !== undefined) {
          return true
        }
      } catch (e) {
        console.error(e)
        return false
      }
    }
    
    return false
  }

  async function getImportCharacterRpgSystem(characterData: any): Promise<RpgSystemsResponse> {
    if (characterData !== undefined) {
      return getRpgSystem(characterData.rpgSystem)
    }
  }

  async function characterValidate() {
    validatedImport = await validateProceed()
  }

</script>

<div class="flex flex-col px-3">
	<h1 class="text-3xl m-auto my-3">Import Character</h1>

  {#if !validatedImport}
    <div class="space-y-3">
      <input
            class="input" type="text"
            bind:value={characterName}
            placeholder="Character Name"
            name="name" />

      <textarea
        placeholder="Paste the character here"
        class="textarea resize-none" bind:value={importedCharacter} />
      
      <button
        on:click={characterValidate}
        class="btn variant-filled-success w-full">Validate</button>
    </div>
  {:else}
    <div class="space-y-3">
      <h4 class="h4"><span class="text-primary-400">{characterName}</span> with <span class="text-primary-400">{selectedSystem.name}</span></h4>

      <button
        on:click={createAndRedirect}
        class="btn w-full variant-filled-success">Import</button>
    </div>
  {/if}


</div>
