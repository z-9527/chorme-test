

function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function blobToFile(theBlob, fileName) {
  const file = new File([theBlob], fileName, {
    type: theBlob.type,
  });

  return file;
}

export function base64ToFile(base64Data, imgName) {
  // 调用
  let blob = dataURLtoBlob(base64Data);
  let file = blobToFile(blob, imgName);
  return file;
}
