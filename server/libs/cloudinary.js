import cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name: 'dhxig8yov',
  api_key: '271512177468223',
  api_secret: 'QBaPMu_8EWlQ8t0DgnCKRjdBh4w',
})

export const uploadImage = async (filePath) => {
  const uploadSettings = {
    folder:  'posts',
  }
  return await cloudinary.v2.uploader.upload(filePath, uploadSettings)
}

export const deleteImage = async (id) => {
  return await cloudinary.v2.uploader.destroy(id)
}