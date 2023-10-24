<script lang="ts">
	import { ColorPickerBgActive, ColorPickerContrast, ColorPickerText } from '$lib/enums';
	import type { DieRollChat } from '$lib/types';

  // @ts-ignore
  import { Circle0Icon, DiceD4Icon, DiceD6Icon, DiceD8Icon, DiceD10Icon, DiceD12Icon, DiceD20Icon } from 'svelte-uicons/rounded/solid'

  export let die: DieRollChat
  export let dieSize: {
    width: string,
    height: string
  }

  let textColorClass = ColorPickerText[die.color as keyof typeof ColorPickerText]
  let contrastColorClass = ColorPickerContrast[die.color as keyof typeof ColorPickerContrast]
  let bgActiveClass = ColorPickerBgActive[die.color as keyof typeof ColorPickerBgActive]

</script>

<div class="{textColorClass} {dieSize.height} {dieSize.width} flex items-center relative">
  <div class="rounded-full p-1 {bgActiveClass} border z-10 mx-auto {contrastColorClass}">{die.value}</div>
  <div class="absolute top-0 left-0">
    {#if die.die === "d2"}
      <Circle0Icon />
    {:else if die.die === "d4"}
      <DiceD4Icon />
    {:else if die.die === "d6"}
      <DiceD6Icon />
    {:else if die.die === "d8"}
      <DiceD8Icon />
    {:else if die.die === "d10"}
      <DiceD10Icon />
    {:else if die.die === "d12"}
      <DiceD12Icon />
    {:else if die.die === "d20"}
      <DiceD20Icon />
    {:else if die.die === "d100"}
      <DiceD10Icon />
    {/if}
  </div>
</div>
