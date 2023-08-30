<script lang="ts">

  export let characterName: string
  export let characterHeritage: string
  export let characterHomeland: string
  export let characterWorkplace: string

</script>

<form>
  <label class="label">
    <span>Your name</span>
    <input class="input" type="text" placeholder="Your name" bind:value={characterName} />
  </label>
  <label class="label">
    <span>Heritage</span>
    <input class="input" type="text" placeholder="Where you were born" bind:value={characterHeritage} />
  </label>
  <label class="label">
    <span>Homeland</span>
    <input class="input" type="text" placeholder="Where you grew up" bind:value={characterHomeland} />
  </label>
  <label class="label">
    <span>Workplace</span>
    <input class="input" type="text" placeholder="Where you do you business" bind:value={characterWorkplace} />
  </label>
</form>
