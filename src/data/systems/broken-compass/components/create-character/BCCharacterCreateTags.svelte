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
  export let skillsAvailable: Field[]

  export let tagsExpertiseSelected: {tag?: Field, expertise?: Field}[] = []

  // Experience
  export let tagExperienceSelectedName: string

  let experienceSelected: Field



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
    dispatch('changeExperience', {})
  }


  $: {
    // Set the experience
    if (tagExperienceAvailable !== undefined) {
      experienceSelected = tagExperienceAvailable.find(ta => ta.name === tagExperienceSelectedName) || {
        id: "experienced",
        name: "experienced",
        label: "Experienced",
        value: "experienced",
        weight: 1,
        description: "You're a regular adventurer. Go with regular rules",
        group: "tagExperience",
        type: "tag",
        data: {}
      }
    }
  }

</script>

{#if tagsAvailable !== undefined && tagsAvailable}

  <div class="my-3">
    <h3 class="h3 flex flex-col items-center">
      <span class="mb-3">
        <span>Call me if you need</span>
        <span class="text-primary-100">
          {experienceSelected.label}

          {#each tagsExpertiseSelected as tes}
            {#if tes.tag !== undefined}
              <span class="mr-1">{tes.tag.label}</span>
            {/if}
          {/each}
        </span>
        
      </span>
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
      {experienceSelected.description}
    </article>
  </div>

  <h3 class="h3">Select up to 2 tags for your character</h3>
  <div class="flex justify-items-start flex-wrap">
    {#each tagsAvailable as tag}
      {@const tagSelected = tagsExpertiseSelected.find(tes => tes.tag !== undefined && tes.tag.name === tag.name)}
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
    {#each tagsExpertiseSelected as tes(tes.tag?.name)}
      {#if tes.tag !== undefined}
      {@const expertiseForTag = expertiseAvailable.filter(e => tes.tag.data.expertise.includes(e.name))}
        <BcTagPanel
          tag={tes.tag}
          {skillsAvailable}
          expertise={expertiseForTag}
          on:selectExpertise
          />
        {/if}
    {/each}
  </div>
{/if}
