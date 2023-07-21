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
	import CircleAdd from '$lib/components/CircleAdd.svelte';

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
  let inventory: Field[]

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
    inventory = getFieldsByGroup("inventory", character.fields)
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
  <div class="tabs tabs-boxed w-72">
    <a
      href="/"
      class="tab p-1 {activeTab === "skill" ? "tab-active bg-neutral-900/90" : "bg-neutral-900/50"}"
      on:click|preventDefault={() => setActiveTab("skill")}
      >Skills</a>
    <a
      href="/"
      class="tab p-1 {activeTab === "feel" ? "tab-active bg-neutral-900/90" : "bg-neutral-900/50"}"
      on:click|preventDefault={() => setActiveTab("feel")}
      >Feelings</a>
    <a
      href="/"
      class="tab p-1 {activeTab === "general" ? "tab-active bg-neutral-900/90" : "bg-neutral-900/50"}"
      on:click|preventDefault={() => setActiveTab("general")}
      >General</a>
    <a
      href="/"
      class="tab p-1 {activeTab === "inventory" ? "tab-active bg-neutral-900/90" : "bg-neutral-900/50"}"
      on:click|preventDefault={() => setActiveTab("inventory")}
      >Inventory</a>
  </div>
  {/if}

  <!-- Skills -->
  <section
    class="mx-3 {matches && activeTab !== "skill" ? "hidden" : ""}">
    <div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md lg:w-80 w-72">

      <!-- Action -->
      <div class="mb-3">
        <h2 class="flex text-3xl justify-center h2">Skills</h2>
        <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={action} />
        </h3>
        <h5 class="h5 flex flex-col items-end">
          <DiamondSkill on:fieldUpdate={updateField} skill={fight} />
          <DiamondSkill on:fieldUpdate={updateField} skill={leadership} />
          <DiamondSkill on:fieldUpdate={updateField} skill={stunt} />
        </h5>
      </div>
  
      <!-- Guts -->
      <div class="mb-3">
        <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={guts} />
        </h3>
        <h5 class="h5 flex flex-col items-end">
          <DiamondSkill on:fieldUpdate={updateField} skill={cool} />
          <DiamondSkill on:fieldUpdate={updateField} skill={drive} />
          <DiamondSkill on:fieldUpdate={updateField} skill={shoot} />
        </h5>
      </div>
  
      <!-- Knowledge -->
      <div class="mb-3">
        <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={knowledge} />
        </h3>
        <h5 class="h5 flex flex-col items-end">
          <DiamondSkill on:fieldUpdate={updateField} skill={culture} />
          <DiamondSkill on:fieldUpdate={updateField} skill={first_aid} />
          <DiamondSkill on:fieldUpdate={updateField} skill={tech} />
        </h5>
      </div>
  
      <!-- Society -->
      <div class="mb-3">
        <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={society} />
        </h3>
        <h5 class="h5 flex flex-col items-end">
          <DiamondSkill on:fieldUpdate={updateField} skill={charm} />
          <DiamondSkill on:fieldUpdate={updateField} skill={eloquence} />
          <DiamondSkill on:fieldUpdate={updateField} skill={observation} />
        </h5>
      </div>
  
      <!-- Wild -->
      <div class="mb-3">
        <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={wild} />
        </h3>
        <h5 class="h5 flex flex-col items-end">
          <DiamondSkill on:fieldUpdate={updateField} skill={scout} />
          <DiamondSkill on:fieldUpdate={updateField} skill={survival} />
          <DiamondSkill on:fieldUpdate={updateField} skill={tough} />
        </h5>
      </div>
  
      <!-- Crime -->
      <div class="mb-3">
        <h3 class="h3 bc-field uppercase bg-tertiary-800 flex bg-base-100 p-3 mb-3">
          <DiamondSkill on:fieldUpdate={updateField} skill={crime} />
        </h3>
        <h5 class="h5 flex flex-col items-end">
          <DiamondSkill on:fieldUpdate={updateField} skill={alertF} />
          <DiamondSkill on:fieldUpdate={updateField} skill={dexterity} />
          <DiamondSkill on:fieldUpdate={updateField} skill={stealth} />
        </h5>
      </div>
    </div>

  </section>

  <!-- Feelings -->
  <section
    role="figure"
    class="mx-3 {matches && activeTab !== "feel" ? "hidden" : ""} lg:w-80 w-72">

    <div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md">

    <h2 class="flex text-3xl justify-center h2">I Feel</h2>
    {#each feelings as feel}
      <button
        type="button"
        class="btn {feel.data?.type === "plus" ? "btn-accent" : "btn-error"}"
        draggable="true"
        on:dragstart={event => fieldDragStart(event, feel)}
        >{feel.name}</button>
    {/each}
    <CircleAdd group="feel" type="tag" />
    </div>
  </section>

  <!-- General -->
  <section
    role="figure"
    class="mx-3 {matches && activeTab !== "general" ? "hidden" : ""}">

    <div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md lg:w-80 w-72">

    <h2 class="flex text-3xl justify-center h2">General</h2>
      {#each generals as general}
      <FieldRender field={general} />
      {/each}
    </div>
  </section>

  <!-- Inventory -->
  <section
    role="figure"
    class="mx-3 {matches && activeTab !== "inventory" ? "hidden" : ""}">

    <div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md lg:w-80 w-72">

    <h2 class="flex text-3xl justify-center h2">Inventory</h2>
      {#each inventory as item}
      <FieldRender field={item} />
      {/each}
      <CircleAdd group="inventory" type="text" compendium="broken-compass" compendiumGroup="feel" />
    </div>
  </section>
</div>
</MediaQuery>
