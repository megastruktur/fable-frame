<script lang="ts">
  import type { CharactersResponse, RpgSystemsResponse } from "$lib/pocketbase-types";
	import { getCompendiumFieldsByGroup, getRpgSystemFieldsByGroup } from "$lib/rpgSystemFieldsOperations";
	import type { Field } from "$lib/types";
	import { getRpgSystemByIdentifier } from "$models/rpg_system";
	import { ProgressRadial, Step, Stepper } from "@skeletonlabs/skeleton";
  import BCCharacterCreateTags from "./create-character/BCCharacterCreateTags.svelte";
  import BCCharacterCreateExpertise from "./create-character/BCCharacterCreateExpertise.svelte";
  import banner from "$data/systems/broken-compass/assets/broken_compass_banner.webp"
	import { rpgSystemBanner } from "$lib/stores";
	import BCCharacterCreateGeneral from "./create-character/BCCharacterCreateGeneral.svelte";
	import BCCHaracterCreateVerify from "./create-character/BCCharacterCreateVerify.svelte";
	import { createNewCharacterByCharacterData, getCharacterStub } from "$models/character";
	import { addCharacterField, getCharacterFieldByName, getCharacterFieldsByGroup, updateCharacterField } from "$lib/characterFieldsOperations";
  import BcCharacterCreateSkills from "./create-character/BCCharacterCreateSkills.svelte";

  import { countSkillValue, skillDecrement, skillIncrement } from "../lib/fieldOperations"
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

  let rpgSystem: RpgSystemsResponse

  // Available from RPG system
  let tagsAvailable: Field[]
  let expertiseAvailable: Field[]
  let tagExperienceAvailable: Field[]
  let skillsAvailable: Field[]

  // Selected
  let selectedTags: {tagName?: string, expertiseName?: string}[] = [] // temp storage
  let selectedTagFields: Field[] = []
  let tagsSelectedAmount: number
  let tagExperienceSelectedName: string = "experienced"
  let tagExperienceSelected: Field
  let selectedExpertise: Field[] = []

  let amountOfAdditionalExpertiseLeft: number = 0
  let callMeIfYouNeed: string

  // General
  let characterName: string
  let characterHeritage: string
  let characterHomeland: string
  let characterWorkplace: string

  // Skills
  const amountOfAdditionalSkills: number = 2
  let amountOfAdditionalSkillsLeft: number = amountOfAdditionalSkills
  let additionalSkillsChanged: string[] = []

  // Allow decrementing only those which were incremented

  let characterStubDataInitial: CharactersResponse
  let characterStubData: CharactersResponse

  onMount(() => {
    countSkillValue
    skillDecrement
    skillIncrement

    // Set banner
    rpgSystemBanner.set(banner)
  })


  // Prepare and load the system.
  async function prepareRpgSystem(rpgSystemName: string) {
    rpgSystem = await getRpgSystemByIdentifier(rpgSystemName)
    tagsAvailable = getCompendiumFieldsByGroup(rpgSystem, "tag")
    expertiseAvailable = getCompendiumFieldsByGroup(rpgSystem, "expertise")
    tagExperienceAvailable = getCompendiumFieldsByGroup(rpgSystem, "tagExperience")
    skillsAvailable = getRpgSystemFieldsByGroup(rpgSystem, "skill")
    
    characterStubDataInitial = await getCharacterStub(rpgSystem.id)
    characterStubData = characterStubDataInitial
  }

  function getExpertiseByName(expertiseName: string) {
    const expertise = expertiseAvailable.find(expertise => expertise.name === expertiseName)

    if (expertise === undefined) {
      throw new Error("Expertise not found")
    }

    return expertise
  }

  function removeSelectedExpertiseByName(expertiseName: string) {
    selectedExpertise = selectedExpertise.filter(expertise => expertise.name !== expertiseName)
  }

  function removeAdditionalSelectedExpertise() {
    // Find additional selected expertise names
    const additionalSelectedExpertiseNames = selectedTags.filter(st => st.tagName === undefined).map(ex => ex.expertiseName)

    if (additionalSelectedExpertiseNames !== undefined && selectedExpertise !== undefined) {
      selectedExpertise = selectedExpertise.filter(expertise =>!additionalSelectedExpertiseNames.includes(expertise.name))
    }
  }

  function getSelectedTagFields() {

    let sTF: Field[] = []
    selectedTags.forEach(st => {
      const tag = tagsAvailable.find(tag => tag.name === st.tagName)
      if (tag!== undefined) {
        sTF.push(tag)
      }
    })

    return sTF
  }

  function selectExpertiseHandler(e: any) {
    // find the tag in selectedTags by tagName and update expertiseName
    let expertiseName: string = e.detail.expertiseName
    let tagName: string = e.detail.tagName

    if (tagName !== undefined) {
      // Set Tag-based expertise
      selectedTags.forEach(selectedTag => {
        if (selectedTag.tagName === tagName) {
          // Remove the already selected expertise if any
          if (selectedTag.expertiseName !== undefined) {
            removeSelectedExpertiseByName(selectedTag.expertiseName)
          }
          selectedTag.expertiseName = expertiseName
          selectedExpertise.push(getExpertiseByName(expertiseName))
          return
        }
      })
    }
    // Set additional expertise
    else {
      const foundTag = selectedTags.find(selectedTag => selectedTag.expertiseName === expertiseName)
      if (foundTag !== undefined && foundTag.tagName === undefined) {
        selectedTags = selectedTags.filter(selectedTag => selectedTag.expertiseName !== expertiseName)
        removeSelectedExpertiseByName(expertiseName)
      }
      else {      
        if (amountOfAdditionalExpertiseLeft > 0) {
          selectedTags = [...selectedTags, {expertiseName: expertiseName}]
          selectedExpertise.push(getExpertiseByName(expertiseName))
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

    if (tagExperienceSelectedName === "old") {
      expertiseAmountByExperience = 2
    }
    else if (tagExperienceSelectedName === "experienced") {
      expertiseAmountByExperience = 1
    }

    if (selectedTags !== undefined) {
      left = expertiseAmountByExperience - selectedTags.filter(t => t.tagName === undefined).length
    }
    return left
  }

  // Create a BC character
  async function createComplete() {
    
    selectedTagFields = getSelectedTagFields()

    characterStubData.name = characterName

    // heritage, homeland and workplace
    const heritageField = getCharacterFieldByName(characterStubData, "heritage")
    heritageField.value = characterHeritage
    updateCharacterField(characterStubData, heritageField)
    const homelandField = getCharacterFieldByName(characterStubData, "homeland")
    homelandField.value = characterHomeland
    updateCharacterField(characterStubData, homelandField)
    const workplaceField = getCharacterFieldByName(characterStubData, "workplace")
    workplaceField.value = characterWorkplace
    updateCharacterField(characterStubData, workplaceField)

    // Add negative Old or positive Young feelings and tags
    if (["old", "young"].includes(tagExperienceSelectedName)) {
      const experienceFeelingField: Field = {
        id: "",
        type: "tag",
        group: "feel",
        weight: 1,
        value: tagExperienceSelected.value,
        name: tagExperienceSelected.name,
        label: tagExperienceSelected.label,
        data: {
          type: tagExperienceSelected.name === "young" ? "plus" : "minus"
        }
      }
      addCharacterField(characterStubData, experienceFeelingField)
    }

    // Add "profession" tags
    selectedTagFields.forEach(sTF => {
      addCharacterField(characterStubData, sTF)
    })

    // Add Expertise
    selectedExpertise.forEach(selectedExpertise => {
      addCharacterField(characterStubData, selectedExpertise)
    })


    // Additional 2 points of skills - selected by User

    // Save character
    const char = await createNewCharacterByCharacterData(characterStubData)

    // Redirect

    if (char) {
      goto('/characters/' + char.id)
    }

  }

  function recalculateSkillsAndFields() {

    selectedTagFields = getSelectedTagFields()

    // Recalculate skills
    let skillFields = getCharacterFieldsByGroup(characterStubData, "skill")

    // Increment a Backup Field from the second tag if field of the first
    //  tag is the same as field on the second (if the second tag exists).
    let fieldNameToIncrement1: string
    let fieldNameToIncrement2: string

    if (selectedTagFields[0] !== undefined) {
      fieldNameToIncrement1 = selectedTagFields[0].data?.field

      if (fieldNameToIncrement1 !== undefined && selectedTagFields[1] !== undefined) {
        if (selectedTagFields[1].data?.field !== fieldNameToIncrement1) {
          fieldNameToIncrement2 = selectedTagFields[1].data?.field
        }
        else {
          fieldNameToIncrement2 = selectedTagFields[1].data?.backup_field
        }
      }

      // Iterate though all skills
      skillFields.map(skill => {

        // Increment Skill
        selectedTagFields.forEach(sE => {
          if (sE.data?.skills.includes(skill.name)) {
            skill = skillIncrement(skill)
            updateCharacterField(characterStubData, skill)
          }
        })
        // Increment Field
        if (
          (fieldNameToIncrement1 !== undefined && skill.name ===fieldNameToIncrement1)
          || (fieldNameToIncrement2 !== undefined && skill.name ===fieldNameToIncrement2)) {
            skill = skillIncrement(skill)
            updateCharacterField(characterStubData, skill)
          }
      })

    }
  }

  /**
   * Select tag click handler.
   * @param tag
   */
  function selectTagHandler(e: any) {

    // Refresh Character Data if Tag changes as it affects skill calculation
    characterStubData = characterStubDataInitial
    amountOfAdditionalSkillsLeft = amountOfAdditionalSkills

    // Select the Tag
    let tagName: string = e.detail.tagName

    if (tagName !== undefined) {
      // cleanup existing expertise
      removeAllAdditionalExpertise()
      removeAdditionalSelectedExpertise()

      // Remove Tag
      const selectedTag = selectedTags.find(selectedTag => selectedTag.tagName === tagName)
      if (selectedTag !== undefined) {
        if (selectedTag.expertiseName !== undefined) {
          console.log("Removing expertise: " + selectedTag.expertiseName)
          removeSelectedExpertiseByName(selectedTag.expertiseName)
        }
        selectedTags = selectedTags.filter(selectedTag => selectedTag.tagName !== tagName)

      }
      // Add Tag
      else {
        if (selectedTags.length < 2) {
          selectedTags = [...selectedTags, {tagName: tagName}]
        }
      }

      recalculateSkillsAndFields()
    }
    console.log(selectedExpertise)
  }

  function recalculateTagExpertise() {

  }

  function changeExperienceHandler() {
    // Removes Expertise from selectedTags
    removeAllAdditionalExpertise()
    // Removes expertise Fields from selectedExpertise
    removeAdditionalSelectedExpertise()
  }

  function removeAllAdditionalExpertise() {
    selectedTags = selectedTags.filter(selectedTag => selectedTag.tagName !== undefined)
  }

  function callMeIfYouNeedString() {

    let callMeIfYouNeed = ""

    if (tagExperienceSelected !== undefined) {
      callMeIfYouNeed += tagExperienceSelected.label

      selectedTags.map(st => {
        const t = tagsAvailable.find(ta => ta.name === st.tagName)
        if (t !== undefined) {
          callMeIfYouNeed += ` ${t.label}`
        }
      })
    }

    return callMeIfYouNeed
  }

  $: {
    amountOfAdditionalExpertiseLeft = calcAmountOfAdditionalExpertiseLeft()
    tagsSelectedAmount = (selectedTags.filter(ta => ta.tagName !== undefined) || []).length

    if (tagExperienceAvailable !== undefined) {
      tagExperienceSelected = tagExperienceAvailable.find(ta => ta.name === tagExperienceSelectedName) || {
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

    callMeIfYouNeed = callMeIfYouNeedString()
  }

  function skillUpdate(e: any) {
    // e.preventDefault()
    countSkillValue(e.detail.field)
    
    // increment

    if (e.detail.operation === "increment") {
      if (additionalSkillsChanged.length >= amountOfAdditionalSkills) {
        e.preventDefault()
      }
      else {
        additionalSkillsChanged.push(e.detail.field.name)
      }
    }
    // decrement
    else {

      if (additionalSkillsChanged.length === 0) {
        e.preventDefault()
      }
      else {
        let idx = additionalSkillsChanged.findIndex(skill => skill === e.detail.field.name)
        if (idx > -1) {
          additionalSkillsChanged.splice(idx, 1)
        }
        else {
          e.preventDefault()
        }
      }
    }
    additionalSkillsChanged = [...additionalSkillsChanged]
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
          bind:tagExperienceSelectedName={tagExperienceSelectedName}
          on:selectTag={selectTagHandler}
          on:selectExpertise={selectExpertiseHandler}
          on:changeExperience={changeExperienceHandler}
          />
      </Step>

      <!-- Expertise Picker  -->
      <Step locked={amountOfAdditionalExpertiseLeft !== 0}>
        <svelte:fragment slot="header">Choose an Additional Expertise: {amountOfAdditionalExpertiseLeft}</svelte:fragment>
        <BCCharacterCreateExpertise
          {expertiseAvailable}
          selectedTags={selectedTags}
          on:selectExpertise={selectExpertiseHandler}
        />
      </Step>

      <Step locked={additionalSkillsChanged.length < amountOfAdditionalSkills}>
        <svelte:fragment slot="header">Additional skills left: {amountOfAdditionalSkills - additionalSkillsChanged.length}</svelte:fragment>
        <div class="flex justify-center">
          <div class="w-80">
            <BcCharacterCreateSkills additionalSkillsChanged={[...additionalSkillsChanged]} fields={[...characterStubData.fields]} on:fieldUpdate={skillUpdate} />
          </div>
        </div>
      </Step>

      <Step locked={characterName === undefined || characterName === ""}>
        <svelte:fragment slot="header">General information</svelte:fragment>
        <BCCharacterCreateGeneral
          bind:characterName={characterName}
          bind:characterHeritage={characterHeritage}
          bind:characterHomeland={characterHomeland}
          bind:characterWorkplace={characterWorkplace}
          />
      </Step>

      <Step>
        <svelte:fragment slot="header">Verify character</svelte:fragment>
        <BCCHaracterCreateVerify
        {characterName}
        {characterHeritage}
        {characterHomeland}
        {characterWorkplace}
        {callMeIfYouNeed}
        {selectedExpertise}
        />
        
        <div class="flex justify-center">
          <div class="w-80">
            <BcCharacterCreateSkills editMode={false} additionalSkillsChanged={[...additionalSkillsChanged]} fields={[...characterStubData.fields]} on:fieldUpdate={skillUpdate} />
          </div>
        </div>
      </Step>

    </Stepper>

    {/await}
  </div>
</div>
