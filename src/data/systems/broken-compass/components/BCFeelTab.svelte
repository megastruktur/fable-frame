<script lang="ts">
	import CircleAdd from "$lib/components/circle-add/CircleAdd.svelte";
	import FieldRender from "$lib/components/field-renders/FieldRender.svelte";
	import type { Field } from "$lib/types";

  export let matches: boolean
  export let tabActive: boolean
  export let fields: Field[]
  export let editMode: boolean = false

  
</script>

<!-- Feelings -->
<section
  role="figure"
  class="mx-3 mb-3 relative {matches && tabActive ? "hidden" : ""} w-80">

  <div class="flex flex-col bg-neutral-900/90 py-3 px-4 drop-shadow-xl shadow-md">

  <h2 class="flex text-3xl justify-center h2">I Feel</h2>
  <div class="flex flex-wrap">
    {#each fields as feel}
      <FieldRender editable={false} classes={feel.data?.type === "plus" ? "variant-filled-success" : "variant-filled-error"} field={feel} renderAs="tag" {editMode} />
    {/each}
  </div>
  {#if editMode}
    <CircleAdd group="feel" type="tag" compendium="broken-compass" compendiumGroup="feel" />
  {/if}
  </div>
</section>
