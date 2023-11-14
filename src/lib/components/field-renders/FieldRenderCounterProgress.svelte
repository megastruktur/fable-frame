<script lang="ts">
	import type { Field } from "$lib/types";

  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"
  import BsCircleFill from 'svelte-icons-pack/bs/BsCircleFill';
  import BsCircle from 'svelte-icons-pack/bs/BsCircle';

  import { createEventDispatcher } from "svelte"
	import { onMount } from "svelte";
	import { updateSaveCharacterField } from "$lib/characterFieldsOperations";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let labelStyle = ""
  export let valueStyle = "text-white"
  export let fullEditable: boolean = false
  export let color: string = "variant-filled-secondary"
  export let colorEdit: string = "border-secondary-500"
  export let colorButtons: string = ""
  export let characterId: string = ""
  export let editableClasses: string = ""
  export let updateWithoutEditMode: boolean = false

  // Validate field
  if (!validateField()) {
    throw new Error("Field is invalid")
  }

  let isMinValue: boolean = false
  let isMaxValue: boolean = false
  const maxValue = field.data?.max || 9
  const minValue = field.data?.min || 0
  const values = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => i + minValue)
  const dispatch = createEventDispatcher()
  const counterDescriptionValues: {
    label: string,
    description: string,
    value: string
  }[] = field.data?.counterValues || []

  onMount(() => {
    setIsMax()
    setIsMin()
  })


  function validateField() {
    let valid = true
    
    if (characterId === ""
      || field.data === undefined
      || field.data.min === undefined
      || field.data.max === undefined
      || field.data.counterValues === undefined) {
        valid = false
    }

    return valid
  }

  function fieldIncrement() {


    field.value = (parseInt(field.value) + 1).toString()

    console.log(field.value)
    setIsMin()
    setIsMax()

    fieldUpdate("increment")
  }

  function fieldDecrement() {
    
    field.value = (parseInt(field.value) - 1).toString()
    setIsMin()
    setIsMax()

    fieldUpdate("decrement")
  }

  function setIsMin() {
    isMinValue = parseInt(field.value) === minValue;
  }

  function setIsMax() {
    isMaxValue = parseInt(field.value) === maxValue;
  }

  function fieldUpdate(operation: string = "") {
    const dispatchData = {
      operation: operation,
      field: field
    }

    dispatch("fieldUpdate", dispatchData, { cancelable: true })

    if (updateWithoutEditMode) {
      updateSaveCharacterField(characterId, field)
    }
  }

</script>

<div class="{classes} py-3 px-3 relative w-full rounded-md {editMode ? "px-6 border-2 " + colorEdit : color}">

  {#if !isMinValue && ((editable && editMode) || updateWithoutEditMode)}
    <button type="button" on:click={fieldDecrement}
      class="absolute left-0 top-0 {colorButtons} w-5 h-full">-</button>
  {/if}

  {#if !isMaxValue && ((editable && editMode) || updateWithoutEditMode)}
    <button type="button" on:click={fieldIncrement}
      class="absolute right-0 top-0 {colorButtons} w-5 h-full">+</button>
  {/if}

  <div class="">
    <h3 class="h3 text-center pb-2 {labelStyle}">{field.label}</h3>
  
    <div class="flex flex-wrap justify-center mb-3">
      {#each values as v}
        <div class="mr-1 {valueStyle}">
          {#if v <= parseInt(field.value)}
            <Icon src={BsCircleFill} />
          {:else}
            <Icon src={BsCircle} />
          {/if}
        </div>
      {/each}
    </div>
  
    <div class="">
      <h5 class="h5 text-center">{counterDescriptionValues[parseInt(field.value)].description}</h5>
      <article class="text-center text-xs">
        {@html counterDescriptionValues[parseInt(field.value)].value}
      </article>
    </div>
  </div>

</div>
