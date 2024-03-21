import type { DiceRoll } from "@dice-roller/rpg-dice-roller";
import type { DieRollChat, FFRoll } from "./types";
import { v4 as uuidv4 } from 'uuid'
import { createChatMessage } from "$models/campaign_chat";

export function getImageUrlsFromText(text: string): (string | undefined)[] {
  const matches = text.match(/https?:\/\/\S+/g) || [];

  return matches.map((match) => {
    if (match.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return match
    }
  });
}

export function imageUrlToImg(text: string, maxWidthClass = "w-96"): string {

  let formattedText: string = text
  const imageUrls: (string | undefined)[] = getImageUrlsFromText(text);
  const imageTags: string[] = [];

  imageUrls.forEach((imageUrl) => {
    if (imageUrl!== undefined) {
      imageTags.push(`<img alt="note loaded" class="${maxWidthClass}" src="${imageUrl}" />`)
      formattedText = formattedText.replace(imageUrl, "")
    }
  })

  if (formattedText.replace(" ", "") !== "") {
    formattedText = "<div class=\"mx-3 my-2\">" + formattedText + "</div>"
  }

  if (imageTags.length > 0) {
    imageTags.forEach((imageTag) => {
      formattedText = imageTag + formattedText
    })
  }


  return formattedText
}

export function convertDataToFieldJson(data: [], fieldType = "tag", group = ""): string {

  let fields = []
  const fieldParamsStatic = ["name", "label", "description"]

  data.forEach(item => {
    let field = {
      name: "",
      label: "",
      group: group,
      description: "",
      type: fieldType,
      weight: 1,
      value: "",
      data: {}
    }

    Object.keys(item).forEach(key => {
      if (fieldParamsStatic.includes(key)) {
        field[key] = item[key]
      }
      else {
        field.data[key] = item[key]
      }
    })
    field["type"] = "tag"
    field["weight"] = 1
    field["value"] = ""
    fields = [...fields, field]
  })

  return JSON.stringify(fields)
}

export function convertGearDataToFieldJson(data: [], fieldType = "k4e-gear", group = "gear"): string {

  let fields = []
  const fieldParamsStatic = ["name", "label", "description", "icon"]

  data.forEach(item => {
    let field = {
      name: "",
      label: "",
      group: group,
      description: "",
      type: fieldType,
      weight: 1,
      value: "",
      data: {}
    }

    Object.keys(item).forEach(key => {
      if (fieldParamsStatic.includes(key)) {
        field[key] = item[key]
      }
      else {
        field.data[key] = item[key]
      }
    })
    fields = [...fields, field]
  })

  return JSON.stringify(fields)
}


export function truncateText(text: string, length: number): string {
  if (text.length > length) {
    return text.substring(0, length) + "..."
  }
  else {
    return text
  }
}

export async function loadRoller(rpgSystemName: string) {
  return (await import(`$data/systems/${rpgSystemName}/roller.ts`)).default
}

export async function rollToChatWindow(ffRoll: FFRoll, roll, campaignId: string, characterId: string = "") {
  
  let message: string = ""
  console.log(roll.output)

  if (ffRoll.field !== undefined && ffRoll.field.label !== undefined) {
    message = ffRoll.field.label + ": " + roll.output
  }
  else {
    message = roll.output
  }
  message = `<b>${message}</b>`
  sendCampaignChatMessage(message, campaignId, characterId)
}

export async function sendCampaignChatMessage(message: string, campaignId: string, characterId: string = "") {

  return await createChatMessage({
    campaign: campaignId,
    character: characterId,
    message: message
  })
}
