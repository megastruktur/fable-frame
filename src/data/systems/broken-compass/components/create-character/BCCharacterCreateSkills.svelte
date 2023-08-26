<script lang="ts">
	import { getFieldByNameFromList } from "$lib/characterFieldsOperations";
	import type { Field } from "$lib/types";
	import DiamondSkill from "../DiamondSkill.svelte";

  export let fields: Field[]
  export let additionalSkillsChanged: string[]

  export let editMode: boolean = true

</script>

<!-- Skills -->
{#key additionalSkillsChanged}

  <div class="mb-3">
    <h2 class="flex text-3xl justify-center h2">Skills</h2>

    {#each fields.filter( field => field.group === "skill" && field.data?.parent === undefined ) as characterFieldOfAction}
      <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
        <DiamondSkill on:fieldUpdate skill={characterFieldOfAction} />
      </h3>
      <h5 class="h5 flex flex-col items-end">
        {#each fields.filter( field => field.group === "skill" && field.data?.parent === characterFieldOfAction.name) as characterSkill}
          <DiamondSkill
            on:fieldUpdate
            blockDecrement={(additionalSkillsChanged.find(fn => fn === characterSkill.name) === undefined)}
            blockIncrement={additionalSkillsChanged.length >= 2}
            skill={characterSkill} {editMode}
            />
        {/each}
      </h5>
    {/each}

  </div>

{/key}
