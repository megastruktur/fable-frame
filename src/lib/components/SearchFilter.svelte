<script lang="ts">

  export let items: {name: string}[]
  export let filteredItems: {name: string}[]
  export let placeholderText: string = "Search..."

  let filterString: string = ""

  function filterFields() {

    if (filterString !== "") {

      filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(filterString.toLowerCase())
      })
    }
    else {
      filteredItems = items
    }
  }

  $:
    classesBase = `input ${$$props.class ?? ""}`;

</script>

<input
  type="text"
  placeholder={placeholderText}
  class="{classesBase}"
  bind:value={filterString}
  on:input={filterFields}
  />
