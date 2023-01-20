import { 
    Box, 
    Typography, 
    useTheme, 
    useMediaQuery,
    IconButton,
} from "@mui/material"
import {
    NightsStayOutlined,
    LightMode
} from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { setMode } from "state"
import Form from "./Form"
import FlexBetween from "components/FlexBetween"

const LoginPage = () => {
    const theme = useTheme()
    const dark = theme.palette.neutral.dark
    const dispatch = useDispatch()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px")
    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        fontWeight="bold"
                        fontSize="32px"
                        color="primary"
                    >
                        {/* Logo */}
                        Sociopedia
                    </Typography> 
                    <IconButton
                        onClick={() => dispatch(setMode(/** Change state */))}
                        sx={{ fontSize: "25px" }}
                        alignSelf="flex-end"
                    >
                        {theme.palette.mode === "dark" ? (
                            <NightsStayOutlined sx={{ fontSize: "25px " }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>         
                </Box>
            </Box>
            {/* Form Box */}
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography
                    fontWeight="500"
                    variant="h5"
                    sx={{
                        mb: "1.5rem"
                    }}
                    textAlign="center"
                >
                    {/* Description */}
                    Welcome to Sociopedia, the Social Media for Sociopaths!
                </Typography>
                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage