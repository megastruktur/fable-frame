<script lang="ts">
	import { ColorPicker, ColorPickerBg } from "$lib/enums";
	import { createEventDispatcher } from "svelte";
  
  const colorsKeys = Object.keys(ColorPicker)
  
  const dispatch = createEventDispatcher()

  function selectColorHandler(colorClasses: string) {
    dispatch("selectColor", colorClasses)
  }

</script>

<div class="flex">
  {#each colorsKeys as colorName}
    <button on:click={() => selectColorHandler(colorName)} class="w-5 h-5 {ColorPickerBg[colorName]}"></button>
  {/each}
</div>
