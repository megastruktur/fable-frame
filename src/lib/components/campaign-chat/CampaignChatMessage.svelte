<script lang="ts">
	import type { ChatMessage } from "$lib/types";
	import { imageUrlToImg } from "$lib/utils";
  export let message: ChatMessage
</script>


<div>
  <div class="{message.isGm ? "bg-error-400" : "bg-surface-700"} p-1">{message.isGm ? "GM" : message.characterName}</div>
  <div class="p-1 pl-3">
    {@html imageUrlToImg(message.message)}
  </div>
</div>
