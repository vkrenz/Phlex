import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    // AddOutlined
} from "@mui/icons-material"
import { Box, Typography, Divider, useTheme  } from "@mui/material"
import UserImage from "components/UserImage"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const postsSelector = useSelector((state) => state.posts)
    const friendsSelector = useSelector((state) => state.user.friends)
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async () => {
        const response = await fetch(`/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            })
        const data = await response.json()
        setUser(data)
    }

    /** Get ONLY THE SPECIFIC USER'S posts */
    const getPosts = async () => {
        const response = await fetch(`/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        if(data) {
            setPosts(data)
        }
    }
    
    useEffect(() => {
        getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friendsSelector])

    useEffect(() => {
        getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postsSelector])

    if (!user) {
        return null
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user

    return (
        <WidgetWrapper>
            {/** First Row */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}>
                                {firstName} {lastName}
                                <Typography color={medium}>
                                    {friends.length} friends  &middot;  {posts.length} posts
                                </Typography>
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>


                <Divider />

                {/** Second Row */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>
                            {location}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>
                            {occupation}
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                {/** Third Row */}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>
                            Who's viewed your profile
                        </Typography>
                        <Typography color={main} fontWeight="500">
                            {viewedProfile}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>
                            Impressions of your posts
                        </Typography>
                        <Typography color={main} fontWeight="500">
                            {impressions}
                        </Typography>
                    </FlexBetween>
                </Box>

                <Divider />

                {/** Fourth Row */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem" display="flex" alignItems="center">
                        Social Profiles
                        {/* <AddOutlined sx={{ ml: "0.5rem", fontSize: "1.5rem" }} /> */}
                    </Typography>

                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="/assets/twitter.png" alt="twitter" />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                    Social Network
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <img src="/assets/linkedin.png" alt="linkedin" />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Linkedin
                                </Typography>
                                <Typography color={medium}>
                                    Network Platform
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main }} />
                    </FlexBetween>
                </Box>
        </WidgetWrapper>
    )
}

export default UserWidget