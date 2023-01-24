import express from "express"
import {
    /** Controllers */
    getFeedPosts,
    getUserPosts,
    likePost,
    deletePost
} from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/** Read */
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)

/** Update */
router.patch("/:id/like", verifyToken, likePost)

/** Delete */
router.delete("/:id/delete", verifyToken, deletePost)

export default router