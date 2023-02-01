import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget"
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import LinksWidget from "scenes/widgets/LinksWidget"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import FriendListWidget from "scenes/widgets/FriendListWidget"

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const { _id, picturePath } = useSelector((state) => state.user)
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="3rem"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : "undefined"}>
                    <Box sx={{ position: "sticky", top: "3rem" }}>
                        <UserWidget userId={_id} picturePath={picturePath} />
                        <LinksWidget />
                    </Box>
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : "undefined"}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <Box sx={{ position: "sticky", top: "3rem" }}>
                            <AdvertWidget />
                            <FriendListWidget 
                                userId={_id}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage