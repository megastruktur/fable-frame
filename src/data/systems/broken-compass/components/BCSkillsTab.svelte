<script lang="ts">
	import { getFieldByNameFromList } from "$lib/characterFieldsOperations";
	import type { Field } from "$lib/types";
	import DiamondSkill from "./DiamondSkill.svelte";

  export let matches: boolean
  export let tabActive: boolean
  export let fields: Field[]
  
  let action:Field = getFieldByNameFromList(fields, "action")
  let fight:Field = getFieldByNameFromList(fields, "fight")
  let leadership:Field = getFieldByNameFromList(fields, "leadership")
  let stunt:Field = getFieldByNameFromList(fields, "stunt")
  let guts:Field = getFieldByNameFromList(fields, "guts")
  let cool:Field = getFieldByNameFromList(fields, "cool")
  let drive:Field = getFieldByNameFromList(fields, "drive")
  let shoot:Field = getFieldByNameFromList(fields, "shoot")
  let knowledge:Field = getFieldByNameFromList(fields, "knowledge")
  let culture:Field = getFieldByNameFromList(fields, "culture")
  let first_aid:Field = getFieldByNameFromList(fields, "first-aid")
  let tech:Field = getFieldByNameFromList(fields, "tech")
  let society:Field = getFieldByNameFromList(fields, "society")
  let charm:Field = getFieldByNameFromList(fields, "charm")
  let eloquence:Field = getFieldByNameFromList(fields, "eloquence")
  let observation:Field = getFieldByNameFromList(fields, "observation")
  let wild:Field = getFieldByNameFromList(fields, "wild")
  let scout:Field = getFieldByNameFromList(fields, "scout")
  let survival:Field = getFieldByNameFromList(fields, "survival")
  let tough:Field = getFieldByNameFromList(fields, "tough")
  let crime:Field = getFieldByNameFromList(fields, "crime")
  let alertF:Field = getFieldByNameFromList(fields, "alert")
  let dexterity:Field = getFieldByNameFromList(fields, "dexterity")
  let stealth:Field = getFieldByNameFromList(fields, "stealth")
  
</script>

<!-- Skills -->
<section
class="mx-3 lg:w-auto w-full mb-3 relative {matches && tabActive ? "hidden" : ""}">
<div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md">

  <!-- Action -->
  <div class="mb-3">
    <h2 class="flex text-3xl justify-center h2">Skills</h2>
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={action} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={fight} />
      <DiamondSkill on:fieldUpdate skill={leadership} />
      <DiamondSkill on:fieldUpdate skill={stunt} />
    </h5>
  </div>

  <!-- Guts -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={guts} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={cool} />
      <DiamondSkill on:fieldUpdate skill={drive} />
      <DiamondSkill on:fieldUpdate skill={shoot} />
    </h5>
  </div>

  <!-- Knowledge -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={knowledge} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={culture} />
      <DiamondSkill on:fieldUpdate skill={first_aid} />
      <DiamondSkill on:fieldUpdate skill={tech} />
    </h5>
  </div>

  <!-- Society -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={society} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={charm} />
      <DiamondSkill on:fieldUpdate skill={eloquence} />
      <DiamondSkill on:fieldUpdate skill={observation} />
    </h5>
  </div>

  <!-- Wild -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={wild} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={scout} />
      <DiamondSkill on:fieldUpdate skill={survival} />
      <DiamondSkill on:fieldUpdate skill={tough} />
    </h5>
  </div>

  <!-- Crime -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={crime} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={alertF} />
      <DiamondSkill on:fieldUpdate skill={dexterity} />
      <DiamondSkill on:fieldUpdate skill={stealth} />
    </h5>
  </div>
</div>

</section>
