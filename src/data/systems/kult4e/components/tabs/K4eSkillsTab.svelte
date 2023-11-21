<script lang="ts">
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import type { Field } from "$lib/types";
	import type { ObjectType, QueryArray } from "svelte-media-queries/components/MediaQuery.types";
	import CharacterSheetTabWrapper from '$lib/components/tabs/CharacterSheetTabWrapper.svelte';

	import K4eSkillsTree from '../parts/K4eSkillsTree.svelte';

  export let fields: Field[]
  export let tab: Field
  export let activeTabName: string
  // matches the media queries:
  export let compactVersion: boolean = false
  export let matches: boolean | QueryArray | ObjectType<any> = true
  export let editMode: boolean = false
  export let editable: boolean = true
  export let tabWidth: string

</script>

<CharacterSheetTabWrapper {compactVersion} {matches} {activeTabName}
  removable={false} editMode={false} {tab} width={tabWidth} on:fieldRemove >
  
  <h2 class="h2 text-center mb-3">{tab.label}</h2>
  <hr />

  <div class="mt-3">
    <K4eSkillsTree {fields} {editMode} {activeTabName} />
  </div>
</CharacterSheetTabWrapper>


