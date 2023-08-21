<script lang="ts">
	import BcTagPanel from "$data/systems/broken-compass/components/BCTagPanel.svelte";
import type { RpgSystemsResponse } from "$lib/pocketbase-types";
	import { getCompendiumFieldsByGroup, getRpgSystemFieldsByGroup } from "$lib/rpgSystemFieldsOperations";
	import type { Field } from "$lib/types";
	import { getRpgSystemByIdentifier } from "$models/rpg_system";
	import { ProgressRadial, RadioGroup, RadioItem, Step, Stepper } from "@skeletonlabs/skeleton";
  import banner from "$data/systems/broken-compass/assets/broken_compass_banner.webp"
	import { rpgSystemBanner } from "$lib/stores";

  let rpgSystem: RpgSystemsResponse

  // Tags
  let tagsAvailable: Field[]
  let expertiseAvailable: Field[]
  let selectedTags: {tagName: string, expertiseName?: string}[] = []

  // Experience
  let tagExperienceAvailable: Field[]
  let tagExperienceSelected: string = "experienced"

  // Skills
  let skillsAvailable: Field[]



  // Set banner
  rpgSystemBanner.set(banner)

  async function prepareRpgSystem(rpgSystemName: string) {
    rpgSystem = await getRpgSystemByIdentifier(rpgSystemName)
    tagsAvailable = getCompendiumFieldsByGroup(rpgSystem, "tag")
    expertiseAvailable = getCompendiumFieldsByGroup(rpgSystem, "expertise")
    tagExperienceAvailable = getCompendiumFieldsByGroup(rpgSystem, "tagExperience")
    skillsAvailable = getRpgSystemFieldsByGroup(rpgSystem, "skill")
  }

  function selectTag(tag: Field) {

      // check if already selected then deselect
      if (selectedTags.find(selectedTag => selectedTag.tagName === tag.name)) {
        selectedTags = selectedTags.filter(selectedTag => selectedTag.tagName !== tag.name)
      }
      else {
        if (selectedTags.length < 2) {
          selectedTags = [...selectedTags, {tagName: tag.name}]
        }
      }
  }

  function selectExpertise(e: any) {
    // find the tag in selectedTags by tagName and update expertiseName
    selectedTags.forEach(selectedTag => {
      if (selectedTag.tagName === e.detail.tagName) {
        selectedTag.expertiseName = e.detail.expertiseName
        return
      }
    })
  }

</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-3">Create New Character</h1>
	<hr />
  <div>
    {#await prepareRpgSystem("broken-compass")}
      <ProgressRadial value={undefined} />
    {:then}

      {#if tagsAvailable !== undefined && tagsAvailable}

        <div class="my-3">
          <h3 class="h3 flex flex-col items-center">
            <span class="mb-3">Call me if you need</span>
            <RadioGroup >
            {#each tagExperienceAvailable as eA}
              <RadioItem bind:group={tagExperienceSelected} name="expertise" value={eA.name} on:change={selectExpertise}>{eA.label}</RadioItem>
            {/each}
            </RadioGroup>

            <div class="mt-3">
              {#each selectedTags as st}
                {@const t = tagsAvailable.find(ta => ta.name === st.tagName)}
                {#if t !== undefined}
                  <span class="ml-3">{t.label}</span>
                {/if}
              {/each}
            </div>
          </h3>
        </div>

        <div class="flex justify-items-start flex-wrap">
          {#each tagsAvailable as tag}
            {@const tagSelected = selectedTags.find(t => t.tagName === tag.name)}
            <span
              class="chip variant-filled mx-2 {tagSelected !== undefined ? "variant-filled" : "variant-soft"}"
              on:click={() => selectTag(tag)}
              on:keypress
            >
              {tag.label}
            </span>
          {/each}
        </div>

        <div class="flex flex-wrap justify-around">
          {#each selectedTags as selectedTag(selectedTag.tagName)}
            {@const selectedTagField = tagsAvailable.find(tag => tag.name === selectedTag.tagName)}
            <BcTagPanel
              tag={selectedTagField}
              {skillsAvailable}
              expertise={expertiseAvailable.filter(e => selectedTagField.data.expertise.includes(e.name))}
              on:selectExpertise={selectExpertise}
              />
          {/each}
        </div>
      {/if}
    {/await}
  </div>
</div>
