import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "scenes/navbar"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import FriendListWidget from "scenes/widgets/FriendListWidget"
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const getUser = async () => {
        const response = await fetch(`/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        setUser(data)
    }

    useEffect(() => {
        getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user) return null

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="3rem"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : "undefined"}>
                    <Box sx={{ position: "sticky", top: "3rem" }}>
                        <UserWidget userId={userId} picturePath={user.picturePath} />
                        <FriendListWidget userId={userId}/>
                    </Box>
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : "undefined"}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage