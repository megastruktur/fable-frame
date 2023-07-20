<script lang="ts">
  import Icon from "svelte-icons-pack/Icon.svelte"

  export let selectedType: string
  export let type: string
  export let icon: any
</script>

<button class="btn-icon btn-icon-base {selectedType === type ? "variant-filled-secondary" : "variant-filled"}" on:click={() => selectedType = type}>
  <Icon src={icon} />
</button>
