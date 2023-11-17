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


  // async function deselectOption(option: string) {

  //   if (characterId !== "") {

  //     if (field.data?.selectedOptions !== undefined) {
  //       field.data.selectedOptions = field.data.selectedOptions.filter((o: string) => o !== option);
  //     }
  
  //     if (field.data !== undefined) {
  //       field.data.options = [option, ...field.data?.options]
  //     }
  
  //     if (characterId !== undefined) {
  //       updateSaveCharacterField(characterId, field)
  //     }
  //   }
  // }

  // async function selectOption(option: string) {

  //   if (characterId !== "") {
  //     if (field.data !== undefined && field.data.options !== undefined) {
  //       field.data.options = field.data.options.filter((o: string) => o !== option);
  //     }

  //     if (field.data !== undefined) {
  //       field.data.selectedOptions = [option, ...field.data.selectedOptions || []]
  //     }

  //     if (characterId !== undefined) {
  //       updateSaveCharacterField(characterId, field)
  //     }
  //   }

  // }

</script>

<div class="{classes} card h-full variant-glass-secondary {selected ? "border-red-500 border" : "border border-transparent"}">

  {#if showTitle}
    <h2 class="h2 mb-3 text-center">{@html field.label}</h2>
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

  <div class="blockquote">{@html field.description}</div>

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
  
</div>
