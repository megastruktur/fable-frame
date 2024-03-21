<script lang="ts">

  export let image: string = ""
  export let typeId: string
  export let typeName: string
  export let typeDescription: string

</script>

<a
  class="card card-hover block w-72 h-72 bg-cover bg-no-repeat bg-center relative overflow-hidden"
  style="background-image: url('{image}')"
  href="/characters/create/{typeId}">


  <div class="w-full h-full bg-surface-900/70 flex flex-col justify-center">
    <section class="p-4">
      <h2 class="h2 text-center">{typeName}</h2>
    </section>
    <footer class="card-footer italic text-center">
      <p class="mt-1 blo">{typeDescription}</p>
    </footer>
  </div>

</a>
