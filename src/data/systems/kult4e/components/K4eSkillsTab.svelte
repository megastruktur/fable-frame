<script lang="ts">
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';

	import K4eSkillsTree from './K4eSkillsTree.svelte';

  export let fields: Field[]
  export let tab: Field
  export let activeTabName: string
  // matches the media queries:
  export let compactVersion: boolean = false
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let editMode: boolean = false
  export let editable: boolean = true

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} editMode={false} {tab} on:fieldRemove >
  {#if editable && editMode}
  <input type="text" class="input h2 text-center" bind:value={tab.label} />
  {:else}
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />
  {/if}
  <div class="mt-3">
    <K4eSkillsTree {fields} {editMode} />
  </div>
</CharacterSheetTabWrapper>


