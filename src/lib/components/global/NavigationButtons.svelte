<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
  
  const iconClasses = "text-4xl"
</script>

<div class="flex flex-wrap justify-center space-x-3">
  <a
    href="/"
    class="btn btn-icon">
    <i class="i-[ph--question] {iconClasses}"></i>
  </a>
  {#if $currentUser}
    <a
      href="/login"
      class="btn btn-icon">
      <i class="i-[iconamoon--profile] {iconClasses}"></i>
    </a>
    <a
      href="/campaigns"
      class="btn btn-icon">
      <i class="i-[ph--path] {iconClasses}"></i>
    </a>
    <a
      href="/characters/create"
      class="btn btn-icon relative">
      <i class="i-[ri--profile-line] {iconClasses} text-success-900"></i>
      <i class="i-[ph--plus] text-xl absolute bottom-0 right-0"></i>
    </a>
    <a
      href="/characters"
      class="btn btn-icon">
      <i class="i-[ri--profile-line] {iconClasses}"></i>
    </a>

  {:else}
    <a
      href="/login"
      class="btn btn-icon">
      <i class="i-[material-symbols--login] {iconClasses}"></i>
    </a>
  {/if}
</div>
