<script lang="ts">

  export let classes: string = ""
  export let link: string = "#"
  export let imageUrl: string = ""
  export let title: string = ""
  export let subtitle: string = ""
  export let width: string = "w-72"
  export let height: string = "h-72"
  export let isAddButton: boolean = false

</script>

<a
  class="card block {width} {height} bg-cover bg-no-repeat bg-center relative overflow-hidden {classes}"
  style="background-image: url('{imageUrl}')"
  href={link}>


  
  <div class="w-full h-full bg-surface-900/70 flex flex-col {isAddButton ? "items-center" : ""} justify-center">
    
    {#if isAddButton}
    
      <i class="i-[gridicons--plus] text-6xl" />
    
    {:else}
      <section class="p-4">
        <h2 class="h2 text-center">{title}</h2>
      </section>
      <footer class="card-footer italic text-center">
        <p class="mt-1 blo">{subtitle}</p>
        <slot name="linkButtons"></slot>
      </footer>
    {/if}

  </div>
  
  <div class="absolute w-full top-2 flex justify-between px-3">
    <slot name="actionButtons"></slot>
  </div>


</a>
