import dotenv from "dotenv"
dotenv.config()

export const { MONGODB_URI = "mongodb://127.0.0.1:27017/testdb", PORT = 4000 } =
  process.env
