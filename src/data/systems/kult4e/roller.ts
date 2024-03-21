// import { getFieldByNameFromList } from "$lib/characterFieldsOperations"

import { getFieldByNameFromList } from "$lib/characterFieldsOperations";
import type { CharactersResponse } from "$lib/pocketbase-types";
import type { FFRoll, Field } from "$lib/types";
import { DiceRoll, exportFormats } from "@dice-roller/rpg-dice-roller";
import { type ToastSettings } from "@skeletonlabs/skeleton";

export default function roller(ffRoll: FFRoll, character: CharactersResponse, toastStore: any) {

  if (ffRoll.field !== undefined) {

    let bonusAmount = 0

    const field: Field = ffRoll.field
    const stability = getFieldByNameFromList(character.fields, "stability")
    const seriousWound1 = getFieldByNameFromList(character.fields, "serious-wound-1")
    const seriousWound2 = getFieldByNameFromList(character.fields, "serious-wound-2")
    const seriousWound3 = getFieldByNameFromList(character.fields, "serious-wound-3")
    const seriousWound4 = getFieldByNameFromList(character.fields, "serious-wound-4")
    const criticalWound = getFieldByNameFromList(character.fields, "critical-wound")

    const fieldToRoll = getFieldByNameFromList(character.fields, field?.attribute)
    
    // If injured - add negative bonus
    if (parseInt(seriousWound1.value) > 0 || parseInt(seriousWound2.value) > 0 || parseInt(seriousWound3.value) > 0 || parseInt(seriousWound4.value) > 0) {
      bonusAmount = bonusAmount -1
    }

    if (parseInt(criticalWound.value) > 0) {
      bonusAmount = bonusAmount - 1
    }

    // If too stressed and throwing Keep It together - add negative bonus
    if (field.name === "willpower") {
      if (parseInt(stability.value) >= 3) {
        bonusAmount = bonusAmount -1
      }
      // Additional penalty.
      if (parseInt(stability.value) >= 6) {
        bonusAmount = bonusAmount -1
      }
    }

    bonusAmount = bonusAmount + Number(fieldToRoll.value)

    const roll = new DiceRoll(`2d10 + ${bonusAmount}`)

    let background = "variant-filled-warning"

    if (roll.total >= 15) {
      background = "variant-filled-success"
    }
    else if (roll.total <= 9) {
      background = "variant-filled-error"
    }

    const t: ToastSettings = {
      message: `You rolled: ${roll.output}`,
      autohide: false,
      background: background,
    };

    toastStore.trigger(t)

    return roll
  }
}
