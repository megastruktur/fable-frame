<script lang="ts">

// {
//   "name": "handgun",
//   "label": "Handgun",
//   "description": "Beretta M92FS, Colt M1911A1, CZ P-10 C, FN Five seveN, Glock 19, Glock 23, H&K USP45, H&K VP9, S&W Model 10, S&W MP40 Shield, SIG-Sauer P226, Walther P99.",
//   "type": "weaponRanged",
//   "distance": "arm/room",
//   "attacks": [
//     "Combat shooting [2] [-1 Ammo]",
//     "Overkill [3] [-2 Ammo]",
//     "Multiple targets [2] [hit up to one additional target] [-3 Ammo]"
//   ],
//   "ammo": "●●●●"
// },

	import { updateSaveCharacterField } from "$lib/characterFieldsOperations";
	import type { Field } from "$lib/types";
  import K4eRollResult from "../parts/K4eRollResult.svelte";

  export let field: Field
  export let characterId: string = ""
  export let classes: string = "card p-4 w-80"
  export let showTitle: boolean = true


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

<div class="{classes} card card-hover h-full variant-glass-secondary">

  {#if showTitle}
    <h2 class="h2 mb-3 text-center">{@html field.label}</h2>
  {/if}

  {#if field.icon !== undefined && field.icon !== ""}
    <div class="text-white h-32 mx-auto mb-3">
      {@html field.icon}
    </div>
  {/if}

  {#if field.data?.ammo !== undefined}
    <div class="text-center mb-3">
      <h4 class="h4">Ammo</h4>
      <span>{field.data.ammo}</span>
    </div>
  {/if}

  <div class="blockquote">{@html field.description}</div>

  <!-- Attacks - for Weapons only -->
  {#if field.data?.attacks !== undefined && field.data?.attacks.length > 0}
    <div class="mt-3">
      <h4 class="h4 text-center mb-3">Attacks</h4>
      <ul class="list pl-3 text-sm">
        {#each field.data.attacks as attack}
          <li class="text-left">
            <span>◆</span>
            <span>{@html attack}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  
</div>
