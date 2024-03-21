<script lang="ts">

  import { DiceRoll } from '@dice-roller/rpg-dice-roller'
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

  const toastStore = getToastStore()
  const modalStore = getModalStore()

  export let parent;

  let bonusAmount = 0

  function roll() {
    const roll = new DiceRoll(`2d10 + ${bonusAmount}`);

    let background = "variant-filled-warning"

    if (roll.total >= 15) {
      background = "variant-filled-success"
    }
    else if (roll.total <= 9) {
      background = "variant-filled-error"
    }

    const t: ToastSettings = {
      message: `You rolled: ${roll.total}`,
      autohide: false,
      background: background,
    };

    toastStore.trigger(t)
    modalStore.close()
  }

</script>

<div class="rounded-xl bg-surface-700 bg-opacity-60 text-3xl p-5 text-center w-72">
  <div class="my-3">
    <div>2d10</div>
    <div>+</div>

    <div class="flex justify-around items-center">
  
      <button
        on:click={() => bonusAmount--}
        class="btn btn-icon variant-outline-primary">
        <span class="i-[gridicons--minus]"></span>
      </button>
      
      <span>{bonusAmount}</span>
  
      <button
        on:click={() => bonusAmount++}
        class="btn btn-icon variant-outline-primary">
        <span class="i-[gridicons--plus]"></span>
      </button>

    </div>
  </div>

  <div>
    <button
      on:click={roll}
      class="btn w-full variant-ghost-warning">
      <span class="i-[fa6-solid--dice] text-3xl"></span>
    </button>
  </div>
</div>
