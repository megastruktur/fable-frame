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
