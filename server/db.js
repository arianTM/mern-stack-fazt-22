import mongoose from "mongoose"
import { MONGODB_URI } from "./config.js"

export async function connectDB() {
  mongoose.set('strictQuery', false)
  try {
    const db = await mongoose.connect(MONGODB_URI)
    console.log('Connected to ', db.connection.name)
  } catch (e) {
    console.error(e)
  }
}
