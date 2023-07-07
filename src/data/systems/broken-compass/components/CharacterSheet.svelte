<script lang="ts">
	import { getFieldFromListByName } from "$lib/characterFieldsOperations";
	import type { CharactersResponse } from "$lib/pocketbase-types";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";
	import { onMount } from "svelte";
  import DiamondSkill from "./DiamondSkill.svelte";

  let action: Field
  let fight: Field
  let leadership: Field
  let stunt: Field
  let guts: Field
  let cool: Field
  let drive: Field
  let shoot: Field
  let knowledge: Field
  let culture: Field
  let first_aid: Field
  let tech: Field
  let society: Field
  let charm: Field
  let eloquence: Field
  let observation: Field
  let wild: Field
  let scout: Field
  let survival: Field
  let tough: Field
  let crime: Field
  let alertF: Field
  let dexterity: Field
  let stealth: Field
  
  characterStore.subscribe((character: CharactersResponse) => {

    action = getFieldFromListByName("action", character.fields)
    fight = getFieldFromListByName("fight", character.fields)
    leadership = getFieldFromListByName("leadership", character.fields)
    stunt = getFieldFromListByName("stunt", character.fields)

    guts = getFieldFromListByName("guts", character.fields)
    cool = getFieldFromListByName("cool", character.fields)
    drive = getFieldFromListByName("drive", character.fields)
    shoot = getFieldFromListByName("shoot", character.fields)

    knowledge = getFieldFromListByName("knowledge", character.fields)
    culture = getFieldFromListByName("culture", character.fields)
    first_aid = getFieldFromListByName("first-aid", character.fields)
    tech = getFieldFromListByName("tech", character.fields)

    society = getFieldFromListByName("society", character.fields)
    charm = getFieldFromListByName("charm", character.fields)
    eloquence = getFieldFromListByName("eloquence", character.fields)
    observation = getFieldFromListByName("observation", character.fields)

    wild = getFieldFromListByName("wild", character.fields)
    scout = getFieldFromListByName("scout", character.fields)
    survival = getFieldFromListByName("survival", character.fields)
    tough = getFieldFromListByName("tough", character.fields)

    crime = getFieldFromListByName("crime", character.fields)
    alertF = getFieldFromListByName("alert", character.fields)
    dexterity = getFieldFromListByName("dexterity", character.fields)
    stealth = getFieldFromListByName("stealth", character.fields)
  })
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.name, event.detail.value)
  }

  function toggleEditMode() {
    editMode.set(!$editMode)
  }
  
</script>

<div class="flex flex-col items-center">

  <button class="btn {$editMode ? "btn-error" : "btn-neutral"}" on:click={toggleEditMode}>edit</button>

  <!-- Character Skills Section -->
  <section class="rounded-box {$editMode ? "border border-error" : ""}">
    <div class="flex flex-col bg-base-300 rounded-box py-3 px-4 drop-shadow-xl shadow-md">

      <!-- Action -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={action} name="Action"/>
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={fight} name="Fight"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={leadership} name="Leadership"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={stunt} name="Stunt"/>
        </div>
      </div>
  
      <!-- Guts -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={guts} name="Guts"/>
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={cool} name="Cool"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={drive} name="Drive"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={shoot} name="Shoot"/>
        </div>
      </div>
  
      <!-- Knowledge -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={knowledge} name="Knowledge"/>
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={culture} name="Culture"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={first_aid} name="First Aid"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={tech} name="Tech"/>
        </div>
      </div>
  
      <!-- Society -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={society} name="Society"/>
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={charm} name="Charm"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={eloquence} name="Eloquence"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={observation} name="Observation"/>
        </div>
      </div>
  
      <!-- Wild -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={wild} name="Wild"/>
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={scout} name="Scout"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={survival} name="Survival"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={tough} name="Tough"/>
        </div>
      </div>
  
      <!-- Crime -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={crime} name="Crime"/>
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={alertF} name="Alert"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={dexterity} name="Dexterity"/>
          <DiamondSkill on:fieldUpdate={updateField} skill={stealth} name="Stealth"/>
        </div>
      </div>
    </div>

  </section>
</div>
