<script lang="ts">
	import { updateSaveCharacterField } from "$lib/characterFieldsOperations";
	import type { Field } from "$lib/types";
  import K4eRollResult from "../parts/K4eRollResult.svelte";

  export let field: Field
  export let characterId: string = ""
  export let classes: string = "card p-4 w-96"
  export let showTitle: boolean = true

  async function deselectOption(option: string) {

    if (characterId !== "") {

      if (field.data?.selectedOptions !== undefined) {
        field.data.selectedOptions = field.data.selectedOptions.filter((o: string) => o !== option);
      }
  
      if (field.data !== undefined) {
        field.data.options = [option, ...field.data?.options]
      }
  
      if (characterId !== undefined) {
        updateSaveCharacterField(characterId, field)
      }
    }
  }

  async function selectOption(option: string) {

    if (characterId !== "") {
      if (field.data !== undefined && field.data.options !== undefined) {
        field.data.options = field.data.options.filter((o: string) => o !== option);
      }

      if (field.data !== undefined) {
        field.data.selectedOptions = [option, ...field.data.selectedOptions || []]
      }

      if (characterId !== undefined) {
        updateSaveCharacterField(characterId, field)
      }
    }

  }

</script>

<div class="{classes}">

  {#if showTitle}
    <h2 class="h2">{field.label}</h2>
  {/if}

  <div class="blockquote">{@html field.description}</div>

  {#if field.data?.questions}
    <ul class="list pl-3 mt-3">
      {#each field.data?.questions as question}
      <li>
        <span class="text-primary-900 text-xs font-bold">◇</span>
        <span class="flex-auto">{@html question}</span>
      </li>
      {/each}
    </ul>
  {/if}

  {#if field.data?.results !== undefined}
    {#each field.data.results as rollResult(rollResult.type)}
      <K4eRollResult {rollResult} />
      {#if rollResult.type !== "failure"}
        <hr />
      {/if}
    {/each}
  {/if}

  {#if field.data?.options !== undefined && field.data?.selectedOptions !== undefined}
    {#if field.data?.options.length > 0 || field.data?.selectedOptions.length > 0}
      <h4 class="h4">Options:</h4>
      <ul class="list pl-3 mt-3">

        {#if field.data?.selectedOptions !== undefined}
          {#each field.data.selectedOptions as option}
          <li>
            <span class="text-primary-900 text-xs font-bold">
              <button on:click={() => deselectOption(option)}>◆</button>
            </span>
            <span class="flex-auto">{@html option}</span>
          </li>
          {/each}
        {/if}

        {#if field.data?.options !== undefined}
          {#each field.data.options as option}
          <li>
            <span class="text-primary-900 text-xs font-bold">
              <button on:click={() => selectOption(option)}>◇</button>
            </span>
            <span class="flex-auto">{@html option}</span>
          </li>
          {/each}
        {/if}
      </ul>
    {/if}
  {/if}
  
</div>
