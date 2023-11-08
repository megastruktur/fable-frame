<script lang="ts">
	import type { K4eRollResult } from "$lib/types";

  export let rollResult: K4eRollResult

  const rolledRange: "15+" | "10-14" | "-9" = rollResult.type === "success"
    ? "15+"
    : (rollResult.type === "partial" ? "10-14" : "-9")

</script>

<div class="py-3">
  <p>
    <span class="text-primary-600 font-bold">({rolledRange}) </span>
    <span>{@html rollResult.description}</span>
  </p>

  {#if rollResult.choice !== undefined}
  <ul class="list pl-3">
    {#each rollResult.choice as choice}
    <li>
      <span class="text-primary-900 text-xs font-bold">◇</span>
      <span class="flex-auto">{@html choice}</span>
    </li>
    {/each}
  </ul>
  {/if}

</div>
