<script lang="ts">

	import type { Field } from "$lib/types";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

  export let field: Field
  export let classes: string = "card p-4 w-80"
  export let showTitle: boolean = true
  export let selected: boolean = false
  export let characterId: string = ""
  export let color: string = ""
  export let colorEdit: string = ""
  export let colorButtons: string = ""
  export let updateWithoutEditMode: boolean = false
  export let placeholder: string = ""
  export let placeholderArea: string = ""
  export let editableClasses: string = ""
  export let editable: boolean = true
  export let editMode: boolean = false
  export let labelStyle: string = ""
  export let valueStyle: string = ""
  export let fullEditable: boolean = false

</script>

<div class="{classes} card h-full variant-glass-secondary {selected ? "border-red-500 border" : "border border-transparent"}">

  {#if showTitle}

    {#if editMode && editable}
      <input class="input" bind:value={field.label} />
    {:else}
      <h2 class="h2 mb-3 text-center">{@html field.label}</h2>
    {/if}
  {/if}

  {#if field.icon !== undefined && field.icon !== ""}
    <div class="text-white h-32 mx-auto mb-3">
      {@html field.icon}
    </div>
  {/if}

  {#if field.data?.ammo !== undefined && field.data?.ammo}
    <div class="text-center mb-3">
      <h4 class="h4">Ammo</h4>
      <span>{field.data.ammo}</span>
    </div>
  {/if}

  {#if editMode && editable}
    <textarea class="textarea" bind:value={field.description} />
  {:else}
    <div class="blockquote text-left">{@html field.description}</div>
  {/if}

  <!-- Attacks - for Weapons only -->
  {#if field.data?.attacks !== undefined && field.data?.attacks.length > 0}
    <div class="mt-3">
      <Accordion
        regionCaret="hidden"
        rounded="md">
        <AccordionItem>
          <svelte:fragment slot="summary"><div class="text-center">Attacks</div></svelte:fragment>
          <svelte:fragment slot="content">
            <ul class="list pl-3 text-sm">
              {#each field.data.attacks as attack}
                <li class="text-left">
                  <span>◆</span>
                  <span>{@html attack}</span>
                </li>
              {/each}
            </ul>
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
      
    </div>
  {/if}

  <!-- Actions -->
  {#if field.data?.actions !== undefined && field.data?.actions.length > 0}
    <div class="mt-3">
      <Accordion
        regionCaret="hidden"
        rounded="md">
        <AccordionItem>
          <svelte:fragment slot="summary"><div class="text-center">Actions</div></svelte:fragment>
          <svelte:fragment slot="content">
            <ul class="list pl-3 text-sm">
              {#each field.data.actions as action}
                <li class="text-left">
                  <span>◆</span>
                  <span>{@html action}</span>
                </li>
              {/each}
            </ul>
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
      
    </div>
  {/if}
  
</div>
