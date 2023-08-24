import type { Field } from "$lib/types";


export function skillIncrementEvent(skill: Field, dispatch: any) {

  const dispatchData = {
    operation: "increment",
    field: skill
  }

  const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

  if (dispatched) {
    return skillIncrement(skill)
  }
  else {
    throw new Error("Operation cancelled")
  }
}

export function skillIncrement(skill: Field) {
  let value = "";
  let incremented = false;
  for (let i = 0; i < skill.value.length; i++) {

    if (skill.value.charAt(i) === "-" && !incremented) {
      value += "+"
      incremented = true
    }
    else {
      value += skill.value.charAt(i)
    }
  }

  skill.value = value

  return skill
}

export function skillDecrementEvent(skill: Field, dispatch: any) {

  const dispatchData = {
    operation: "decrement",
    field: skill
  }

  const dispatched = dispatch("fieldUpdate", dispatchData, { cancelable: true })

  if (dispatched) {
    return skillDecrement(skill)
  }
  else {
    throw new Error("Operation cancelled")
  }

}

export function skillDecrement(skill: Field) {
  let value = "";
  let decremented = false;

  for (let i = (skill.value.length - 1); i >= 0; i--) {

    if (skill.value.charAt(i) === "+" && !decremented) {
      value = "-" + value
      decremented = true
    }
    else {
      value = skill.value.charAt(i) + value
    }
  }

  skill.value = value

  return skill
}

export function countSkillValue(value: string) {
  let count = 0;
  for (let i = 0; i < value.length; i++) {
    if (value.charAt(i) === "+") {
      count++;
    }
  }
  return count;
}
