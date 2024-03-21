<script lang="ts">
	import CreateCharacterChoiceCard from '$lib/components/characters/CreateCharacterChoiceCard.svelte';
  import barebones from "$lib/assets/barebones.webp"
  import wizard from "$lib/assets/wizard.webp"
	import { pageName } from "$lib/stores";
	import SquareCard from '$lib/components/global/SquareCard.svelte';

	pageName.set("Create Character")
</script>

<div class="pt-3">

	<h1 class="text-3xl m-auto mb-3 text-center">Choose creation method</h1>

  <div class="flex justify-around flex-wrap">

    <SquareCard
      title="Wizard"
      subtitle="Create character step by step. Limited systems."
      imageUrl={wizard}
      link="/characters/create/wizard"
      />

    <SquareCard
      title="Barebones"
      subtitle="Build character sheet with custom fields from scratch"
      imageUrl={barebones}
      link="/characters/create/barebones"
      />

    <SquareCard
      title="Import"
      subtitle="Import the previously exported character"
      link="/characters/create/import"
      />

  </div>
</div>

