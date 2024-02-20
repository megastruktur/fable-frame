<script lang="ts">

  export let icon: string
  export let link: string = ""
  export let color: string = ""

</script>

<a
  on:click
  href={link ? link : "#"}
  class="btn btn-icon {color} text-3xl">
  <i class="{icon}" />
</a>
