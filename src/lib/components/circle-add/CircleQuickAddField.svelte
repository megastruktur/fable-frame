<script lang="ts">
    // @ts-ignore
	import Icon from "svelte-icons-pack";
	import BsPlus from "svelte-icons-pack/bs/BsPlus";
  import BsTextCenter from "svelte-icons-pack/bs/BsTextCenter";
  import BsThreeDots from "svelte-icons-pack/bs/BsThreeDots";
  import BsHash from "svelte-icons-pack/bs/BsHash";
  import Bs123 from "svelte-icons-pack/bs/Bs123";
  import BsFileMinus from "svelte-icons-pack/bs/BsFileMinus";
  import BsTable from "svelte-icons-pack/bs/BsTable";
	import { createEventDispatcher } from "svelte";
	import type { CharactersResponse } from "$lib/pocketbase-types";

  export let name: string = ""
  export let description: string = ""
  export let group: string
  export let type: string
  export let character: CharactersResponse
  export let classes: string = ""
  export let value: string = ""
  export let fullEditable: boolean = false
  export let saveField: boolean = false

  const dispatch = createEventDispatcher()

  const fieldTypes: {[type: string]: any} = {
    text: {
      name: name,
      type: "text",
      label: name ?? "Text",
      group: group,
      value: value,
      icon: BsTextCenter,
      description: description ?? "A text field",
      weight: 1
    },
    tag: {
      name: name,
      type: "tag",
      label: name ?? "Tag",
      value: value,
      group: group,
      icon: BsHash,
      description: description ?? "A tag field. The Value will be displayed on character sheet without the label.",
      weight: 1
    },
    counter: {
      name: name,
      type: "counter",
      label: name ?? "Counter",
      value: value,
      group: group,
      icon: BsThreeDots,
      description: description ?? "To use it set the value to +++ where each + represents max count.",
      weight: 1
    },
    counterNum: {
      name: name,
      type: "counterNum",
      label: name ?? "Counter Num",
      value: value,
      group: group,
      icon: Bs123,
      description: description ?? "DnD Skill as example",
      weight: 1
    },
    section: {
      name: name,
      type: "section",
      label: name ?? "Section",
      value: value,
      group: group,
      icon: BsFileMinus,
      description: description ?? "Section title within tab",
      weight: 1
    },
    datatable: {
      name: name,
      type: "datatable",
      label: name ?? "Table",
      value: value,
      group: group,
      icon: BsTable,
      description: description ?? "Section title within tab",
      weight: 1
    },
  }

  function fieldAdd() {
    if (type !== undefined && fieldTypes[type] !== undefined) {

      dispatch("fieldAdd", {
        field: fieldTypes[type],
        saveField: saveField,
      })
    }
  }

</script>

<button class="btn btn-circle hover:bg-surface-800 {classes}" on:click={fieldAdd}>
  <Icon size="40" color="" src={BsPlus} />
</button>
