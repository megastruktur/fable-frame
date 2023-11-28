<script lang="ts">
	import { currentUser } from "$lib/pocketbase";
  
  const iconClasses = "text-4xl"
</script>

<div class="flex flex-wrap space-x-3">
  <a
    href="/"
    class="btn btn-icon">
    <i class="{iconClasses} i-ph-question"></i>
  </a>
  {#if $currentUser}
    <a
      href="/login"
      class="btn btn-icon">
      <i class="{iconClasses} i-iconamoon-profile"></i>
    </a>
    <a
      href="/campaigns"
      class="btn btn-icon">
      <i class="{iconClasses} i-ph-path"></i>
    </a>
    <a
      href="/characters/create"
      class="btn btn-icon relative">
      <i class="{iconClasses} text-success-900 i-ri-profile-line"></i>
      <i class="text-xl i-ph-plus absolute bottom-0 right-0"></i>
    </a>
    <a
      href="/characters"
      class="btn btn-icon">
      <i class="{iconClasses} i-ri-profile-line"></i>
    </a>

  {:else}
    <a
      href="/login"
      class="btn btn-icon">
      <i class="{iconClasses} i-material-symbols-login"></i>
    </a>
  {/if}
</div>
