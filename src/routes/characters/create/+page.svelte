<script lang="ts">
	import CreateCharacterChoiceCard from './../../../lib/components/characters/CreateCharacterChoiceCard.svelte';
  import barebones from "$lib/assets/barebones.webp"
  import wizard from "$lib/assets/wizard.webp"
	import { pageName } from "$lib/stores";

	pageName.set("Create Character")
</script>

<div class="pt-3">

	<h1 class="text-3xl m-auto mb-3 text-center">Choose creation method</h1>

  <div class="flex justify-around flex-wrap">

    <CreateCharacterChoiceCard
      typeId="wizard" image={wizard}
      typeName="Wizard"
      typeDescription="Create character step by step. Limited systems."
      />

    <CreateCharacterChoiceCard
      typeId="barebones" image={barebones}
      typeName="Barebones"
      typeDescription="Build character sheet with custom fields from scratch"
      />

    <CreateCharacterChoiceCard
      typeId="import"
      typeName="Import"
      typeDescription="Import the previously exported character"
      />

  </div>
</div>

