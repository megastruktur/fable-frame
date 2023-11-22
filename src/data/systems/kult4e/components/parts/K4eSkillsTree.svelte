<script lang="ts">
	import type { Field } from "$lib/types";
	import Sephiroth from "./Sephiroth.svelte";
  // import Background from "$data/systems/kult4e/assets/Dream_Background.svg?raw"
  import Background from "$data/systems/kult4e/assets/HnIb3e01.svg"
	import { onMount } from "svelte";

  export let fields: Field[]
  export let editMode: boolean = false
  export let activeTabName: string

  const marginClassOne: string = "justify-center space-x-10"
  const marginClassTwo: string = "justify-between space-x-10"

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

  // let line1: SVGLineElement
  let svgGLobal: any
  let seph1: any
  let seph2: any
  let seph3: any
  let seph4: any
  let seph5: any
  let seph6: any
  let seph7: any
  let seph8: any
  let seph9: any
  let seph10: any

  function getXYCenterFromOffsetElement(element: any) {
    const rect = element.getBoundingClientRect()
    return {
      x: element.offsetLeft + rect.width / 2,
      y: element.offsetTop + rect.height / 2,
    }
  }

  function drawLine(element1: any, element2: any) {

    if (element1 !== undefined && element2!== undefined && svgGLobal !== undefined) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const pos1 = getXYCenterFromOffsetElement(element1)
      const pos10 = getXYCenterFromOffsetElement(element2)
      line.setAttribute('x1', pos1.x);
      line.setAttribute('y1', pos1.y);
      line.setAttribute('x2', pos10.x);
      line.setAttribute('y2', pos10.y);
      line.setAttribute('style', 'stroke: #690A1D; stroke-width: 4;');

      svgGLobal.appendChild(line);
    }
  }

  function drawSephPaths() {
    // Remove all lines from svgGLobal
    if (svgGLobal !== undefined) {
      while (svgGLobal.firstChild) {
        svgGLobal.removeChild(svgGLobal.firstChild);
      }
    }

    drawLine(seph1, seph2)
    drawLine(seph1, seph10)
    drawLine(seph1, seph3)
    drawLine(seph2, seph3)
    drawLine(seph2, seph4)
    drawLine(seph2, seph6)
    drawLine(seph3, seph5)
    drawLine(seph3, seph6)
    drawLine(seph4, seph5)
    drawLine(seph4, seph6)
    drawLine(seph4, seph7)
    drawLine(seph5, seph6)
    drawLine(seph5, seph8)
    drawLine(seph6, seph7)
    drawLine(seph6, seph8)
    drawLine(seph7, seph8)
    drawLine(seph7, seph9)
    drawLine(seph7, seph10)
    drawLine(seph8, seph9)
    drawLine(seph8, seph10)
    
  }

  onMount(() => {
    drawSephPaths()
  })

  $: {
    if (activeTabName === "skills") {
      drawSephPaths()
    }
  }

</script>

<div class="relative">
  <svg class="absolute top-0 left-0 w-full h-full" bind:this={svgGLobal}></svg>
<!-- <div
  class="bg-contain bg-center"
  style="background-image: url({Background});"> -->

  <!-- <div class="relative">
    <div class="absolute top-0 w-full opacity-10">{@html Background}</div>
  </div> -->
  <div
    class="absolute top-0 left-0 h-full w-full bg-contain bg-center opacity-40 text-white"
    style="background-image: url({Background});">
  </div>

  <!-- Willpower -->
  <div class="flex {marginClassOne}">
    <Sephiroth bind:element={seph1} field={willpower} {editMode}
      on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Fortitude -->
  <!-- Reflexes -->
  <div class="flex {marginClassTwo} mb-5">
    <Sephiroth bind:element={seph3} field={fortitude} {editMode}
      on:fieldRemove on:fieldUpdate
      />
    <Sephiroth bind:element={seph2} field={reflexes} {editMode}
      on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Reasoning -->
  <!-- Intuition -->
  <div class="flex {marginClassTwo}">
    <Sephiroth bind:element={seph5} field={reasoning} {editMode}
      on:fieldRemove on:fieldUpdate
      />
    <Sephiroth bind:element={seph4} field={intuition} {editMode}
      on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Perception -->
  <div class="flex {marginClassOne}">
    <Sephiroth bind:element={seph6} field={perception} {editMode}
      on:fieldRemove on:fieldUpdate
      />
  </div>


  <!-- Coolness -->
  <!-- Violence -->
  <div class="flex {marginClassTwo}">
    <Sephiroth bind:element={seph8} field={coolness} {editMode}
      on:fieldRemove on:fieldUpdate
      />
    <Sephiroth bind:element={seph7} field={violence} {editMode}
      on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Charisma -->
  <div class="flex mb-10 {marginClassOne}">
    <Sephiroth bind:element={seph9} field={charisma} {editMode}
      on:fieldRemove on:fieldUpdate
      />
  </div>

  <!-- Soul -->
  <div class="flex {marginClassOne}">
    <Sephiroth bind:element={seph10} field={soul} {editMode}
    on:fieldRemove on:fieldUpdate
    />
  </div>
</div>



