import { 
    ChatBubbleOutlineOutlined, 
    FavoriteBorderOutlined,
    FavoriteOutlined, 
    ShareOutlined,
    MoreHorizOutlined,
    DeleteOutlined
} from "@mui/icons-material"
import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
    TextField
} from "@mui/material"
import FlexBetween from "components/FlexBetween"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPost } from "state"
import { useNavigate } from "react-router-dom"
import UserImage from "components/UserImage"

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    picturePath,
    userPicturePath,
    likes,
    comments
}) => {
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const user = useSelector((state) => state.user)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length
    const navigate = useNavigate()
    const { palette } = useTheme()
    const main = palette.neutral.main
    const primary = palette.primary.main

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        })
        const updatedPost = await response.json()
        dispatch(setPost({ post: updatedPost }))
    }

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3001/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            navigate("/home")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <WidgetWrapper m="2rem 0">
            {postUserId !== user._id ? (
                <Box>
                    <Typography
                        color="DimGray"
                    >
                        Suggested for you
                    </Typography>
                    <Divider sx={{ m: "1rem 0" }} />
                </Box>
            ) : null}
            {postUserId === user._id ? (
                <Friend
                friendId={user._id}
                name={`${user.firstName} ${user.lastName}`}
                userPicturePath={user.picturePath}
                user="currentUser"
                /> 
            ) : (
                <Friend
                 friendId={postUserId}
                 name={name}
                 userPicturePath={userPicturePath}
                 user="friend"
                /> 
            )}
           <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
           </Typography>
           {picturePath && (
            <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "1rem" }}
                src={`http://localhost:3001/assets/${picturePath}`}
            />
           )}
           <Divider sx={{ mt: "1rem" }} />
           <FlexBetween mt="1rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>
                            {isLiked && likeCount ? (
                                <>
                                    {`You and ${likeCount - 1} others`}
                                </>
                            ) : (
                                <>
                                    {likeCount} {likeCount > 1 || likeCount === 0 ? "likes" : "like"}
                                </>
                            )}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton 
                            onClick={() => setIsComments(!isComments)}
                            sx={{
                                borderRadius: "0.5rem"
                            }}
                        >
                            <ChatBubbleOutlineOutlined />
                            <Typography ml="1rem">
                                {comments.length} comments
                            </Typography>
                        </IconButton>
                    </FlexBetween>  
                </FlexBetween>
                <Box>
                    {postUserId === user._id && (
                        <IconButton
                            onClick={handleDelete}
                            sx={{ "&:hover": { color: "warning" } }}
                        >
                            <DeleteOutlined />
                        </IconButton>
                    )}
                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </Box>
           </FlexBetween>
           {isComments && (
                <Box>
                    <Divider sx={{ m: "1rem 0" }} />
                    <Box display="flex" alignItems="center">
                        <UserImage image={user.picturePath} size="40px" />
                        <TextField
                            label={`${user.firstName}, write a comment...`}
                            variant="filled"
                            fullWidth
                            sx={{
                                "&:fieldset": {
                                    borderRadius: "50%"
                                },
                                ml: "1rem"
                            }}
                        />
                    </Box>
                </Box>
           )}
           {isComments && comments.length > 0 && (
                <Box mt="0.5rem">
                    <Divider sx={{ m: "1rem 0" }} />
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            {i === comments.length ? null : (
                                <Typography sx={{ color: main, m: "0.5rem 0", ml: "1rem", p: "0.75rem 0" }}>
                                    <Box display="flex" alignItems="center">
                                        <Box
                                            backgroundColor={"DimGray"}
                                            padding="0.5rem 0.75rem"
                                            borderRadius="1rem"
                                        >
                                            {comment}
                                        </Box>
                                        <IconButton sx={{ ml: "0.5rem" }}>
                                            <MoreHorizOutlined sx={{ fontSize: "medium", color: "DimGray" }} />
                                        </IconButton>
                                    </Box>
                                    <Box display="flex" gap="1rem" ml="0.75rem" mt="0.2rem">
                                        <Typography fontSize="0.75rem" sx={{ "&:hover": { cursor: "pointer", color: primary } }}>
                                            Like
                                        </Typography>
                                        <Typography fontSize="0.75rem" sx={{ "&:hover": { cursor: "pointer", color: primary } }}>
                                            Reply
                                        </Typography>
                                    </Box>
                                </Typography>
                            )}
                        </Box>
                    ))}
                </Box>
           )}
        </WidgetWrapper>
    )
}

export default PostWidget