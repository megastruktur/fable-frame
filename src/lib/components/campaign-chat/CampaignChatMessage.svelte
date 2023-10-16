<script lang="ts">
	import type { ChatMessage } from "$lib/types";
	import { imageUrlToImg } from "$lib/utils";
  export let message: ChatMessage

  // If message.message has /roll prefix - parse as rolls
  if (message.message.startsWith("/roll")) {
    message.message = message.message.replace("/roll", "")
    // Find text in square brackets
    console.log(message.message)
    const match = message.message.match(/\[(.*?)\]/g)

    let rollsButtonsString = ""
    
    if (match !== null && match.length > 0) {
      match.forEach((diceRolls: string) => {
        // Remove the square brackets (though should be working from match group but NO)
        console.log(diceRolls.replace(/\[|\]/, ""))
        const diceRollsArray = diceRolls.replace(/[\[\]']+/g, "").split(", ")
        const rollsButtons = diceRollsArray.map(diceRoll => {
          return `<button class="p-0.5 px-1 bg-tertiary-900">${diceRoll}</button>`
        })
        rollsButtonsString += `<div class="space-x-1">${rollsButtons.join("")}</div>`
      })
    }
    message.message = rollsButtonsString
  }
</script>


<div>
  <div class="{message.isGm ? "bg-error-400" : ""} p-1">{message.isGm ? "GM" : message.characterName}</div>
  <div class="p-1 pl-3 bg-surface-900">
    {@html imageUrlToImg(message.message)}
  </div>
</div>
