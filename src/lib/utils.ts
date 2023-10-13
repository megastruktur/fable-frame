export function getImageUrlsFromText(text: string): (string | undefined)[] {
  const matches = text.match(/https?:\/\/\S+/g) || [];

  return matches.map((match) => {
    if (match.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return match
    }
  });
}

export function imageUrlToImg(text: string, maxWidthClass = "max-w-sm"): string {

  let formattedText: string = text
  const imageUrls: (string | undefined)[] = getImageUrlsFromText(text);

  imageUrls.forEach((imageUrl) => {
    if (imageUrl!== undefined) {
      formattedText = formattedText.replace(imageUrl,
        `<img alt="note loaded" class="${maxWidthClass}" src="${imageUrl}" />`
      )
    }
  })


  return formattedText
}
