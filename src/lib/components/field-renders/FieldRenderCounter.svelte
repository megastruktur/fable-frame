<script lang="ts">
	import type { Field } from "$lib/types";

  // @ts-ignore
  import Icon from "svelte-icons-pack/Icon.svelte"
  import BsCircleFill from 'svelte-icons-pack/bs/BsCircleFill';
  import BsCircle from 'svelte-icons-pack/bs/BsCircle';

  import { createEventDispatcher } from "svelte"
	import { onMount } from "svelte";
	import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
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
  export let colorButtons: string = ""
  export let updateWithoutEditMode: string = ""
  export let showTitle: boolean = true
  export let placeholder: string = ""
  export let placeholderArea: string = ""
  export let characterId: string = ""
  export let editableClasses: string = ""

  let isMinValue: boolean = false
  let isMaxValue: boolean = false

  const dispatch = createEventDispatcher()
  const modalStore = getModalStore()

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
      field: field
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

<button class="{classes} {editMode ? "px-6 border-2 border-secondary-500" : "px-3 "} py-1 flex items-center cursor-pointer justify-between relative w-full chip" on:click={openDescriptionModal}>

  {#if !isMinValue && editable && editMode}
    <button type="button" on:click={fieldDecrement}
      class="h-full absolute left-0 variant-filled-secondary w-5">-</button>
  {/if}

  {#if !isMaxValue && editable && editMode}
    <button type="button" on:click={fieldIncrement}
      class="h-full absolute right-0 variant-filled-secondary w-5">+</button>
  {/if}

  {#if fullEditable && editable && editMode}
    <div class="flex flex-col">
      <input class="input mr-3 text-xl" bind:value={field.label}
        on:focusout={fieldUpdateHandler} />
      
      <textarea class="textarea resize-none mt-3 mb-3" bind:value={field.description} on:focusout={fieldUpdateHandler}></textarea>
    </div>
  {:else}
    <p class="flex mr-3 text-xl {labelStyle}">{field.label}</p>
  {/if}

  <div class="flex flex-wrap">
    {#each Array(field.value.length) as _, i}
      <span class="flex mr-1 mb-1 {valueStyle}">
        {#if field.value.charAt(i) === "+"}
          <Icon src={BsCircleFill} />
        {:else}
          <Icon src={BsCircle} />
        {/if}
      </span>
    {/each}
  </div>

</button>
