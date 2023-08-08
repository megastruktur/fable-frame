<script lang="ts">
	import type { Field } from "$lib/types.d";
  import { editMode } from "$lib/stores";
	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";

  export let field: Field
  export let classes: string = ""
  export let editable: boolean = true


  const dispatch = createEventDispatcher()

  function parseMDTable(table: string) {
    const rows = table.split("\n")
    const columns = (rows[0].split("|")) ?? []
    const data = rows.slice(1).map(row => row.split("|"))
    return { columns, data }
  }

  let tableData: { columns: Array<string>, data: Array<Array<string>> }

  onMount(() => {
    if (!$editMode) {
      tableData = parseMDTable(field.value)
    }
  })

</script>

<label class="{classes} label w-full">
  <h4 class="h4">{field.label}</h4>
  {#if editable && $editMode}
    <textarea class="textarea" bind:value={field.value} on:focusout={() => {console.log(field); dispatch("fieldUpdate", field)}} />
  {:else}
    <div class="table-container">
      {#if tableData !== undefined}
      <table class="table table-hover">
        <thead>
          <tr>
            {#each tableData.columns as column}
            <th>{column}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each tableData.data as row}
          <tr>
            {#each row as cell}
            <td>{cell}</td>
            {/each}
          </tr>
          {/each}
        </tbody>
      </table>
      {/if}
    </div>
  {/if}
</label>
