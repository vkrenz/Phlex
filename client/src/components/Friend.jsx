import { PersonAddOutlined, PersonRemoveOutlined, MoreHorizOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setFriends } from "state"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"
import { useEffect, useState } from "react"

const Friend = ({ friendId, name, userPicturePath, size = "55px", user }) => {
    const [friendOccupation, setFriendOccupation] = useState(null)
    const [friendLocation, setFriendLocation] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)
    const { palette } = useTheme()
    const primaryLight = palette.primary.light
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    
    const isFriend = friends.find((friend) => friend._id === friendId)

    const patchFriend = async () => {
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            },
            "Content-Type": "application/json"
        })
        const data = await response.json()
        dispatch(setFriends({ friends, data }))
    }

    const getFriend = async () => {
        const response = await fetch(`http://localhost:3001/users/${friendId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        setFriendOccupation(data.occupation)
        setFriendLocation(data.location)
    }

    useEffect(() => {
        getFriend()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <FlexBetween>
            <FlexBetween gap="1rem" width="100%">
                <FlexBetween gap="1rem">
                    <UserImage image={userPicturePath} size={`${size}`} />
                    <Box
                        onClick={() => {
                            navigate(`/profile/${friendId}`)
                            navigate(0)
                        }}
                    >
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem">
                            {friendOccupation && friendLocation ? `${friendOccupation} · ${friendLocation}` : "Loading..."}
                        </Typography>
                    </Box>
                </FlexBetween>
                <IconButton>
                    <MoreHorizOutlined sx={{ color: "DimGray" }} />
                </IconButton>
            </FlexBetween>
            {user === "friend" ? (
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{
                        backgroundColor: medium,
                        p: "0.6rem",
                        ml: "1rem",
                        "&:hover": {
                            backgroundColor: main
                        }
                    }}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryLight }} />
                    ): (
                        <PersonAddOutlined sx={{ color: primaryLight }} />
                    )}
                </IconButton>
            ) : null}
        </FlexBetween>
    )
}

export default Friend
