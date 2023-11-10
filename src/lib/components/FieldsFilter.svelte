<script lang="ts">
	import type { Field } from "$lib/types";


  export let fields: Field[]
  export let filteredFields: Field[] = fields
  export let classes: string = ""

  let filterString: string = ""

  function filterFields() {

    if (filterString !== "") {

      filteredFields = fields.filter((field) => {
        return field.name.toLowerCase().includes(filterString.toLowerCase())
      })
    }
    else {
      filteredFields = fields
    }
  }

</script>

<input
  type="text"
  placeholder="Search..."
  class="input {classes}"
  bind:value={filterString}
  on:input={filterFields}
  />
