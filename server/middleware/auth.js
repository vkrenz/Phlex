import jwt from "jsonwebtoken"

/** Handles 🔒 User Authorization 🔒 */
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")
        if(!token) return res.status(403).send("Access Denied")
        if(token.startsWith("Bearer ")) {
            /** Extract the token string from the Bearer token */
            token = token.slice(7, token.length).trimLeft()
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}