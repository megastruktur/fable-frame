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
  let tagsExpertiseSelected: {tag?: Field, expertise?: Field}[] = []
  let tagsSelectedAmount: number
  let tagExperienceSelectedName: string = "experienced"
  let tagExperienceSelected: Field

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

  function selectExpertiseHandler(e: any) {
    // find the tag in selectedTags by tagName and update expertiseName
    let expertiseName: string = e.detail.expertiseName
    let tagName: string = e.detail.tagName

    if (tagName !== undefined) {
      // Set Tag-based expertise
      tagsExpertiseSelected.forEach(tes => {
        if (tes.tag !== undefined && tes.tag.name === tagName) {
          // Remove the already selected expertise if any
          const expertise = expertiseAvailable.find(expertise => expertise.name === expertiseName)
          if (expertise !== undefined) {
            tes.expertise = expertise
          }
          return
        }
      })
    }
    // Set additional expertise
    else {
      const foundAdditionalExpertise = tagsExpertiseSelected.find(tes => tes.expertise !== undefined && tes.expertise.name === expertiseName && tes.tag === undefined)
      // Remove Expertise
      if (foundAdditionalExpertise) {
        tagsExpertiseSelected = tagsExpertiseSelected.filter(tes => tes.expertise !== undefined && tes.expertise.name !== expertiseName)
      }
      else {     
        // Add Expertise 
        if (amountOfAdditionalExpertiseLeft > 0) {
          const addExpertise = expertiseAvailable.find(expertise => expertise.name === expertiseName)
          if (addExpertise !== undefined) {
            tagsExpertiseSelected = [...tagsExpertiseSelected, {expertise: addExpertise}]
          }
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

    if (tagsExpertiseSelected !== undefined) {
      left = expertiseAmountByExperience - tagsExpertiseSelected.filter(tes => tes.tag === undefined).length
    }
    return left
  }

  // Create a BC character
  async function createComplete() {

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

    // Add tags and expertise
    tagsExpertiseSelected.forEach(tes => {
      if (tes.tag !== undefined) {
        addCharacterField(characterStubData, tes.tag)
      }
      if (tes.expertise !== undefined) {
      addCharacterField(characterStubData, tes.expertise)
      }
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

    const tagsSelected = tagsExpertiseSelected.filter(tes => tes.tag !== undefined).map(t => t.tag)

    // Recalculate skills
    let skillFields = getCharacterFieldsByGroup(characterStubData, "skill")

    // Increment a Backup Field from the second tag if field of the first
    //  tag is the same as field on the second (if the second tag exists).
    let fieldNameToIncrement1: string
    let fieldNameToIncrement2: string

    if (tagsSelected[0] !== undefined) {
      fieldNameToIncrement1 = tagsSelected[0].data?.field

      if (fieldNameToIncrement1 !== undefined && tagsSelected[1] !== undefined) {
        if (tagsSelected[1].data?.field !== fieldNameToIncrement1) {
          fieldNameToIncrement2 = tagsSelected[1].data?.field
        }
        else {
          fieldNameToIncrement2 = tagsSelected[1].data?.backup_field
        }
      }

      // Iterate though all skills
      skillFields.map(skill => {

        // Increment Skill
        tagsSelected.forEach(sE => {
          if (sE?.data?.skills.includes(skill.name)) {
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

    // cleanup existing expertise
    removeAllAdditionalExpertise()

    if (tagName !== undefined) {

      // Remove Tag
      const selectedTag = tagsExpertiseSelected.find(tes => tes.tag !== undefined && tes.tag.name === tagName)
      if (selectedTag !== undefined) {

        tagsExpertiseSelected = tagsExpertiseSelected.filter(tes => {

          if (tes.tag === undefined || (tes.tag !== undefined && tes.tag.name !== tagName)) {
            return tes
          }

        })
      }
      // Add Tag
      else {
        const selectedTagsAmount = tagsExpertiseSelected.filter(tes => tes.tag !== undefined).length
        if (selectedTagsAmount < 2) {
          const tag = tagsAvailable.find(tag => tag.name === tagName)

          if (tag !== undefined) {
            tagsExpertiseSelected = [...tagsExpertiseSelected, {tag: tag}]
          }
        }
      }

      recalculateSkillsAndFields()
    }
  }

  function changeExperienceHandler() {
    // Removes Expertise from selectedTags
    removeAllAdditionalExpertise()
  }

  function removeAllAdditionalExpertise() {
    tagsExpertiseSelected = tagsExpertiseSelected.filter(tes => tes.tag !== undefined)
  }

  function callMeIfYouNeedString() {

    let callMeIfYouNeed = ""

    if (tagExperienceSelected !== undefined) {
      callMeIfYouNeed += tagExperienceSelected.label

      tagsExpertiseSelected.map(tes => {
        if (tes.tag !== undefined) {
          callMeIfYouNeed += ` ${tes.tag.label}`
        }
      })
    }

    return callMeIfYouNeed
  }

  $: {
    amountOfAdditionalExpertiseLeft = calcAmountOfAdditionalExpertiseLeft()
    tagsSelectedAmount = (tagsExpertiseSelected.filter(tes => tes.tag !== undefined) || []).length

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
          {tagsExpertiseSelected}
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
          {tagsExpertiseSelected}
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
        selectedExpertise={tagsExpertiseSelected.filter(tes => tes.expertise !== undefined).map(tes => tes.expertise)}
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
