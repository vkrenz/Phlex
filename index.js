import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url" 
import authRoutes from "./server/routes/auth.js"
import userRoutes from "./server/routes/users.js"
import postRoutes from "./server/routes/posts.js"
import { register } from "./server/controllers/auth.js"
import { createPost } from "./server/controllers/posts.js"
import { verifyToken } from "./server/middleware/auth.js"
import User from "./server/models/User.js"
import Post from "./server/models/Post.js"

/** Test data */
/** @see line 68 */
import { users, posts } from "./server/data/index.js"
/**  */

/** Config */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

/** File Storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

/** Routes w/ files */
app.post("/auth/register", upload.single("picture"), register) /** Route w/ multer */
app.post("/posts", verifyToken, upload.single("picture"), createPost)

/** Routes */
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

/** Mongoose */
const PORT = process.env.PORT || 6001
mongoose.set('strictQuery', true) /** Suppress DeprecationWarning */
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
      console.log(`Connected Port: ${PORT}`)  
      /** Manually inject test data */
      /** @desc one-time use only */
    //   User.insertMany(users)
    //   Post.insertMany(posts)
    //   console.log("Test users/posts created!")
    })
}).catch(err => {
    console.log(err)
})