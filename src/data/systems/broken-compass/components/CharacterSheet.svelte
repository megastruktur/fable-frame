<script lang="ts">
  import { onDestroy } from 'svelte'
  import MediaQuery, { createMediaStore } from 'svelte-media-queries'
	import { getFieldFromListByName, getFieldsByGroup } from "$lib/characterFieldsOperations";
	import fieldDragStart from "$lib/fieldDragStart";
	import type { CharactersResponse } from "$lib/pocketbase-types";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";
  import DiamondSkill from "./DiamondSkill.svelte";
	import FieldRender from '$lib/components/FieldRender.svelte';

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
  
  onDestroy(() => matches.destroy()) //Stop events for calculation

  let activeTab: string = "skill"

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

  let feelings: Field[]
  let generals: Field[]

  let fieldRemove: boolean = false
  
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

    feelings = getFieldsByGroup("feel", character.fields)
    generals = getFieldsByGroup("general", character.fields)
  })
  
  function updateField(event: { detail: Field }) {
    characterStore.setFieldValue(event.detail.id, event.detail.value)
  }

  function setActiveTab(tab: string) {
    activeTab = tab
  }
  
</script>

<MediaQuery query='(max-width: 1200px)' let:matches>
<div class="flex {matches ? "flex-col items-center" : "justify-center"}">

  {#if matches}
  <div class="tabs tabs-boxed">
    <a
      href="/"
      class="tab {activeTab === "skill" ? "tab-active" : ""}"
      on:click|preventDefault={() => setActiveTab("skill")}
      >Skills</a>
    <a
      href="/"
      class="tab {activeTab === "feel" ? "tab-active" : ""}"
      on:click|preventDefault={() => setActiveTab("feel")}
      >Feelings</a>
    <a
      href="/"
      class="tab {activeTab === "feel" ? "tab-active" : ""}"
      on:click|preventDefault={() => setActiveTab("general")}
      >General</a>
    <a
      href="/"
      class="tab {activeTab === "inventory" ? "tab-active" : ""}"
      on:click|preventDefault={() => setActiveTab("inventory")}
      >Inventory</a>
  </div>
  {/if}

  <!-- Skills -->
  <section
    class="rounded-box {$editMode ? "border border-error" : ""} {matches && activeTab !== "skill" ? "hidden" : ""}">
    <div class="flex flex-col bg-base-300 rounded-box py-3 px-4 drop-shadow-xl shadow-md">

      <!-- Action -->
      <div class="mb-3">
        <h2 class="flex text-3xl justify-center">Skills</h2>
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={action} />
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={fight} />
          <DiamondSkill on:fieldUpdate={updateField} skill={leadership} />
          <DiamondSkill on:fieldUpdate={updateField} skill={stunt} />
        </div>
      </div>
  
      <!-- Guts -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={guts} />
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={cool} />
          <DiamondSkill on:fieldUpdate={updateField} skill={drive} />
          <DiamondSkill on:fieldUpdate={updateField} skill={shoot} />
        </div>
      </div>
  
      <!-- Knowledge -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={knowledge} />
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={culture} />
          <DiamondSkill on:fieldUpdate={updateField} skill={first_aid} />
          <DiamondSkill on:fieldUpdate={updateField} skill={tech} />
        </div>
      </div>
  
      <!-- Society -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={society} />
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={charm} />
          <DiamondSkill on:fieldUpdate={updateField} skill={eloquence} />
          <DiamondSkill on:fieldUpdate={updateField} skill={observation} />
        </div>
      </div>
  
      <!-- Wild -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={wild} />
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={scout} />
          <DiamondSkill on:fieldUpdate={updateField} skill={survival} />
          <DiamondSkill on:fieldUpdate={updateField} skill={tough} />
        </div>
      </div>
  
      <!-- Crime -->
      <div class="mb-3">
        <div class="flex text-2xl bg-base-100 rounded-box p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={crime} />
        </div>
        <div class="flex flex-col items-end text-xl">
          <DiamondSkill on:fieldUpdate={updateField} skill={alertF} />
          <DiamondSkill on:fieldUpdate={updateField} skill={dexterity} />
          <DiamondSkill on:fieldUpdate={updateField} skill={stealth} />
        </div>
      </div>
    </div>

  </section>

  <!-- Feelings -->
  <section
    role="figure"
    class="rounded-box {$editMode ? "border border-error" : ""} {matches && activeTab !== "feel" ? "hidden" : ""}"
    on:dragover={() => fieldRemove = false}>

    <div class="flex flex-col bg-base-300 rounded-box py-3 px-4 drop-shadow-xl shadow-md">

    <h2 class="flex text-3xl justify-center">I Feel</h2>
    {#each feelings as feel}
      <button
        type="button"
        class="btn {feel.data?.type === "plus" ? "btn-accent" : "btn-error"}"
        draggable="true"
        on:dragstart={event => fieldDragStart(event, feel)}
        on:dragend={event => fieldDragEnd(event, feel)}
        >{feel.name}</button>
    {/each}
    </div>
  </section>

  <!-- General -->
  <section
    role="figure"
    class="rounded-box {$editMode ? "border border-error" : ""} {matches && activeTab !== "general" ? "hidden" : ""}"
    on:dragover={() => fieldRemove = false}>

    <div class="flex flex-col bg-base-300 rounded-box py-3 px-4 drop-shadow-xl shadow-md">

    <h2 class="flex text-3xl justify-center">General</h2>
      {#each generals as general}
      <FieldRender field={general} />
      {/each}
    </div>
  </section>
</div>
</MediaQuery>
