<script lang="ts">
	import type { Field } from "$lib/types";

  import { createEventDispatcher, onMount } from "svelte"
	import { type ModalSettings, getModalStore } from "@skeletonlabs/skeleton"

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false

  const modalStore = getModalStore()

  const dispatch = createEventDispatcher()

  function fieldIncrement() {
    
    const dispatchData = {
      operation: "increment",
      field: field
    }

    const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

    if (dispatched) {
      field.value = (parseInt(field.value) + 1).toString()
    }
  }

  function fieldDecrement() {

    const dispatchData = {
      operation: "decrement",
      field: field
    }

    const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

    if (dispatched) {
      field.value = (parseInt(field.value) - 1).toString()
    }
  }

  onMount(() => {
    if (!field.value || !parseInt(field.value) ) {
      field.value = "0"
    }
  })

  async function openEditModal() {
    
    if (editMode) {
      modalStore.clear();

      const modalValueSet: ModalSettings = {
        type: 'prompt',
        title: `Edit field ${field.label}`,
        value: field.value,
        valueAttr: { required: true },
        response: (r: any) => {
          if (r !== false) {
            // Validate if can be converted to integer
            if (!isNaN(parseInt(r))) {
              const oldValue = field.value
              field.value = r
              const dispatchData = {
                operation: "change",
                field: field
              }

              const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

              if (!dispatched) {
                field.value = oldValue
              }
            }
          }
        },
      }

      modalStore.trigger(modalValueSet)
    }
  }
</script>

<div class="{classes} h4 w-full flex flex-row justify-between items-center">
  
  {#if editable && editMode}
    <button type="button" on:click={fieldDecrement} class="btn-icon w-8 h-8 variant-filled mr-1">-</button>
  {/if}

  <button class="flex flex-row justify-between w-full items-center"
    on:click={openEditModal}
  >
    <div class="flex">{field.label}</div>
    <button
      class="flex text-secondary-500"
      >{field.value ? field.value : 0}
    </button>
  </button>

  {#if editable && editMode}
    <button type="button" on:click={fieldIncrement} class="btn-icon w-8 h-8 variant-filled ml-1">+</button>
  {/if}
</div>
