<script lang="ts">
	import type { ColorForPicker } from "$lib/types";
	import { createEventDispatcher } from "svelte";
  
  const colorsListClasses: ColorForPicker[] = [
    {
      bg: "bg-primary-400",
      text: "text-white"
    },
    {
      bg: "bg-secondary-400",
      text: "text-white"
    },
    {
      bg: "bg-tertiary-400",
      text: "text-white"
    },
    {
      bg: "bg-success-400",
      text: "text-white"
    },
    {
      bg: "bg-warning-400",
      text: "text-white"
    },
    {
      bg: "bg-error-400",
      text: "text-white"
    },
    {
      bg: "bg-surface-400",
      text: "text-white"
    },
  ]

  const dispatch = createEventDispatcher()

  function selectColorHandler(colorClasses: ColorForPicker) {
    dispatch("selectColor", colorClasses)
  }

</script>

<div class="flex">
  {#each colorsListClasses as colorClasses}
    <button on:click={() => selectColorHandler(colorClasses)} class="w-5 h-5 {colorClasses.bg} {colorClasses.text}"></button>
  {/each}
</div>
