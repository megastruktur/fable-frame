<script lang="ts">
	import { Stepper, Step, ProgressRadial, getModalStore } from "@skeletonlabs/skeleton";
	import FieldCreate from "./FieldCreate.svelte";
	import { characterStore, fieldErrors } from "$lib/stores";

  import BsTextCenter from "svelte-icons-pack/bs/BsTextCenter";
  import BsThreeDots from "svelte-icons-pack/bs/BsThreeDots";
  import BsHash from "svelte-icons-pack/bs/BsHash";
  import Bs123 from "svelte-icons-pack/bs/Bs123";
  import BsFileMinus from "svelte-icons-pack/bs/BsFileMinus";
  import BsTable from "svelte-icons-pack/bs/BsTable";

	import CircleAddFieldTypeButton from "./CircleAddFieldTypeButton.svelte";
	import { getCompendiumItems } from "$lib/getCompendiumItems";
	import { onMount } from "svelte";
	import { getCharacterFieldByName } from "$lib/characterFieldsOperations";

  import { v4 as uuidv4 } from 'uuid'

  export let group: string;
  export let type: string = "";

  // Which compendium to use.
  // Set empty if no compendium.
  export let compendium: string = "";
  export let compendiumGroup: string = "";

  // Modal parent.
  export let parent: any;

  const modalStore = getModalStore()

  let validationFailed: boolean = true

  let field = {
    id: uuidv4(),
    type: type,
    name: "",
    label: "",
    group: group,
    value: "",
    description: "",
    weight: 1
  }

  onMount(() => {
    console.log(`Opening modal for group ${group}`)
  })

  // Get list of all Compendium Items with Group and Type from the System Compendium
  // @todo Get list of all Compendium Items with Group and Type from all Compendiums
  // If type is empty - list ONLY default types like Text, Tag, Counter and Etc.

  function createComplete() {
    
    // Field name should be unique so make sure that's the case.
    field.name = uuidv4()
    
    validateField()
    
    if (validationFailed) {
      return
    }

    characterStore.addField(field)

    console.log(`Added field ${field.name} to character ${$characterStore.name}`)

    // reset selected field
    field = {
      id: "",
      type: type,
      name: "",
      label: "",
      group: group,
      value: "",
      description: "",
      weight: 1
    }
    modalStore.close();
    modalStore.clear();
  }

  const fieldTypes: {[type: string]: any} = {
    text: {
      name: "text",
      type: "text",
      label: "Text",
      group: group,
      icon: BsTextCenter,
      description: "A text field",
      weight: 1
    },
    tag: {
      name: "tag",
      type: "tag",
      label: "Tag",
      group: group,
      icon: BsHash,
      description: "A tag field. The Value will be displayed on character sheet without the label.",
      weight: 1
    },
    counter: {
      name: "counter",
      type: "counter",
      label: "Counter",
      group: group,
      icon: BsThreeDots,
      description: "To use it set the value to +++ where each + represents max count.",
      weight: 1
    },
    counterNum: {
      name: "counterNum",
      type: "counterNum",
      label: "Counter Num",
      group: group,
      icon: Bs123,
      description: "DnD Skill as example",
      weight: 1
    },
    section: {
      name: "section",
      type: "section",
      label: "Section",
      group: group,
      icon: BsFileMinus,
      description: "Section title within tab",
      weight: 1
    },
    datatable: {
      name: "datatable",
      type: "datatable",
      label: "Table",
      group: group,
      icon: BsTable,
      description: "Section title within tab",
      weight: 1
    },
  }

function validateField() {

  validationFailed = false
  // If field name is not unique
  if (getCharacterFieldByName($characterStore, field.name).id !== "") {
    validationFailed = true
    fieldErrors.addError("This field name is already taken")
  }
}

</script>

<div class="card p-4 bg-neutral-900/90 w-modal-slim">
  
  <Stepper start={field.type === "tab" ? 1 : 0} buttonComplete="will-close" on:complete={createComplete}>
    <Step>
      <svelte:fragment slot="header">Field</svelte:fragment>
      
        <div class="flex flex-wrap justify-around">
          {#each Object.entries(fieldTypes) as [fieldType, fieldData]}
            <CircleAddFieldTypeButton bind:selectedField={field} field={fieldData} />
          {/each}
        </div>


        <!-- Load Compendium fields if needed -->
        {#if compendium !== ""}
          <div class="flex flex-wrap justify-around">
          {#await getCompendiumItems(compendium, compendiumGroup)}
            <ProgressRadial value={undefined} />
          {:then compendiumFields}
            {#each compendiumFields as compendiumField}
              <CircleAddFieldTypeButton bind:selectedField={field} field={compendiumField} />
            {/each}
          {/await}
          </div>
          <hr />
        {/if}


      <!-- Field description goes here -->
      <div>
        {#if field.description!==undefined && field.description !== ""}
        {field.description}
        {/if}
      </div>

    </Step>
    <Step>
      <svelte:fragment slot="header">Create {field.type}</svelte:fragment>
      <FieldCreate bind:field={field} /> 
    </Step>
  </Stepper>
</div>
<slot />
