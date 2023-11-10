<script lang="ts">
	import type { Field } from "$lib/types";
  import {flip} from "svelte/animate"
	import Sephiroth from "./Sephiroth.svelte";


  export let fields: Field[]
  export let editMode: boolean = false

  const flipDurationMs: number = 300
  const marginClass: string = "justify-center space-x-10"

  let willpower: Field = fields.find((field) => field.name === 'willpower')
  let reflexes: Field = fields.find((field) => field.name === 'reflexes')
  let fortitude: Field = fields.find((field) => field.name === 'fortitude')
  let intuition: Field = fields.find((field) => field.name === 'intuition')
  let reasoning: Field = fields.find((field) => field.name === 'reasoning')
  let perception: Field = fields.find((field) => field.name === 'perception')
  let violence: Field = fields.find((field) => field.name === 'violence')
  let coolness: Field = fields.find((field) => field.name === 'coolness')
  let charisma: Field = fields.find((field) => field.name === 'charisma')
  let soul: Field = fields.find((field) => field.name === 'soul')

</script>

<div>

  <!-- Willpower -->
  <div class="flex {marginClass}">
    <Sephiroth field={willpower} {editMode}
      form="square" on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Fortitude -->
  <!-- Reflexes -->
  <div class="flex {marginClass} mb-5">
    <Sephiroth field={fortitude} {editMode}
      form="square" on:fieldRemove on:fieldUpdate
      />
    <Sephiroth field={reflexes} {editMode}
      form="square" on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Reasoning -->
  <!-- Intuition -->
  <div class="flex {marginClass}">
    <Sephiroth field={reasoning} {editMode}
      form="circle" on:fieldRemove on:fieldUpdate
      />
    <Sephiroth field={intuition} {editMode}
      form="circle" on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Perception -->
  <div class="flex {marginClass}">
    <Sephiroth field={perception} {editMode}
      form="circle" on:fieldRemove on:fieldUpdate
      />
  </div>


  <!-- Coolness -->
  <!-- Violence -->
  <div class="flex {marginClass}">
    <Sephiroth field={coolness} {editMode}
      form="circle" on:fieldRemove on:fieldUpdate
      />
    <Sephiroth field={violence} {editMode}
      form="circle" on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Charisma -->
  <div class="flex mb-10 {marginClass}">
    <Sephiroth field={charisma} {editMode}
      form="circle" on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Soul -->
  <div class="flex {marginClass}">
    <Sephiroth field={soul} {editMode}
    form="circle" on:fieldRemove on:fieldUpdate
    />
  </div>
</div>

