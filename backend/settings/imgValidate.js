const imgValidate = (images) => {
  let imgList = []
  if (Array.isArray(images)) {
    imgList = images
  } else {
    imgList.push(images)
  }

  if (imgList.length > 3) {
    return { error: "Możesz przesłać jedynie 3 zdjęcia na raz!" }
  }
  for (let image of imgList) {
    if (image.size > 1048576) return { error: "Maksymalny rozmiar zdjęcia to 1 MB!" }

    const filetypes = /jpg|jpeg|png/
    const mimetype = filetypes.test(image.mimetype)
    if (!mimetype) return { error: "Niewłaściwe rozszerzenie pliku (jpg, jpeg, png)!" }
  }

  return { error: false }
}

module.exports = imgValidate