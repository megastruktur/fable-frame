export function getUploadedFileLocalSrc(e: any) {
  
  let previewImageSrc = ""
  // If no file was selected, empty the preview <img>
  if(e.target.files.length) {
    previewImageSrc = URL.createObjectURL(e.target.files.item(0))
  }

  return previewImageSrc
}
