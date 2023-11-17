<script lang="ts">
	import type { Field } from "$lib/types";

  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"
  import BsCircleFill from 'svelte-icons-pack/bs/BsCircleFill';
  import BsCircle from 'svelte-icons-pack/bs/BsCircle';

  import { createEventDispatcher } from "svelte"
	import { onMount } from "svelte";
	import { Accordion, AccordionItem, getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import DescriptionModal from "$lib/components/field-renders/DescriptionModal.svelte"

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let labelStyle = ""
  export let valueStyle = "text-white"
  export let fullEditable: boolean = false
  export let color: string = ""
  export let colorEdit: string = ""
  export let colorButtons: string = "variant-filled-secondary"
  export let updateWithoutEditMode: boolean = false
  export let showTitle: boolean = true
  export let placeholder: string = ""
  export let placeholderArea: string = ""
  export let characterId: string = ""
  export let editableClasses: string = ""

  let isMinValue: boolean = false
  let isMaxValue: boolean = false

  const dispatch = createEventDispatcher()
  const modalStore = getModalStore()
  const editableClassesConst = "border-2 rounded-md border-surface-500 px-3"
  const editClasses = editableClasses + " " + editableClassesConst

  onMount(() => {
    setIsMax()
    setIsMin()
  })

  function fieldIncrement() {

    const dispatched = fieldUpdate("increment")

    if (dispatched) {

      let value: string = "";
      let incremented = false;
      for (let i = 0; i < field.value.length; i++) {

        if (field.value.charAt(i) === "-" && !incremented) {
          value += "+"
          incremented = true
        }
        else {
          value += field.value.charAt(i)
        }
      }

      field.value = value
      setIsMin()
      setIsMax()
    }
  }

  function fieldDecrement() {

    const dispatched = fieldUpdate("decrement")

    if (dispatched) {

      let value: string = "";
      let decremented = false;

      for (let i = (field.value.length - 1); i >= 0; i--) {

        if (field.value.charAt(i) === "+" && !decremented) {
          value = "-" + value
          decremented = true
        }
        else {
          value = field.value.charAt(i) + value
        }
      }

      field.value = value
      setIsMin()
      setIsMax()
    }
  }

  function setIsMin() {
    // Count all "+" signs in the field value
    let count = 0;
    for (let i = 0; i < field.value.length; i++) {
      if (field.value.charAt(i) === "+") {
        count++;
      }
    }
    isMinValue = count === 0;
  }

  function setIsMax() {
    // Count all "-" signs in the field value
    let count = 0;
    for (let i = 0; i < field.value.length; i++) {
      if (field.value.charAt(i) === "-") {
        count++;
      }
    }
    isMaxValue = count === 0;
  }

  function fieldUpdate(operation: string = "") {
    const dispatchData = {
      operation: operation,
      field: field,
      saveField: updateWithoutEditMode,
    }

    return dispatch("fieldUpdate", dispatchData, { cancelable: true })
  }

  function fieldUpdateHandler() {
    fieldUpdate()
  }


  function openDescriptionModal() {

    if (!editMode && field.description !== undefined) {

      const descriptionModal: ModalSettings = {
        type: "component",
        title: "Description",
        component: {
          ref: DescriptionModal,
          props: {
            description: field.description
          }
        }
      }

      modalStore.trigger(descriptionModal)
    }
  }
</script>

<Accordion
  regionCaret="{editMode && editable ? "" : "hidden"}"
  regionControl="hover:!bg-transparent"
  padding=""
  class="{classes} relative {!editMode || !editable ? "chip whitespace-normal m-1" : editClasses}">
  <AccordionItem class="w-full {editMode && editable ? "py-2" : ""}">
    <svelte:fragment slot="summary">

      {#if !isMinValue && (!editable || !editMode)}
        <button type="button" on:click|stopPropagation={fieldDecrement}
          class="h-full rounded-l-md absolute top-0 left-0 {colorButtons} w-5">-</button>
      {/if}

      {#if !isMaxValue && (!editable || !editMode)}
        <button type="button" on:click|stopPropagation={fieldIncrement}
          class="h-full rounded-r-md absolute top-0 right-0 {colorButtons} w-5">+</button>
      {/if}

      <div class="flex justify-between items-center w-full px-6">
        {#if editable && editMode}
          <input class="input text-center border-b-0" type="text"
            bind:value={field.label} on:focusout={fieldUpdateHandler}
            placeholder="{placeholder}"
            />
        {:else}
          <h4 class="h4 text-center">{field.label ?? ""}</h4>
        {/if}
        
        {#if !editMode || !editable}
          <div class="flex items-center flex-wrap ml-2 text-lg">
            {#each Array(field.value.length) as _, i}
              <span class="flex mr-1 {valueStyle}">
                {#if field.value.charAt(i) === "+"}
                  <Icon src={BsCircleFill} />
                {:else}
                  <Icon src={BsCircle} />
                {/if}
              </span>
            {/each}
          </div>
        {/if}
      </div>

    </svelte:fragment>

    <svelte:fragment slot="content">
      {#if editable && editMode}
        <textarea class="textarea resize-none mt-3 mb-3" rows="5" bind:value={field.description} on:focusout={fieldUpdateHandler} placeholder="{placeholderArea}"></textarea>
      {:else}
        {field.description}
      {/if}
    </svelte:fragment>
  </AccordionItem>
</Accordion>
