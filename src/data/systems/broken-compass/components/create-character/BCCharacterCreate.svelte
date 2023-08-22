<script lang="ts">
  import type { RpgSystemsResponse } from "$lib/pocketbase-types";
	import { getCompendiumFieldsByGroup, getRpgSystemFieldsByGroup } from "$lib/rpgSystemFieldsOperations";
	import type { Field } from "$lib/types";
	import { getRpgSystemByIdentifier } from "$models/rpg_system";
	import { ProgressRadial, Step, Stepper } from "@skeletonlabs/skeleton";
  import BCCharacterCreateTags from "./BCCharacterCreateTags.svelte";
  import BCCharacterCreateExpertise from "./BCCharacterCreateExpertise.svelte";
  import banner from "$data/systems/broken-compass/assets/broken_compass_banner.webp"
	import { rpgSystemBanner } from "$lib/stores";

  let rpgSystem: RpgSystemsResponse

  // Available from RPG system
  let tagsAvailable: Field[]
  let expertiseAvailable: Field[]
  let tagExperienceAvailable: Field[]
  let skillsAvailable: Field[]

  // Selected
  let selectedTags: {tagName?: string, expertiseName?: string}[] = []
  let tagsSelectedAmount: number
  let tagExperienceSelected: string = "experienced"

  let amountOfAdditionalExpertiseLeft: number = 0

  // Set banner
  rpgSystemBanner.set(banner)


  // Prepare and load the system.
  async function prepareRpgSystem(rpgSystemName: string) {
    rpgSystem = await getRpgSystemByIdentifier(rpgSystemName)
    tagsAvailable = getCompendiumFieldsByGroup(rpgSystem, "tag")
    expertiseAvailable = getCompendiumFieldsByGroup(rpgSystem, "expertise")
    tagExperienceAvailable = getCompendiumFieldsByGroup(rpgSystem, "tagExperience")
    skillsAvailable = getRpgSystemFieldsByGroup(rpgSystem, "skill")
  }

  function selectExpertiseHandler(e: any) {
    // find the tag in selectedTags by tagName and update expertiseName
    let expertiseName: string = e.detail.expertiseName
    let tagName: string = e.detail.tagName

    if (tagName !== undefined) {
      // Set Tag-based expertise
      selectedTags.forEach(selectedTag => {
        if (selectedTag.tagName === tagName) {
          selectedTag.expertiseName = expertiseName
          return
        }
      })
    }
    // Set additional expertise
    else {
      const foundTag = selectedTags.find(selectedTag => selectedTag.expertiseName === expertiseName)
      if (foundTag !== undefined && foundTag.tagName === undefined) {
        selectedTags = selectedTags.filter(selectedTag => selectedTag.expertiseName !== expertiseName)
      }
      else {      
        if (amountOfAdditionalExpertiseLeft > 0) {
          selectedTags = [...selectedTags, {expertiseName: expertiseName}]
        }
      }
    }
  }

  /**
   * Calculate edditional expertise to be selected
   *  depending on Experience level (age)
   */
  function calcAmountOfAdditionalExpertiseLeft() {

    let expertiseAmountByExperience = 0
    let left = 0

    if (tagExperienceSelected === "old") {
      expertiseAmountByExperience = 2
    }
    else if (tagExperienceSelected === "experienced") {
      expertiseAmountByExperience = 1
    }

    if (selectedTags !== undefined) {
      left = expertiseAmountByExperience - selectedTags.filter(t => t.tagName === undefined).length
    }
    return left
  }

  function createComplete() {
    console.log("Completed!")
  }


  /**
   * Select tag click handler.
   * @param tag
   */
  function selectTagHandler(e: any) {

    let tagName: string = e.detail.tagName

    if (tagName !== undefined) {


      if (selectedTags.find(selectedTag => selectedTag.tagName === tagName)) {
        selectedTags = selectedTags.filter(selectedTag => selectedTag.tagName !== tagName)
      }
      else {
        if (selectedTags.length < 2) {
          selectedTags = [...selectedTags, {tagName: tagName}]
        }
      }
    }
  }

  function changeExperienceHandler() {
    // remove all addtional expertises
    selectedTags = selectedTags.filter(selectedTag => selectedTag.tagName !== undefined)
  }

  $: {
    amountOfAdditionalExpertiseLeft = calcAmountOfAdditionalExpertiseLeft()
    tagsSelectedAmount = (selectedTags.filter(ta => ta.tagName !== undefined) || []).length
  }

</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-3">Create New Character</h1>
  
  <div>
    {#await prepareRpgSystem("broken-compass")}
      <ProgressRadial value={undefined} />
    {:then}

    <Stepper on:complete={createComplete}>

      <!-- Tags picker -->
      <Step locked={tagsSelectedAmount < 1}>
        <svelte:fragment slot="header">Choose tag</svelte:fragment>

        <BCCharacterCreateTags
          {tagsAvailable} {expertiseAvailable} {tagExperienceAvailable} {skillsAvailable}
          selectedTags={selectedTags}
          bind:tagExperienceSelected={tagExperienceSelected}
          on:selectTag={selectTagHandler}
          on:selectExpertise={selectExpertiseHandler}
          on:changeExperience={changeExperienceHandler}
          />
      </Step>

      <!-- Expertise Picker  -->
      <Step locked={amountOfAdditionalExpertiseLeft !== 0}>
        <svelte:fragment slot="header">Choose an Additional Expertise</svelte:fragment>
        <BCCharacterCreateExpertise
          {expertiseAvailable}
          selectedTags={selectedTags}
          on:selectExpertise={selectExpertiseHandler}
        />
      </Step>

    </Stepper>

    {/await}
  </div>
</div>
