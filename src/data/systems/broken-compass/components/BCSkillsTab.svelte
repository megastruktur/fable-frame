<script lang="ts">
	import { getFieldByNameFromList } from "$lib/characterFieldsOperations";
	import CharacterSheetTabWrapper from "$lib/components/tabs/CharacterSheetTabWrapper.svelte";
	import type { Field } from "$lib/types";
	import DiamondSkill from "./DiamondSkill.svelte";

  export let matches: boolean
  export let fields: Field[]
  export let editMode: boolean = false
  export let activeTabName: string
  
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
<CharacterSheetTabWrapper {matches} {activeTabName}
  removable={false} {editMode}
  tabName="skill">

  <!-- Action -->
  <div class="mb-3">
    <h2 class="flex text-3xl justify-center h2">Skills</h2>
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={action} {editMode} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={fight} {editMode} />
      <DiamondSkill on:fieldUpdate skill={leadership} {editMode} />
      <DiamondSkill on:fieldUpdate skill={stunt} {editMode} />
    </h5>
  </div>
  
  <!-- Guts -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={guts} {editMode} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={cool} {editMode} />
      <DiamondSkill on:fieldUpdate skill={drive} {editMode} />
      <DiamondSkill on:fieldUpdate skill={shoot} {editMode} />
    </h5>
  </div>
  
  <!-- Knowledge -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={knowledge} {editMode} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={culture} {editMode} />
      <DiamondSkill on:fieldUpdate skill={first_aid} {editMode} />
      <DiamondSkill on:fieldUpdate skill={tech} {editMode} />
    </h5>
  </div>
  
  <!-- Society -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={society} {editMode} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={charm} {editMode} />
      <DiamondSkill on:fieldUpdate skill={eloquence} {editMode} />
      <DiamondSkill on:fieldUpdate skill={observation} {editMode} />
    </h5>
  </div>
  
  <!-- Wild -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={wild} {editMode} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={scout} {editMode} />
      <DiamondSkill on:fieldUpdate skill={survival} {editMode} />
      <DiamondSkill on:fieldUpdate skill={tough} {editMode} />
    </h5>
  </div>
  
  <!-- Crime -->
  <div class="mb-3">
    <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
      <DiamondSkill on:fieldUpdate skill={crime} {editMode} />
    </h3>
    <h5 class="h5 flex flex-col items-end">
      <DiamondSkill on:fieldUpdate skill={alertF} {editMode} />
      <DiamondSkill on:fieldUpdate skill={dexterity} {editMode} />
      <DiamondSkill on:fieldUpdate skill={stealth} {editMode} />
    </h5>
  </div>
</CharacterSheetTabWrapper>

