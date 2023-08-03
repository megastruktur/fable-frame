<script lang="ts">
  import { onDestroy } from 'svelte'
  import MediaQuery, { createMediaStore } from 'svelte-media-queries'
	import type { CharactersResponse } from "$lib/pocketbase-types";
  import { characterStore, editMode } from "$lib/stores"
	import type { Field } from "$lib/types";
	import { getCharacterTabs } from '$models/character';
	import CharacterSheetTab from '$lib/components/CharacterSheetTab.svelte';
	import CircleAdd from '$lib/components/circle-add/CircleAdd.svelte';
	import StatsTab from './StatsTab.svelte';


  const query = {
    "mobile": "(max-width: 480px)",
    "tablet": "(min-width: 480px) and (max-width: 768px)",
    "largeTablet": "(min-width: 768px) and (max-width: 1200px)",
    "desktop": "(min-width: 1200px)",
    "other": [
      "(min-width: 1200px)",
      "(max-height: 900px)"
    ],
    "themes": {
      "dark": "(prefers-color-scheme: dark)",
      "light": "(prefers-color-scheme: light)"
    }
  } //  

  const matches = createMediaStore(query) //The type of the store will completely repeat the query
  

  let activeTabName: string = "general"
  // let tabs: Map<string, Field[]> = new Map()
  let tabsContent: { [key: string]: Field[] } = {general: []}
  let tabs: Field[]
  
  const unsubscribeCharacterStore = characterStore.subscribe((character: CharactersResponse) => {

    tabs = getCharacterTabs(character)

    // Create tabs placeholders
    tabs.forEach((tab: Field) => {
      tabsContent[tab.name] = []
    })

    console.log(character)

    character.fields.forEach((field: Field) => {
      if (field.group && field.type !== "tab") {

        // If tab doens't exist add fields to "general" tab.
        let tabExists = tabs.filter((tab: Field) => tab.name === field.group)
        let tabNameToAdd = "general"

        if (tabExists.length !== 0) {
          tabNameToAdd = field.group
        }
        
        tabsContent[tabNameToAdd] = [...tabsContent[field.group], field]
      }
    })
  })

  onDestroy(() => {
    matches.destroy() //Stop events for calculation
    unsubscribeCharacterStore()
  })
  
</script>

<MediaQuery query='(max-width: 1200px)' let:matches>

{#if matches}
<div class="tabs tabs-boxed w-72">
  {#each tabs as tab}
  <a
    href="/"
    class="tab p-1 {tab.name === activeTabName ? "tab-active bg-neutral-900/90" : "bg-neutral-900/50"}"
    on:click|preventDefault={() => activeTabName = tab.name}
    >{tab.label}</a>
  {/each}
</div>
{/if}

<div class="flex {matches ? "flex-col items-center" : "justify-center flex-wrap"}">

  {#each tabs as tab}
    {#if tab.name === "statsnsaves"}
      <StatsTab {tab} fields={[...tabsContent[tab.name]]} bind:activeTabName={activeTabName} {matches} />
    {:else}

      <CharacterSheetTab {tab} fields={[...tabsContent[tab.name].sort((a, b) => {return a.weight - b.weight})]} bind:activeTabName={activeTabName} {matches} />
    {/if}
  {/each}

  {#if $editMode}
  <CircleAdd type="tab" />
  {/if}
</div>
</MediaQuery>
