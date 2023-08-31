<script lang="ts">
	import type { Field } from "$lib/types";
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import BcTagPanel from "./BCTagPanel.svelte";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()

  // Available tags and expertise from the system
  export let tagsAvailable: Field[]
  export let expertiseAvailable: Field[]
  export let tagExperienceAvailable: Field[]
  export let tagExperienceSelected: Field
  export let skillsAvailable: Field[]

  export let tagsSelected: Field[] = []

  // Experience
  let tagExperienceSelectedName: string = tagExperienceSelected.name


  /**
   * Select tag click handler.
   * @param tag
   */
  function selectTagEvent(tagName: string) {

    dispatch('selectTag', {
      tagName: tagName
    })
  }

  function changeExperienceEvent() {
    dispatch('changeExperience', {
      experienceName: tagExperienceSelectedName
    })
  }

</script>

{#if tagsAvailable !== undefined && tagsAvailable}

  <div class="my-3">
    <h3 class="h3 flex flex-col items-center">
      <RadioGroup>
      {#each tagExperienceAvailable as eA}
        <RadioItem
          on:change={changeExperienceEvent}
          bind:group={tagExperienceSelectedName}
          name="expertise"
          value={eA.name}>{eA.label}
        </RadioItem>
      {/each}
      </RadioGroup>
    </h3>
    <article class="italic text-center">
      {tagExperienceSelected.description}
    </article>
  </div>

  <h3 class="h3">Select up to 2 tags for your character</h3>
  <div class="flex justify-items-start flex-wrap">
    {#each tagsAvailable as tag}
      {@const tagSelected = tagsSelected.find(ts =>  ts.name === tag.name)}
      <button
        class="btn btn-xl m-2 {tagSelected !== undefined ? "variant-filled" : "variant-soft"}"
        on:click={() => selectTagEvent(tag.name)}
        on:keypress
      >
        {tag.label}
      </button>
    {/each}
  </div>

  <div class="flex flex-wrap justify-around">
    <!-- Add identifier for bind:group to work -->
    <!-- tes.tag can be undefined for expertise and when 2 selected it wont work -->
    {#if tagsSelected}
    {#each tagsSelected as ts(ts.name)}
      {#if ts !== undefined && ts.group === "tag"}
      {@const expertiseForTag = expertiseAvailable.filter(e => ts.data?.expertise.includes(e.name))}
        <BcTagPanel
          tag={ts}
          {skillsAvailable}
          expertise={expertiseForTag}
          on:selectExpertise
          />
        {/if}
    {/each}
    {/if}
  </div>
{/if}
