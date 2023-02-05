import Post from "../models/Post.js"
import { uploadImage, deleteImage } from "../libs/cloudinary.js"
import fs from "fs-extra"

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.send(posts)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body
    let image

    if (req.files?.image) {
      const imagePath = req.files.image.tempFilePath
      const result = await uploadImage(imagePath)
      await fs.remove(imagePath)
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      }
    }

    const newPost = new Post({ title, description, image })

    await newPost.save()
    return res.json(newPost)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    return res.send(updatedPost)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const postToRemove = await Post.findByIdAndDelete(req.params.id)
    if (!postToRemove) return res.sendStatus(404)

    const imageID = postToRemove.image.public_id
    if (imageID) await deleteImage(imageID)

    return res.sendStatus(204)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.sendStatus(404)
    return res.json(post)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
