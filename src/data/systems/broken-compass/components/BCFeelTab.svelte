<script lang="ts">
	import CharacterSheetTabWrapper from "$lib/components/tabs/CharacterSheetTabWrapper.svelte";
import CircleAdd from "$lib/components/circle-add/CircleAdd.svelte";
	import FieldRender from "$lib/components/field-renders/FieldRender.svelte";
	import type { Field } from "$lib/types";
	import type { CharactersResponse } from "$lib/pocketbase-types";

  export let matches: boolean
  export let fields: Field[]
  export let editMode: boolean = false
  export let activeTabName: string
  export let character: CharactersResponse

  
</script>

<!-- Feelings -->
<CharacterSheetTabWrapper {matches} {activeTabName}
removable={false} {editMode}
tabName="feel">

  <h2 class="flex text-3xl justify-center h2">I Feel</h2>
  <div class="flex flex-wrap">
    {#each fields as feel}
      <FieldRender editable={false} classes={feel.data?.type === "plus" ? "variant-filled-success" : "variant-filled-error"} field={feel} renderAs="tag" {editMode} on:fieldRemove on:fieldUpdate />
    {/each}
  </div>
  {#if editMode}
    <CircleAdd {character} group="feel" type="tag" compendium="broken-compass" compendiumGroup="feel" on:fieldAdd />
  {/if}
</CharacterSheetTabWrapper>

