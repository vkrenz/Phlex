import { Box, useTheme } from "@mui/system"
import { Typography } from "@mui/material"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "state"
import FlexBetween from "components/FlexBetween"

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch()
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)

    const getFriends = async () => {
        const response = await fetch(`/users/${userId}/friends`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <WidgetWrapper
        mt="3rem"
        sx={{
            position: "sticky",
        }}
        >
            <FlexBetween>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        mb: "1.5rem"
                    }}
                >
                    Friend List
                </Typography>
                <Typography
                    color={palette.neutral.dark}
                    sx={{
                        mb: "1.5rem"
                    }}
                >
                    See All
                </Typography>
            </FlexBetween>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend 
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget