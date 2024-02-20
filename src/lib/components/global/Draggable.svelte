<script lang="ts">
	import { draggable } from '@neodrag/svelte'
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  export let title = ""
</script>

<!-- <div use:dragMe draggable="true"> -->
<div class="w-fit" use:draggable={{  }} >
  <!-- <div class="bg-secondary-900/75">
    <h3 class="h4 ml-3">{title}</h3>
  </div> -->

  <div class="bg-surface-900/70">
      <Accordion
        regionControl="hover:!bg-transparent"
        class="">
        <AccordionItem>
          <svelte:fragment slot="summary">{title}</svelte:fragment>
          <svelte:fragment slot="content">
            <slot />
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
  </div>
</div>

