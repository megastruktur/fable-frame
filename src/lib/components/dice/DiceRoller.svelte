<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  let dieToRoll: string = ""
  const diceList = [
    "d100", "d20", "d12", "d10", "d8", "d6", "d4", "d2",
  ]


  const diceAmounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


  function rollDiceAmount(amount: number) {    
    dispatch("diceRoll", amount + dieToRoll)
    dieToRoll = ""
  }

  function selectDieToRoll(die: string) {

    // Toggle die selection
    if (dieToRoll === die) {
      dieToRoll = ""
    }
    else {
      dieToRoll = die    
    }
  }
</script>

<div class="pt-3">

  {#if dieToRoll !== ""}
    <div class="flex flex-wrap mb-2">

      {#each diceAmounts as amount}
        <button class="w-10" on:click={() => rollDiceAmount(amount)}>
          <h4 class="h4">{amount}</h4>
        </button>
      {/each}

    </div>
  {/if}


  <div class="flex flex-wrap justify-between">

    {#each diceList as die}
      <button
        class="p-0.5 rounded-xl border {dieToRoll === die ? "border-surface-200" : "border-surface-900"}"
        on:click={() => selectDieToRoll(die)}
        >
        <p class="p-1 rounded-lg {dieToRoll === die? "variant-filled-secondary" : "variant-filled-tertiary"}">{die}</p>
      </button>
    {/each}
  </div>
</div>


