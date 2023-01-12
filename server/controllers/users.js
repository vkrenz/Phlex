import User from "../models/User"

/** Read */
export const getUser = async (req, res) => {
    try {
        /** Find user */
        const { id } = req.params
        const user = await User.findById(id)
        /** Return back to frontend */
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        /** Find user */
        const { id } = req.params
        const user = await User.findById(id)
        /** Grab friends */
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        /** Properly format friends for frontend */
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        /** Return back to frontend */
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/** Update */
export const addRemoveFriend = async (req, res) => {
    try {
        /** Find user and friends */
        const { id, friendId } = req.params 
        const user = await User.findById(id)
        const friend = await User.findById(friendId)
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()
        /** Grab friends */
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        /** Properly format friends for frontend */
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        /** Return back to frontend */
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}