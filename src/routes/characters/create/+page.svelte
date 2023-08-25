<script lang="ts">
  import barebones from "$lib/assets/barebones.webp"
  import wizard from "$lib/assets/wizard.webp"

</script>

<div>

	<h1 class="text-3xl m-auto my-3 text-center">Choose creation method</h1>

  <div class="flex justify-around flex-wrap">

    <a href="/characters/create/wizard" class="card w-80 p-4 justify-center items-center bg-initial card-hover">
      <header>
        <img src="{wizard}" alt="wizard" />
      </header>
      <div>
        <h2 class="h2 text-center">Wizard</h2>
        <article>
          <p class="text-center">Create character step by step. Limited systems.</p>
        </article>
      </div>
    </a>

    <a href="/characters/create/barebones" class="card w-80 p-4 justify-center items-center bg-initial card-hover">
      <header>
        <img src="{barebones}" alt="barebones" />
      </header>
      <div>
        <h2 class="h2 text-center">Barebones</h2>
        <article>
          <p class="text-center">Build character sheet with custom fields from scratch</p>
        </article>
      </div>
    </a>

  </div>
</div>

