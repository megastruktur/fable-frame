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

  export let selectedTags: {tagName?: string, expertiseName?: string}[] = []

  // Experience
  export let tagExperienceSelected: string

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
      experienceSelected = tagExperienceAvailable.find(ta => ta.name === tagExperienceSelected) || {
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

          {#each selectedTags as st}
            {@const t = tagsAvailable.find(ta => ta.name === st.tagName)}
            {#if t !== undefined}
              <span class="mr-1">{t.label}</span>
            {/if}
          {/each}
        </span>
        
      </span>
      <RadioGroup>
      {#each tagExperienceAvailable as eA}
        <RadioItem
          on:change={changeExperienceEvent}
          bind:group={tagExperienceSelected}
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

  <div class="flex justify-items-start flex-wrap">
    {#each tagsAvailable as tag}
      {@const tagSelected = selectedTags.find(t => t.tagName === tag.name)}
      <span
        class="chip mx-2 {tagSelected !== undefined ? "variant-filled" : "variant-soft"}"
        on:click={() => selectTagEvent(tag.name)}
        on:keypress
      >
        {tag.label}
      </span>
    {/each}
  </div>

  <div class="flex flex-wrap justify-around">
    {#each selectedTags as selectedTag(selectedTag.tagName)}
      {#if selectedTag.tagName !== undefined}
        {@const selectedTagField = tagsAvailable.find(tag => tag.name === selectedTag.tagName)}
        <BcTagPanel
          tag={selectedTagField}
          {skillsAvailable}
          expertise={expertiseAvailable.filter(e => selectedTagField?.data?.expertise.includes(e.name))}
          on:selectExpertise
          />
        {/if}
    {/each}
  </div>
{/if}
