<script lang="ts">
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
  import Icon from "svelte-icons-pack/Icon.svelte"
  import BsPlus from "svelte-icons-pack/bs/BsPlus"
	import FieldCreate from "./FieldCreate.svelte";
	import type { Field } from "$lib/types";
	import { characterStore } from "$lib/stores";

  export let group: string;
  export let type: string = "";
  
  const openCircle: PopupSettings = {
    event: 'click',
    target: 'circlePopup',
    placement: 'top'
  }


  function fieldAdd(e: CustomEvent<any>): void {
    e.preventDefault()
    const newField: Field = {...e.detail.field, id: ""}
    characterStore.addField(newField)
  }


  // Get list of all Compendium Items with Group and Type from the System Compendium
  // @todo Get list of all Compendium Items with Group and Type from all Compendiums
  // If type is empty - list ONLY default types like Text, Tag, Counter and Etc.

  // When accepted - set the field.group to group allow edit
  //  label
  //  name
  //  value


  // export type Field = {
  //   id: string // generally better I use the Unique ID.
  //   type: string // render type
  //   name: string
  //   label?: string
  //   group?: string
  //   value: string
  //   data?: object
  //   icon?: string
  //   description?: string
  // }

</script>

<div class="card p-4 variant-filled-neutral-900/90" data-popup="circlePopup">
	<p>Add Field</p>
  <FieldCreate type="text" on:fieldAdd={fieldAdd} /> 

	<div class="arrow variant-filled-neutral-900/90" />
</div>

<button class="btn btn-circle" use:popup={openCircle} >
  <Icon size="40" color="" src={BsPlus} />
</button>

