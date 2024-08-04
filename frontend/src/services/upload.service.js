export const uploadService = {
  uploadImg,
  uploadMany
}
function uploadImg(ev) {
  const CLOUD_NAME = "dp32ucj0y"
  const UPLOAD_PRESET = "j8bq7zgb"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}

function uploadImgNew(file) {
  const CLOUD_NAME = "dp32ucj0y"
  const UPLOAD_PRESET = "j8bq7zgb"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', file)

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}

function uploadMany(ev) {
  let imgsArr = []

  for (const file in ev.target.files) {
    if (file === 'length' || file === 'item') console.log('done');
    else {
      let imgFile = uploadImgNew(ev.target.files[file])
      imgsArr.push(imgFile)
    }
  }
  return Promise.all(imgsArr)
}